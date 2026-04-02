import prisma from "@/lib/prisma";
import crypto from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email)
      return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "This email address is not registered." },
        { status: 404 },
      );
    }

    // 1. Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.$transaction([
      prisma.passwordResetToken.deleteMany({
        where: { email: normalizedEmail },
      }),
      prisma.passwordResetToken.create({
        data: { email: normalizedEmail, token, expires },
      }),
    ]);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    // 2. Define standard URLs
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    const logoUrl = `${process.env.NEXTAUTH_URL}/images/logo.png`;

    // 3. Branded HTML Template (Thematic Header with Logo)
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f1f5f9; }
        .wrapper { width: 100%; padding: 40px 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        
        /* 🚀 THEMATIC HEADER WITH LOGO */
        .header { background-color: #003366; padding: 30px; text-align: left; position: relative; }
        .header-flex { display: table; width: 100%; }
        .logo-cell { display: table-cell; vertical-align: middle; width: 60px; }
        .text-cell { display: table-cell; vertical-align: middle; padding-left: 15px; }
        .logo { width: 50px; height: auto; background: rgba(255,255,255,0.1); padding: 5px; border-radius: 8px; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; line-height: 1; }
        .header p { color: rgba(255,255,255,0.7); margin: 5px 0 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
        
        /* CONTENT AREA */
        .content { padding: 50px 40px; }
        .content h2 { color: #003366; font-size: 26px; font-weight: 800; margin-bottom: 20px; }
        .content p { color: #334155; line-height: 1.7; font-size: 15px; margin-bottom: 30px; }
        
        /* ACTION BOX */
        .action-card { background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 20px; padding: 35px; text-align: center; margin: 30px 0; }
        .action-card h4 { color: #003366; text-transform: uppercase; margin: 0 0 10px 0; font-size: 13px; letter-spacing: 1px; font-weight: 900; }
        .action-card p { font-size: 12px; color: #64748b; margin-bottom: 25px; }
        
        .btn { display: inline-block; background-color: #003366; color: #ffffff !important; padding: 16px 35px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; transition: background 0.3s; }
        
        /* SIGNATURE */
        .signature { margin-top: 40px; padding-top: 25px; border-top: 1px solid #f1f5f9; }
        .signature p { margin: 0; font-size: 15px; color: #1e293b; font-weight: 700; }
        .signature span { font-size: 13px; color: #64748b; }
        .conf-text { color: #C5A059 !important; font-size: 13px !important; font-weight: 900; margin-top: 4px !important; text-transform: uppercase; }

        /* FOOTER */
        .footer { background-color: #003366; padding: 35px; text-align: center; color: white; }
        .footer p { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 15px 0; color: #ffffff; }
        .footer div { margin-top: 15px; }
        .footer a { color: #94a3b8; text-decoration: none; font-size: 12px; margin: 0 12px; border-bottom: 1px solid transparent; }
        .footer a:hover { border-bottom: 1px solid #94a3b8; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <div class="header-flex">
              <div class="logo-cell">
                <img src="${logoUrl}" alt="Logo" class="logo">
              </div>
              <div class="text-cell">
                <h1>DBA CONFERENCE</h1>
                <p>INTERNATIONAL 2026</p>
              </div>
            </div>
          </div>
          <div class="content">
            <h2>Dear ${user.name || "Researcher"},</h2>
            <p>We received a request to reset your password for the <b>Conference DBA Portal</b>. Security is our priority; please use the link below to select a new secure password.</p>
            
            <div class="action-card">
              <h4>Security Verification</h4>
              <p>This single-use link is active for <b>1 hour</b>. If you did not make this request, please ignore this email.</p>
              <a href="${resetLink}" class="btn">Reset Password Now</a>
            </div>

            <div class="signature">
              <p>Regards,</p>
              <span>Organizing Committee</span><br>
              <p class="conf-text">DBA CONFERENCE 2026</p>
            </div>
          </div>
          <div class="footer">
            <p>EAST WEST UNIVERSITY | AFTABNAGAR, DHAKA</p>
            <div>
              <a href="${process.env.NEXTAUTH_URL}/legal">Privacy Policy</a>
              <a href="${process.env.NEXTAUTH_URL}/#contact">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    // 4. Send the Email
    await transporter.sendMail({
      from: `"DBA Conference Admin" <${process.env.EMAIL_USER}>`,
      to: normalizedEmail,
      subject: "Action Required: Reset Your Password - DBA Conference 2026",
      html: emailHtml,
    });

    return NextResponse.json({ message: "Recovery link sent." });
  } catch (error) {
    console.error("EMAIL_ERROR:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
