import { sendReviewAssignmentEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { abstractId, reviewerIds } = await req.json();

    if (!abstractId || !reviewerIds || reviewerIds.length === 0) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Use upsert for each reviewer to prevent P2002 unique constraint errors
      const createdReviews = await Promise.all(
        reviewerIds.map((reviewerId) =>
          tx.review.upsert({
            where: {
              // This matches the unique constraint [reviewerId, abstractId] in your schema
              reviewerId_abstractId: {
                reviewerId: reviewerId,
                abstractId: abstractId,
              },
            },
            update: {
              isFinal: false, // Reset if re-assigning
              recommendation: "PENDING",
            },
            create: {
              abstractId: abstractId,
              reviewerId: reviewerId,
              comments: "",
              recommendation: "PENDING",
              isFinal: false,
            },
            include: { reviewer: { select: { email: true, name: true } } },
          }),
        ),
      );

      // 2. Update Abstract status and set the primary reviewerId for the UI
      const abstract = await tx.abstract.update({
        where: { id: abstractId },
        data: {
          status: "PEER_REVIEW",
          reviewerId: reviewerIds[0],
        },
        select: { title: true },
      });

      // 3. Activity Log
      await tx.activityLog.create({
        data: {
          action: "ABSTRACT_ASSIGNED",
          details: `Assigned/Updated ${reviewerIds.length} reviewer(s) for: "${abstract.title}"`,
          adminId: session.user.id,
          adminName: session.user.name || "System Admin",
          targetId: abstractId,
        },
      });

      return { reviews: createdReviews, abstractTitle: abstract.title };
    });

    // 🚀 Send Emails
    try {
      await Promise.all(
        result.reviews.map((rev) =>
          sendReviewAssignmentEmail(
            rev.reviewer.email,
            rev.reviewer.name,
            result.abstractTitle,
          ),
        ),
      );
    } catch (mailError) {
      console.error("MAILING_ERROR:", mailError);
    }

    return NextResponse.json({
      message: "Reviewers assigned successfully",
    });
  } catch (error) {
    console.error("ASSIGNMENT_ERROR:", error);
    return NextResponse.json(
      { error: "Unique constraint failed or database error." },
      { status: 500 },
    );
  }
}
