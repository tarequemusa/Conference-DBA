import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // 1. Role Validation (Admin or Authority)
    if (!session || !["ADMIN", "AUTHORITY"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch papers that have finished the Review phase
    const decisions = await prisma.abstract.findMany({
      where: {
        status: {
          in: [
            "ACCEPTANCE_NOTIFICATION",
            "FINAL_DECISION",
            "REVISION_REQUIRED",
          ],
        },
      },
      include: {
        user: { select: { name: true, email: true } },
        reviews: {
          include: {
            reviewer: { select: { name: true } },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(decisions);
  } catch (error) {
    console.error("DECISION_LIST_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch decision list" },
      { status: 500 },
    );
  }
}
