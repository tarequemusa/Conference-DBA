import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Admin Guard
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { abstractId, reviewerIds } = await req.json();

    if (!abstractId || !reviewerIds || reviewerIds.length === 0) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // 2. Create multiple reviews in a transaction
    // We provide empty strings for comments/recommendation so the DB doesn't crash
    await prisma.$transaction(
      reviewerIds.map((reviewerId) =>
        prisma.review.create({
          data: {
            abstractId: abstractId,
            reviewerId: reviewerId,
            comments: "", // Default empty
            recommendation: "PENDING", // Initial state
            isFinal: false,
          },
        }),
      ),
    );

    // 3. Update the Abstract status to PEER_REVIEW
    await prisma.abstract.update({
      where: { id: abstractId },
      data: { status: "PEER_REVIEW" },
    });

    return NextResponse.json({ message: "Reviewers assigned successfully" });
  } catch (error) {
    console.error("ASSIGNMENT_ERROR:", error);
    return NextResponse.json(
      { error: "Database failed to create review records." },
      { status: 500 },
    );
  }
}
