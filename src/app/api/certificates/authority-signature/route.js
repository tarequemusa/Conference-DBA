import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch the user with the AUTHORITY role
    // If you have multiple, this fetches the most recently updated one
    const authority = await prisma.user.findFirst({
      where: { role: "AUTHORITY" },
      select: { signature: true },
      orderBy: { updatedAt: "desc" },
    });

    if (!authority || !authority.signature) {
      return NextResponse.json({ signature: null });
    }

    return NextResponse.json({ signature: authority.signature });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch signature" },
      { status: 500 },
    );
  }
}
