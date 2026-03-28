// import {sendEmail} from "@/lib/mailer"; // Your email helper
import { sendDecisionEmail as sendEmail } from "@/lib/mail"; // ✅ Aliased to keep the code below the same
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

    // 🚀 Trigger Automated Email with correct arguments for mail.js
    await sendEmail(
      updated.user.email, // to
      updated.user.name, // researcherName
      updated.title, // paperTitle
      "ACCEPT", // decision
      "Congratulations! Your abstract has been accepted. Please proceed to payment.", // comments
    );

    return NextResponse.json({ message: "Researcher Notified & Accepted" });
  } catch (error) {
    console.error("Email/Update Error:", error);
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
