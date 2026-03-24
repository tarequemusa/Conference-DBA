import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch last 30 days of submissions
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const submissions = await prisma.abstract.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
    });

    // Format data for the chart: { date: 'Mar 01', count: 5 }
    const chartDataMap = submissions.reduce((acc, curr) => {
      const date = curr.createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.keys(chartDataMap).map((date) => ({
      date,
      count: chartDataMap[date],
    }));

    return Response.json(formattedData);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
