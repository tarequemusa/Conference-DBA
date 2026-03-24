import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Security Gate: Check if user exists and is an ADMIN
  if (!session || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const [userCount, abstractCount, pendingReviews, revenue] =
      await Promise.all([
        prisma.user.count({ where: { role: "RESEARCHER" } }),
        prisma.abstract.count(),
        prisma.abstract.count({ where: { status: "INITIAL_EVALUATION" } }),
        prisma.abstract.aggregate({
          _sum: { paymentAmount: true },
          where: { isPaid: true },
        }),
      ]);

    return Response.json({
      totalUsers: userCount,
      totalAbstracts: abstractCount,
      pendingReviews: pendingReviews,
      totalRevenue: revenue._sum.paymentAmount || 0,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 },
    );
  }
}
