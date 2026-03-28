import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "AUTHORITY") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const abstracts = await prisma.abstract.findMany({
      where: {
        status: {
          in: [
            "FINAL_DECISION",
            "ACCEPTANCE_NOTIFICATION",
            "CONFIRMED",
            "REJECTED",
          ],
        },
      },
      include: {
        user: { select: { name: true, email: true } },
        reviews: {
          select: {
            totalScore: true,
            comments: true,
            recommendation: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(abstracts);
  } catch (error) {
    console.error("AUTHORITY_GET_ERR:", error);
    return NextResponse.json(
      { error: "Database fetch failed" },
      { status: 500 },
    );
  }
}
