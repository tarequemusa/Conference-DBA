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

    // Fetch all users with the REVIEWER role and their associated reviews
    const reviewers = await prisma.user.findMany({
      where: { role: "REVIEWER" },
      include: {
        reviews: {
          include: {
            abstract: true, // To get assignment date if stored, or use abstract.createdAt
          },
        },
      },
    });

    const performanceData = reviewers.map((rev) => {
      const completed = rev.reviews.length;

      // Calculate Average Turnaround (Simplified: time from abstract creation to review completion)
      const avgDays =
        completed > 0
          ? rev.reviews.reduce((acc, curr) => {
              const diff =
                new Date(curr.createdAt) - new Date(curr.abstract.createdAt);
              return acc + diff / (1000 * 60 * 60 * 24);
            }, 0) / completed
          : 0;

      return {
        id: rev.id,
        name: rev.name,
        email: rev.email,
        completed,
        avgDays: avgDays.toFixed(1),
        avgScore:
          completed > 0
            ? (
                rev.reviews.reduce((acc, curr) => acc + curr.totalScore, 0) /
                completed
              ).toFixed(1)
            : "0.0",
      };
    });

    // Sort by fastest (lowest avgDays) but keep those with 0 at the bottom
    const sortedData = performanceData.sort((a, b) => {
      if (a.completed === 0) return 1;
      if (b.completed === 0) return -1;
      return a.avgDays - b.avgDays;
    });

    return NextResponse.json(sortedData);
  } catch (error) {
    return NextResponse.json(
      { error: "Analytics engine failed" },
      { status: 500 },
    );
  }
}
