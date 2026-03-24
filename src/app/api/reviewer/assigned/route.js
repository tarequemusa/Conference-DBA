import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    // Only allow Reviewers to access this data
    if (!session || session.user.role !== "REVIEWER") {
      return Response.json({ error: "Access Denied" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");

    const assignments = await prisma.review.findMany({
      where: {
        reviewerId: session.user.id,
        // If status=PENDING, only show papers without a final rating
        rating: statusFilter === "PENDING" ? null : { not: null },
      },
      include: {
        abstract: {
          include: {
            user: true, // To show researcher info
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(assignments);
  } catch (error) {
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
