import prisma from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const normalizedEmail = email.toLowerCase();

    // 1. Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // 2. STRICT RESTRICTION: Non-registered users
    if (!user) {
      return Response.json(
        { error: "This email address is not registered in our system." },
        { status: 404 },
      );
    }

    // 3. GMAIL EXCLUSION: Users who signed up with Google
    // Google users have a null password field in our schema.
    if (!user.password) {
      return Response.json(
        {
          error:
            "This account uses Google Authentication. Please log in using the 'Continue with Google' button.",
        },
        { status: 400 },
      );
    }

    // 4. VALIDATED: User is a local registered user. Proceed with token generation.
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour expiry

    // 5. Database Transaction: Clear old tokens and create new one
    await prisma.$transaction([
      prisma.passwordResetToken.deleteMany({
        where: { email: normalizedEmail },
      }),
      prisma.passwordResetToken.create({
        data: { email: normalizedEmail, token, expires },
      }),
    ]);

    // 6. Send the Recovery Email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    await transporter.sendMail({
      from: `"Conference DBA 2026 Admin" <${process.env.EMAIL_USER}>`,
      to: normalizedEmail,
      subject: "Password Reset Request - Conference DBA 2026",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #003366;">Password Reset</h2>
          <p>We received a request to reset your password for the Conference DBA 2026 Portal.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background: #C5A059; color: #003366; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Reset My Password
            </a>
          </div>
          <p style="font-size: 12px; color: #777;">This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    return Response.json({
      message: "Success! Recovery link sent to your email.",
    });
  } catch (error) {
    console.error("FORGOT_PASSWORD_VALIDATION_ERROR:", error);
    return Response.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
