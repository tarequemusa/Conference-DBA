import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params; // Abstract ID
    const { decision } = await req.json(); // "ACCEPT" or "REJECT"

    // 1. Role Authorization
    if (!session || session.user.role !== "AUTHORITY") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch Abstract and Researcher Details
    const abstract = await prisma.abstract.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!abstract) {
      return NextResponse.json(
        { error: "Abstract not found" },
        { status: 404 },
      );
    }

    // 3. Map Decision to ProcessStatus
    const newStatus =
      decision === "ACCEPT" ? "ACCEPTANCE_NOTIFICATION" : "REJECTED"; // Or keep as FINAL_DECISION with a sub-status

    // 4. Database Update (Transaction)
    await prisma.$transaction([
      prisma.abstract.update({
        where: { id },
        data: { status: newStatus },
      }),
      prisma.review.update({
        where: { abstractId: id },
        data: {
          recommendation: decision,
          isFinal: true,
        },
      }),
    ]);

    // 5. Send Email Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailContent =
      decision === "ACCEPT"
        ? {
            subject: "Acceptance Notification - Conference DBA 2026",
            body: `Dear ${abstract.user.name},\n\nWe are pleased to inform you that your abstract titled "${abstract.title}" has been ACCEPTED for presentation at Conference DBA 2026.\n\nPlease log in to your dashboard to complete the registration and payment process.\n\nBest regards,\nConference Committee`,
          }
        : {
            subject: "Decision Notification - Conference DBA 2026",
            body: `Dear ${abstract.user.name},\n\nThank you for your submission titled "${abstract.title}". After a thorough peer review process, we regret to inform you that we cannot include your paper in this year's program.\n\nWe appreciate your interest and wish you the best in your research endeavors.\n\nBest regards,\nConference Committee`,
          };

    await transporter.sendMail({
      from: `"Conference DBA 2026" <${process.env.EMAIL_USER}>`,
      to: abstract.user.email,
      subject: emailContent.subject,
      text: emailContent.body,
    });

    return NextResponse.json({
      success: true,
      message: `Paper ${decision}ed and email sent.`,
    });
  } catch (error) {
    console.error("AUTHORITY_DECISION_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
