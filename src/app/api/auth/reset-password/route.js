import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    // 1. Find and validate token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.expires < new Date()) {
      return Response.json(
        { error: "Invalid or expired link" },
        { status: 400 },
      );
    }

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Update User and Delete Token in a Transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetToken.email },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { token },
      }),
    ]);

    // 4. Send "Password Changed" Security Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"ICEBTM 2025 Security" <security@icebtm.com>',
      to: resetToken.email,
      subject: "Security Alert: Your password was changed",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
          <div style="background-color: #003366; padding: 20px; text-align: center;">
            <h1 style="color: #C5A059; margin: 0; font-size: 24px;">Security Notification</h1>
          </div>
          <div style="padding: 40px; color: #1e293b; line-height: 1.6;">
            <p>Hello,</p>
            <p>This is a confirmation that the password for your <strong>ICEBTM 2025 Conference Portal</strong> account was recently changed.</p>
            
            <div style="background-color: #f8fafc; border-left: 4px solid #C5A059; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;"><strong>When:</strong> ${new Date().toUTCString()}</p>
              <p style="margin: 5px 0 0 0; font-size: 14px;"><strong>Action:</strong> Password Reset via Recovery Link</p>
            </div>

            <p>If you made this change, you can safely ignore this email.</p>
            
            <p style="color: #dc2626; font-weight: bold; margin-top: 30px;">Did you not make this change?</p>
            <p>If you did not authorize this, please contact our support team immediately to secure your account.</p>
            
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            <p style="font-size: 12px; color: #64748b; text-align: center;">
              © 2026 EWU Conference Committee | International Conference on Economics, Business and Technology Management
            </p>
          </div>
        </div>
      `,
    });

    return Response.json({
      message: "Password updated and notification sent.",
    });
  } catch (error) {
    console.error("RESET_PASSWORD_ERROR:", error);
    return Response.json(
      { error: "Failed to reset password" },
      { status: 500 },
    );
  }
}
