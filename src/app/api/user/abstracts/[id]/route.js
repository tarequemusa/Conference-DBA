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

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const abstract = await prisma.abstract.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        // FIX: Explicitly including reviews to get detailed marks
        reviews: true,
      },
    });

    if (!abstract) {
      return NextResponse.json(
        { error: "Abstract not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(abstract);
  } catch (error) {
    console.error("DETAILED_FETCH_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
