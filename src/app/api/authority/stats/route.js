import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Ensure session exists and user is a REVIEWER
    if (!session || session.user.role !== "REVIEWER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentYear = new Date().getFullYear();

    // Fetch reviews specifically created by this reviewer in the current year
    const reviews = await prisma.review.findMany({
      where: {
        reviewerId: session.user.id,
        createdAt: {
          gte: new Date(`${currentYear}-01-01`),
        },
      },
      select: { createdAt: true },
    });

    // Map months for chart data
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const chartData = months.map((m) => ({ month: m, count: 0 }));

    reviews.forEach((r) => {
      const mIndex = new Date(r.createdAt).getMonth();
      chartData[mIndex].count++;
    });

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("REVIEWER_STATS_ERR:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviewer stats" },
      { status: 500 },
    );
  }
}
