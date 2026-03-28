import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 1. Find the token
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: token.trim(),
        expires: { gt: new Date() }, // Find only if not expired
      },
    });

    if (!resetToken) {
      return NextResponse.json(
        {
          error: "Invalid or expired recovery link. Please request a new one.",
        },
        { status: 400 },
      );
    }

    // 2. Hash and Update
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetToken.email },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.deleteMany({
        where: { email: resetToken.email }, // Clear all tokens for this user
      }),
    ]);

    // 3. Branded Security Notification (Matching your UI)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Conference DBA Security" <${process.env.EMAIL_USER}>`,
      to: resetToken.email,
      subject: "Security Alert: Password Changed",
      html: `
        <div style="background-color: #f8fafc; padding: 40px 10px; font-family: sans-serif;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 32px; overflow: hidden; border: 1px solid #e2e8f0;">
            <div style="background-color: #003366; padding: 20px; text-align: center;">
               <h2 style="color: #C5A059; margin: 0; text-transform: uppercase; font-size: 16px;">Security Update</h2>
            </div>
            <div style="padding: 40px; text-align: center;">
              <p style="color: #1e293b; font-size: 16px; font-weight: 600;">Your password was successfully updated.</p>
              <p style="color: #64748b; font-size: 14px;">If you did not perform this action, please secure your account immediately.</p>
            </div>
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
