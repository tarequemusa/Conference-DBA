import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, image, signature, currentPassword, newPassword } =
      await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let updateData = {};
    if (name) updateData.name = name;
    if (image) updateData.image = image;

    // --- Signature Logic (For Authority Role) ---
    if (signature) updateData.signature = signature;

    // --- Conditional Password Logic ---
    if (newPassword && newPassword.trim() !== "") {
      // 1. Check if user is a Google Login user
      if (!user.password) {
        return NextResponse.json(
          {
            error: "Google accounts must manage passwords via Google Settings.",
          },
          { status: 400 },
        );
      }

      // 2. Require current password
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Current password is required to set a new password." },
          { status: 400 },
        );
      }

      // 3. Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: "The current password you entered is incorrect." },
          { status: 400 },
        );
      }

      // 4. Strength Validation
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return NextResponse.json(
          {
            error:
              "New password must be at least 8 characters with letters and numbers.",
          },
          { status: 400 },
        );
      }

      // 5. Hash and add new password
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        name: updatedUser.name,
        image: updatedUser.image,
        signature: updatedUser.signature,
      },
    });
  } catch (error) {
    console.error("PROFILE_UPDATE_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update profile. Please try again." },
      { status: 500 },
    );
  }
}
