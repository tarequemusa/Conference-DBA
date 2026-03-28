import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // 1. Role Validation & Session Check
    if (!session || session.user.role !== "REVIEWER") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    // 2. Fetch abstracts assigned to this reviewer via the 'reviews' relation
    const abstracts = await prisma.abstract.findMany({
      where: {
        status: {
          in: ["PEER_REVIEW", "FULL_PAPER_SUBMISSION"],
        },
        reviews: {
          some: {
            reviewerId: session.user.id, // Looking into the Review table
          },
        },
      },
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,
        // We include the specific review record for this reviewer to check if it's final
        reviews: {
          where: {
            reviewerId: session.user.id,
          },
          select: {
            isFinal: true,
            recommendation: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(abstracts);
  } catch (error) {
    console.error("REVIEWER_GET_ERROR:", error);
    return NextResponse.json(
      { error: "Database sync failed" },
      { status: 500 },
    );
  }
}
