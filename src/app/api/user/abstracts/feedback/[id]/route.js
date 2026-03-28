import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🚀 FIX: Await params before destructuring (Required for Next.js 15)
    const { id } = await params;

    const review = await prisma.review.findFirst({
      where: {
        abstractId: id,
        // Safety: Ensure the abstract belongs to the logged-in user
        // OR allow Admin to view for system oversight
        abstract:
          session.user.role === "ADMIN" ? {} : { userId: session.user.id },
      },
      select: {
        originality: true,
        methodology: true,
        relevance: true,
        clarity: true,
        totalScore: true,
        comments: true,
        recommendation: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc", // Get the latest review if multiple exist
      },
    });

    if (!review) {
      return NextResponse.json(
        { error: "No feedback available yet" },
        { status: 404 },
      );
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("FEEDBACK_GET_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
