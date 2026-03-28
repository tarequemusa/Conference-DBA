import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route"; // Ensure this path is correct (../../auth/...)

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // FIX: Change "AUTHORITY" to "REVIEWER"
    if (!session || session.user.role !== "REVIEWER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentYear = new Date().getFullYear();

    // Fetch only this reviewer's data
    const reviews = await prisma.review.findMany({
      where: {
        reviewerId: session.user.id,
        createdAt: { gte: new Date(`${currentYear}-01-01`) },
      },
      select: { createdAt: true },
    });

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
    console.error("STATS_API_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
