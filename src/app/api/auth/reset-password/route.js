import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: token.trim() },
    });

    if (!resetToken || resetToken.expires < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired recovery link" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetToken.email },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { token: resetToken.token },
      }),
    ]);

    // Send Security Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ICEBTM Security" <${process.env.EMAIL_USER}>`,
      to: resetToken.email,
      subject: "Security Alert: Your password was changed",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #003366; padding: 20px; text-align: center;">
            <h1 style="color: #C5A059; margin: 0;">Security Notification</h1>
          </div>
          <div style="padding: 30px; color: #333;">
            <p>Hello,</p>
            <p>Your password for the <strong>ICEBTM 2026 Portal</strong> was recently updated.</p>
            <p>If you did not make this change, please contact support immediately.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #999; text-align: center;">© 2026 EWU Conference Committee</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("RESET_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
