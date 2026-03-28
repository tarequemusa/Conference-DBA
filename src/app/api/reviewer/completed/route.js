import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "REVIEWER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const completed = await prisma.abstract.findMany({
      where: {
        reviewerId: session.user.id,
        status: { not: "PEER_REVIEW" }, // Anything not pending
      },
      include: {
        user: { select: { name: true } },
        reviews: { where: { reviewerId: session.user.id } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(completed);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
