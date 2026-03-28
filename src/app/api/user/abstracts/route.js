import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

// --- GET: Fetch logged-in user's abstracts ---
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userAbstracts = await prisma.abstract.findMany({
      where: { user: { email: session.user.email } },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { reviews: true },
        },
      },
    });

    return NextResponse.json(userAbstracts);
  } catch (error) {
    console.error("API_GET_ABSTRACTS_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// --- POST: Save new abstract submission ---
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, coAuthors, abstract } = await req.json();

    // Validation
    if (!title || !abstract) {
      return NextResponse.json(
        { error: "Title and Abstract are required." },
        { status: 400 },
      );
    }

    // Create record and link to User
    const newSubmission = await prisma.abstract.create({
      data: {
        title,
        coAuthors: coAuthors || "",
        abstract,
        status: "INITIAL_EVALUATION",
        user: {
          connect: { email: session.user.email },
        },
      },
    });

    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error("API_POST_ABSTRACT_ERROR:", error);
    return NextResponse.json(
      {
        error:
          "Failed to submit abstract. Please check your database connection.",
      },
      { status: 500 },
    );
  }
}
