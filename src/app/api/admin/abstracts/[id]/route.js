import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// 🚀 NEW: PATCH Handler to assign slots
export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { scheduledSlot } = await req.json(); // e.g., "slot-1"

    const updated = await prisma.abstract.update({
      where: { id: id },
      data: { scheduledSlot: scheduledSlot },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH_SLOT_ERROR:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// 🏛️ GET Handler remains exactly as provided
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
            reviewer: { select: { name: true } },
          },
        },
      },
    });

    if (!abstractData) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    // MANUALLY FETCH REVIEWER DATA IF reviewerId EXISTS
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
