import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// --- 1. GET: Fetch all users for the Management Table ---
export async function GET() {
  const session = await getServerSession(authOptions);

  // Security Check: Only Admins can see the user list
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET_USERS_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// --- 2. PATCH: Update User Roles with Automatic Audit Logging ---
export async function PATCH(req) {
  const session = await getServerSession(authOptions);

  // Security Check
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json(
        { error: "Missing User ID or Role" },
        { status: 400 },
      );
    }

    // Use a Transaction to update user and log the activity simultaneously
    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch target user info first for the audit log details
      const targetUser = await tx.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true, role: true },
      });

      if (!targetUser) throw new Error("Target user not found");

      // 2. Update the role
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { role },
      });

      // 3. Create the Activity Log entry for System Health
      await tx.activityLog.create({
        data: {
          action: "ROLE_CHANGE",
          details: `Changed role of ${targetUser.name || targetUser.email} from ${targetUser.role} to ${role}`,
          adminId: session.user.id,
          adminName: session.user.name || "System Admin",
          targetId: userId,
        },
      });

      return updatedUser;
    });

    return NextResponse.json({
      message: "Role updated and logged successfully",
      user: result,
    });
  } catch (error) {
    console.error("PATCH_USER_ROLE_ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update role and log activity" },
      { status: 500 },
    );
  }
}
