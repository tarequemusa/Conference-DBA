import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const submissions = await prisma.abstract.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
    });

    // Group by date string
    const countsMap = submissions.reduce((acc, curr) => {
      const dateKey = curr.createdAt.toISOString().split("T")[0];
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    // Fill all 30 days to ensure a smooth chart line
    const formattedData = [];
    for (let i = 30; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });

      formattedData.push({
        date: label,
        count: countsMap[dateKey] || 0,
      });
    }

    return Response.json(formattedData);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
