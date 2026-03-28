import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allAbstracts = await prisma.abstract.findMany({
    where: { status: { in: ["ACCEPTANCE_NOTIFICATION", "CONFIRMED"] } },
    select: { isPaid: true },
  });

  const stats = {
    totalAccepted: allAbstracts.length,
    paidCount: allAbstracts.filter((a) => a.isPaid).length,
    unpaidCount: allAbstracts.filter((a) => !a.isPaid).length,
    totalRevenue: allAbstracts.filter((a) => a.isPaid).length * 5000, // Assuming 5000 BDT
    pendingRevenue: allAbstracts.filter((a) => !a.isPaid).length * 5000,
  };

  return NextResponse.json(stats);
}
