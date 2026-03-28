import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const { abstractId } = await req.json();

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Atomic update to CONFIRMED status
    await prisma.abstract.update({
      where: { id: abstractId, userId: session.user.id },
      data: {
        status: "CONFIRMED",
        isPaid: true,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Registration confirmed" });
  } catch (error) {
    return NextResponse.json(
      { error: "Database update failed" },
      { status: 500 },
    );
  }
}
