import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // 1. Role Validation
    if (!session || session.user.role !== "AUTHORITY") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Aggregate Top-Level Metrics
    const [totalSubmissions, totalUsers, revenueData] = await Promise.all([
      prisma.abstract.count(),
      prisma.user.count(),
      prisma.abstract.aggregate({
        _sum: { paymentAmount: true },
        where: { isPaid: true },
      }),
    ]);

    // 3. Fetch Submission Status Distribution (For Pie Chart)
    const statusGroups = await prisma.abstract.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    const statusDistribution = statusGroups.map((group) => ({
      name: group.status.replace(/_/g, " "),
      value: group._count.id,
    }));

    // 4. Fetch Reviewer Performance (For Bar Chart)
    // We get all reviewers and count their associated reviews vs total assignments
    const reviewers = await prisma.user.findMany({
      where: { role: "REVIEWER" },
      select: {
        name: true,
        _count: {
          select: { reviews: true }, // Reviews already completed
        },
        abstracts: {
          select: { id: true }, // All abstracts assigned to this reviewerId
        },
      },
    });

    const reviewerStats = reviewers.map((rev) => ({
      name: rev.name?.split(" ")[0] || "Reviewer",
      completed: rev._count.reviews,
      pending: Math.max(0, rev.abstracts.length - rev._count.reviews),
    }));

    // 5. Revenue History (For Area Chart - Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const payments = await prisma.abstract.findMany({
      where: {
        isPaid: true,
        updatedAt: { gte: sevenDaysAgo },
      },
      select: {
        paymentAmount: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: "asc" },
    });

    // Simple grouping by date for the chart
    const revenueHistory = payments.reduce((acc, curr) => {
      const date = curr.updatedAt.toLocaleDateString("en-US", {
        weekday: "short",
      });
      const existing = acc.find((item) => item.name === date);
      if (existing) {
        existing.amount += curr.paymentAmount || 0;
      } else {
        acc.push({ name: date, amount: curr.paymentAmount || 0 });
      }
      return acc;
    }, []);

    // 6. Construct Response
    return NextResponse.json({
      revenue: revenueData._sum.paymentAmount || 0,
      totalSubmissions,
      totalUsers,
      statusDistribution,
      reviewerStats,
      revenueHistory:
        revenueHistory.length > 0
          ? revenueHistory
          : [{ name: "N/A", amount: 0 }],
    });
  } catch (error) {
    console.error("AUTHORITY_ANALYTICS_GET_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
