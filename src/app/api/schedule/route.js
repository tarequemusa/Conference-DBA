import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const schedule = await prisma.abstract.findMany({
      where: {
        status: "CONFIRMED",
        scheduledSlot: { not: null },
      },
      select: {
        id: true,
        title: true,
        scheduledSlot: true,
        user: { select: { name: true } },
      },
      orderBy: { updatedAt: "asc" },
    });
    return NextResponse.json(schedule);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load schedule" },
      { status: 500 },
    );
  }
}
