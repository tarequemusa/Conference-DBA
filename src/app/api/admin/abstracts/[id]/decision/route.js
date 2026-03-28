import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Security Guard
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { decision } = await req.json();

    // 2. Update the Abstract Status
    const updatedAbstract = await prisma.abstract.update({
      where: { id: id },
      data: {
        status: decision, // This will be REJECTED or ACCEPTANCE_NOTIFICATION
      },
    });

    // 3. Optional: Create an Activity Log entry
    /*
    await prisma.activityLog.create({
      data: {
        action: `ADMIN_${decision}`,
        details: `Admin ${session.user.name} set status to ${decision}`,
        abstractId: id,
      }
    });
    */

    return NextResponse.json({
      message: "Decision recorded successfully",
      status: updatedAbstract.status,
    });
  } catch (error) {
    console.error("DECISION_API_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
