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

    // 1. Verify paper eligibility
    const paper = await prisma.abstract.findUnique({
      where: { id: abstractId, userId: session.user.id },
    });

    if (!paper || paper.status !== "ACCEPTANCE_NOTIFICATION") {
      return NextResponse.json(
        { error: "Paper not eligible for payment" },
        { status: 400 },
      );
    }

    // 2. Define Fee (Example: $100 or 10,000 BDT)
    const registrationFee = 100.0;

    // 3. Logic: Integrate Stripe or SSLCommerz here
    // For now, we simulate a successful redirect
    return NextResponse.json({
      checkoutUrl: `/dashboard/payment/success?id=${abstractId}`,
      amount: registrationFee,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 },
    );
  }
}
