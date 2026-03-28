import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { abstractId, newReviewerId } = await req.json();

    // 1. Update the Abstract to point to the new reviewer
    const updatedAbstract = await prisma.abstract.update({
      where: { id: abstractId },
      data: {
        reviewerId: newReviewerId,
        status: "PEER_REVIEW", // Reset status to review phase
      },
    });

    // 2. Optionally delete old reviews if you want a fresh start
    await prisma.review.deleteMany({
      where: { abstractId: abstractId },
    });

    return NextResponse.json({ message: "REASSIGNMENT_COMPLETE" });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
