import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendDecisionEmail } from "@/lib/mail"; // Import the utility
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    const { decision, authorityComments } = await req.json();

    if (!session || session.user.role !== "AUTHORITY") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Map decision to schema status
    const finalStatus =
      decision === "ACCEPT" ? "ACCEPTANCE_NOTIFICATION" : "REJECTED";

    // 2. Update Database & Fetch User Info
    const updatedAbstract = await prisma.abstract.update({
      where: { id },
      data: { status: finalStatus },
      include: {
        user: { select: { email: true, name: true } },
      },
    });

    // 3. Send Email (Nodemailer)
    try {
      await sendDecisionEmail(
        updatedAbstract.user.email,
        updatedAbstract.user.name,
        updatedAbstract.title,
        decision,
        authorityComments,
      );
    } catch (mailError) {
      console.error("MAIL_ERROR:", mailError);
      // We don't return an error here because the DB update was successful,
      // but we log it for the admin.
    }

    return NextResponse.json({
      message: `Decision finalized and email sent to ${updatedAbstract.user.email}`,
    });
  } catch (error) {
    console.error("AUTHORITY_POST_ERR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
