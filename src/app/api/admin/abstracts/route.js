import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Security Gate: Admin only
    if (!session || session.user.role !== "ADMIN") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch all abstracts (WITHOUT the crashing 'reviewer' include)
    const abstracts = await prisma.abstract.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // 2. Fetch all users who are REVIEWERs to map names locally
    // This avoids the 'Unknown field' error entirely
    const reviewers = await prisma.user.findMany({
      where: { role: "REVIEWER" },
      select: { id: true, name: true },
    });

    // 3. Map the reviewer names to the abstracts based on reviewerId
    const sanitizedAbstracts = abstracts.map((abs) => {
      const assignedReviewer = reviewers.find((r) => r.id === abs.reviewerId);
      return {
        ...abs,
        reviewer: assignedReviewer ? { name: assignedReviewer.name } : null,
      };
    });

    return Response.json(sanitizedAbstracts);
  } catch (error) {
    console.error("🔥 DATABASE_ERROR:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
