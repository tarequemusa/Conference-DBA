import prisma from "@/lib/prisma"; // Use your established singleton
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, authors, abstract } = body;

    // 1. Validation
    if (!title || !authors || !abstract) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (abstract.length > 1000) {
      // Increased to match your schema update
      return NextResponse.json(
        { error: "Abstract exceeds limit" },
        { status: 400 },
      );
    }

    // 2. Find internal User ID via session email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) throw new Error("User not found in database");

    // 3. Create Submission
    const newSubmission = await prisma.abstract.create({
      data: {
        title,
        authors,
        abstract,
        userId: user.id,
        status: "ABSTRACT_SUBMISSION",
      },
    });

    return NextResponse.json(
      { success: true, data: newSubmission },
      { status: 201 },
    );
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to save submission." },
      { status: 500 },
    );
  }
}
