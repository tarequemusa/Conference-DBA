import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// --- GET: Fetch user's abstracts (Existing) ---
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userAbstracts = await prisma.abstract.findMany({
      where: { user: { email: session.user.email } },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { reviews: true } } },
    });

    return Response.json(userAbstracts);
  } catch (error) {
    console.error("API_GET_ABSTRACTS_ERROR:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// --- POST: Save new abstract submission (ADD THIS) ---
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, coAuthors, abstract } = await req.json();

    // Basic Validation
    if (!title || !abstract) {
      return Response.json(
        { error: "Title and Abstract are required." },
        { status: 400 },
      );
    }

    // Create the record and link it to the logged-in user
    const newSubmission = await prisma.abstract.create({
      data: {
        title,
        coAuthors: coAuthors || "", // optional
        abstract,
        status: "INITIAL_EVALUATION", // Default status
        user: {
          connect: { email: session.user.email },
        },
      },
    });

    return Response.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error("API_POST_ABSTRACT_ERROR:", error);
    return Response.json(
      { error: "Failed to submit abstract" },
      { status: 500 },
    );
  }
}
