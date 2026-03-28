import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Await params (CRITICAL for Next.js 14.2+ / 15)
    const { id } = await params;

    // 2. Role Validation
    if (!session || session.user.role !== "REVIEWER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { scores, comments } = await req.json();

    // 3. Basic Validation
    if (!scores || !comments) {
      return NextResponse.json(
        { error: "Scores and Qualitative Feedback are required." },
        { status: 400 },
      );
    }

    // 4. Verify Assignment in the Review Table
    const existingAssignment = await prisma.review.findFirst({
      where: {
        abstractId: id,
        reviewerId: session.user.id,
      },
    });

    if (!existingAssignment) {
      return NextResponse.json(
        { error: "You are not assigned to review this paper." },
        { status: 403 },
      );
    }

    // 5. Calculate Total Score
    const totalScore =
      (scores.originality || 0) +
      (scores.methodology || 0) +
      (scores.relevance || 0) +
      (scores.clarity || 0);

    // 6. Atomic Transaction: Update the existing Review record and the Abstract status
    const result = await prisma.$transaction([
      // Update the specific review record assigned by Admin
      prisma.review.update({
        where: { id: existingAssignment.id },
        data: {
          originality: scores.originality,
          methodology: scores.methodology,
          relevance: scores.relevance,
          clarity: scores.clarity,
          totalScore: totalScore,
          comments: comments,
          isFinal: true,
          recommendation:
            totalScore >= 12 ? "ACCEPTANCE_NOTIFICATION" : "REVISION_REQUIRED",
        },
      }),
      // Move the Abstract lifecycle forward
      prisma.abstract.update({
        where: { id },
        data: {
          status:
            totalScore >= 12 ? "ACCEPTANCE_NOTIFICATION" : "REVISION_REQUIRED",
        },
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        message:
          "Evaluation submitted. Status updated to Conference Authority.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("REVIEW_SUBMIT_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please check database fields." },
      { status: 500 },
    );
  }
}
