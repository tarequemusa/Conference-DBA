import prisma from "@/lib/prisma";
import crypto from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check user existence and authentication type
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "This email address is not registered." },
        { status: 404 },
      );
    }

    // Prevent local password reset for Google-only users
    if (!user.password) {
      return NextResponse.json(
        {
          error:
            "This account uses Google Login. Please use 'Continue with Google'.",
        },
        { status: 400 },
      );
    }

    // 2. Generate secure 1-hour token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    // 3. Atomic Database Transaction
    await prisma.$transaction([
      prisma.passwordResetToken.deleteMany({
        where: { email: normalizedEmail },
      }),
      prisma.passwordResetToken.create({
        data: { email: normalizedEmail, token, expires },
      }),
    ]);

    // 4. SMTP Configuration (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // 16-character App Password
      },
    });

    // 5. Generate Link for the new UI path
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    // 6. Send Branded Email
    await transporter.sendMail({
      from: `"Conference DBA 2026 Admin" <${process.env.EMAIL_USER}>`,
      to: normalizedEmail,
      subject: "Password Recovery Request - Conference DBA 2026",
      html: `
        <div style="background-color: #f8fafc; padding: 40px 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 32px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
            
            <div style="background-color: #003366; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
                CONFERENCE <span style="color: #C5A059;">DBA</span>
              </h1>
              <p style="color: rgba(255,255,255,0.6); margin: 5px 0 0 0; font-size: 10px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase;">
                International 2026
              </p>
            </div>

            <div style="padding: 50px 40px; text-align: center;">
              <h2 style="color: #003366; font-size: 24px; font-weight: 900; margin-bottom: 15px; text-transform: uppercase; letter-spacing: -1px;">
                Password Recovery
              </h2>
              <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin-bottom: 35px; font-weight: 500;">
                We received a request to reset your password for the Conference DBA Portal. Please click the button below to choose a new secure password.
              </p>

              <div style="margin-bottom: 35px;">
                <a href="${resetLink}" style="background-color: #C5A059; color: #003366; padding: 18px 45px; text-decoration: none; border-radius: 16px; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; display: inline-block; box-shadow: 0 10px 15px -3px rgba(197, 160, 89, 0.3);">
                  Reset Password
                </a>
              </div>

              <div style="background-color: #f8fafc; border-radius: 20px; padding: 20px; border: 1px dashed #e2e8f0;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0; font-weight: 600;">
                  This link will expire in <span style="color: #003366;">1 hour</span>.
                </p>
                <p style="color: #94a3b8; font-size: 11px; margin-top: 10px;">
                  If you did not request this, you can safely ignore this email.
                </p>
              </div>
            </div>

            <div style="padding: 30px; text-align: center; border-top: 1px solid #f1f5f9;">
              <p style="color: #cbd5e1; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0;">
                © 2026 EWU Conference Committee | International ICEBTM
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Recovery link sent successfully." });
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 },
    );
  }
}
