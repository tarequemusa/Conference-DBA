import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function PATCH(req) {
  const session = await getServerSession();

  try {
    const { reviewId, rating, comments, recommendation, isFinalDecision } =
      await req.json();

    // 1. Update the specific review record
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating,
        comments,
        recommendation,
        isFinal: isFinalDecision || false,
      },
    });

    // 2. Automated Logic: If this was the final decision, update the Abstract status
    if (isFinalDecision && recommendation === "ACCEPT") {
      await prisma.abstract.update({
        where: { id: updatedReview.abstractId },
        data: { status: "ACCEPTANCE_NOTIFICATION" },
      });
    }

    return Response.json({ message: "Feedback submitted successfully" });
  } catch (error) {
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}
