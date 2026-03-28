import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;
    const { fullPaperUrl } = await req.json();

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const updated = await prisma.abstract.update({
      where: {
        id,
        userId: session.user.id, // Ensure they own the paper
      },
      data: {
        fullPaperUrl,
        status: "FULL_PAPER_SUBMISSION",
      },
    });

    return NextResponse.json({
      message: "Full paper submitted successfully",
      updated,
    });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
