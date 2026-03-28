import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.systemSettings.findFirst({ where: { id: 1 } });
  return NextResponse.json(settings || {});
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const settings = await prisma.systemSettings.upsert({
    where: { id: 1 },
    update: body,
    create: { id: 1, ...body },
  });

  return NextResponse.json(settings);
}
