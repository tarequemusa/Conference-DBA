import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Fetch the abstract first
    const abstractData = await prisma.abstract.findUnique({
      where: { id: id },
      include: {
        user: { select: { name: true, email: true } },
        reviews: {
          orderBy: { createdAt: "desc" },
          include: {
            // We keep this because 'Review' model likely HAS a 'reviewer' relation
            reviewer: { select: { name: true } },
          },
        },
      },
    });

    if (!abstractData) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    // MANUALLY FETCH REVIEWER DATA IF reviewerId EXISTS
    // This bypasses the 'include' error you are seeing
    let reviewerInfo = null;
    if (abstractData.reviewerId) {
      reviewerInfo = await prisma.user.findUnique({
        where: { id: abstractData.reviewerId },
        select: { name: true, email: true },
      });
    }

    // Merge the reviewer info into the response object
    const responseData = {
      ...abstractData,
      reviewer: reviewerInfo,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("🔥 PRISMA_INCLUDE_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
