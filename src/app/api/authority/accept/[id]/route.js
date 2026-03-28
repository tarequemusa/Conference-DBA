// import {sendEmail} from "@/lib/mailer"; // Your email helper
import { sendEmail } from "@/lib/node_mailer";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const abstractId = params.id;

    const updated = await prisma.abstract.update({
      where: { id: abstractId },
      data: { status: "ACCEPTANCE_NOTIFICATION" },
      include: { user: true },
    });

    // Trigger Automated Email
    await sendEmail({
      to: updated.user.email,
      subject: "Abstract Accepted - Conference DBA 2026",
      text: `Congratulations ${updated.user.name}, your abstract "${updated.title}" has been accepted. Please proceed to payment.`,
    });

    return NextResponse.json({ message: "Researcher Notified & Accepted" });
  } catch (error) {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
