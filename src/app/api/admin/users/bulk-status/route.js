import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Security Guard
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userIds, status } = await req.json(); // status: true (Active) or false (Inactive)

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ error: "No users selected" }, { status: 400 });
    }

    // 2. Atomic Transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update multiple users at once
      const updateResult = await tx.user.updateMany({
        where: {
          id: { in: userIds },
        },
        data: {
          // If you don't have isActive in schema, you can use a 'status' string instead
          isActive: status,
        },
      });

      // Create Audit Log for System Health
      await tx.activityLog.create({
        data: {
          action: "BULK_STATUS_CHANGE",
          details: `${status ? "Activated" : "Deactivated"} ${updateResult.count} users via bulk action.`,
          adminId: session.user.id,
          adminName: session.user.name || "System Admin",
        },
      });

      return updateResult;
    });

    return NextResponse.json({
      message: `Successfully updated ${result.count} users.`,
      count: result.count,
    });
  } catch (error) {
    console.error("BULK_STATUS_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update bulk status" },
      { status: 500 },
    );
  }
}
