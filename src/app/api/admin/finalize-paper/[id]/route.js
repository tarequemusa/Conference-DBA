import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !["ADMIN", "AUTHORITY"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await req.json(); // "ACCEPTED" or "REJECTED"

    const updated = await prisma.abstract.update({
      where: { id },
      data: { status: status },
    });

    return NextResponse.json({ message: `Paper is now ${status}` });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
