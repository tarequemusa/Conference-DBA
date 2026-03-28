import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const [
      userCount,
      abstractCount,
      pendingReviews,
      revenue,
      acceptedUnpaidCount,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "RESEARCHER" } }),
      prisma.abstract.count(),
      prisma.abstract.count({ where: { status: "INITIAL_EVALUATION" } }),
      prisma.abstract.aggregate({
        _sum: { paymentAmount: true },
        where: { isPaid: true },
      }),
      // Forecast: Accepted but not yet paid
      prisma.abstract.count({
        where: {
          status: "ACCEPTANCE_NOTIFICATION",
          isPaid: false,
        },
      }),
    ]);

    const totalRevenue = revenue._sum.paymentAmount || 0;
    // Assuming a standard fee of $100 for the forecast calculation
    const forecastRevenue = acceptedUnpaidCount * 100;

    return Response.json({
      totalUsers: userCount,
      totalAbstracts: abstractCount,
      pendingReviews: pendingReviews,
      totalRevenue: totalRevenue,
      forecastRevenue: forecastRevenue,
      pipelineValue: totalRevenue + forecastRevenue,
    });
  } catch (error) {
    console.error("STATS_API_ERROR:", error);
    return Response.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 },
    );
  }
}
