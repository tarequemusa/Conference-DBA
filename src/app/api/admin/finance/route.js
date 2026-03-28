import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Security Gate
  if (!session || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const [attendees, pendingList, revenueData] = await Promise.all([
      // 1. Confirmed/Paid List
      prisma.abstract.findMany({
        where: { isPaid: true },
        include: { user: { select: { name: true, email: true } } },
        orderBy: { updatedAt: "desc" },
      }),

      // 2. Pending List (Accepted but Unpaid)
      prisma.abstract.findMany({
        where: {
          status: "ACCEPTANCE_NOTIFICATION",
          isPaid: false,
        },
        include: { user: { select: { name: true, email: true } } },
        orderBy: { updatedAt: "desc" },
      }),

      // 3. Aggregate Revenue
      prisma.abstract.aggregate({
        _sum: { paymentAmount: true },
        where: { isPaid: true },
      }),
    ]);

    return Response.json({
      attendees: attendees,
      pendingList: pendingList,
      paidCount: attendees.length,
      pendingCount: pendingList.length,
      totalRevenue: revenueData._sum.paymentAmount || 0,
    });
  } catch (error) {
    console.error("FINANCE_API_ERROR:", error);
    return Response.json(
      { error: "Failed to fetch financial data" },
      { status: 500 },
    );
  }
}
