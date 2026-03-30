import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // --- BRANDING ASSETS ---
    const brandBlue = "#003366";
    const brandGold = "#C5A059";
    const bgLight = "#FDFCFB";

    // 🚀 IMPORTANT: Use absolute URL for logos in emails
    const ewuLogo = "https://www.ewubd.edu/storage/app/media/logo/logo.png";

    // --- SHARED STYLES & HEADER ---
    const emailStyles = `
      <style>
        @media only screen and (max-width: 620px) {
          .container { width: 100% !important; border-radius: 0 !important; }
          .content-padding { padding: 20px !important; }
          .header-padding { padding: 20px !important; }
          .logo-img { height: 45px !important; }
          .title-text { font-size: 18px !important; }
        }
      </style>
    `;

    const emailHeader = `
      <tr>
        <td class="header-padding" style="background-color: ${brandBlue}; padding: 30px 40px; text-align: left;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td width="70" style="vertical-align: middle;">
                <img src="${ewuLogo}" alt="EWU" class="logo-img" style="height: 55px; width: auto; display: block; background: rgba(255,255,255,0.1); padding: 5px; border-radius: 8px;" />
              </td>
              <td style="padding-left: 20px; vertical-align: middle;">
                <h1 class="title-text" style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; font-family: 'Segoe UI', Arial, sans-serif;">
                  DBA <span style="color: ${brandGold};">CONFERENCE</span>
                </h1>
                <p style="margin: 2px 0 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; font-family: 'Segoe UI', Arial, sans-serif;">
                  INTERNATIONAL 2026
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;

    // 1. ADMIN NOTIFICATION TEMPLATE
    const adminMailOptions = {
      from: `"DBA Conference System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Inquiry From: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>${emailStyles}</head>
        <body style="margin: 0; padding: 0; background-color: #f1f5f9;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 10px;">
            <tr>
              <td align="center">
                <table class="container" width="600" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                  ${emailHeader}
                  <tr>
                    <td class="content-padding" style="padding: 40px; font-family: 'Segoe UI', Arial, sans-serif;">
                      <p style="font-size: 10px; color: ${brandGold}; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">New Inquiry Received</p>
                      <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #edf2f7; margin-bottom: 25px;">
                        <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase;">Sender Name</p>
                        <p style="margin: 4px 0 12px; color: ${brandBlue}; font-size: 16px; font-weight: 800;">${name}</p>
                        <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase;">Sender Email</p>
                        <p style="margin: 4px 0 0; color: #475569; font-size: 14px; font-weight: 600;">${email}</p>
                      </div>
                      <p style="font-size: 10px; color: ${brandGold}; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Message Detail</p>
                      <div style="background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #f1f5f9; border-left: 4px solid ${brandBlue}; font-style: italic; color: #334155; line-height: 1.6;">
                        "${message}"
                      </div>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 35px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}" style="display: inline-block; background: ${brandBlue}; color: #ffffff; padding: 14px 30px; border-radius: 12px; text-decoration: none; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Direct Reply</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; font-weight: bold; font-family: 'Segoe UI', Arial, sans-serif;">
                      DBA CONFERENCE | EAST WEST UNIVERSITY
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // 2. USER ACKNOWLEDGMENT TEMPLATE
    const userMailOptions = {
      from: `"DBA Conference 2026" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Acknowledgment: Your Inquiry to DBA Conference 2026",
      html: `
        <!DOCTYPE html>
        <html>
        <head>${emailStyles}</head>
        <body style="margin: 0; padding: 0; background-color: ${bgLight};">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${bgLight}; padding: 30px 10px;">
            <tr>
              <td align="center">
                <table class="container" width="600" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #f1f5f9; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                  ${emailHeader}
                  <tr>
                    <td class="content-padding" style="padding: 40px; font-family: 'Segoe UI', Arial, sans-serif;">
                      <h2 style="color: ${brandBlue}; font-size: 22px; font-weight: 900; margin-top: 0; letter-spacing: -0.5px;">Dear ${name},</h2>
                      <p style="color: #475569; font-size: 15px; line-height: 1.8;">
                        Thank you for contacting the <strong>International Conference on Building Resilient Supply Chains</strong>.
                      </p>
                      <p style="color: #475569; font-size: 15px; line-height: 1.8;">
                        We have received your message and our organizing committee at <strong>East West University</strong> is currently reviewing your request. You can expect a response within <strong>24 to 48 hours</strong>.
                      </p>

                      <div style="margin: 35px 0; padding: 25px; border: 2px dashed #edf2f7; border-radius: 16px; text-align: center; background: #fafafa;">
                        <p style="margin: 0; font-size: 12px; color: ${brandBlue}; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Did you know?</p>
                        <p style="margin: 8px 0 18px; font-size: 13px; color: #64748b;">The submission window for Scopus Indexed Proceedings is currently active.</p>
                        <a href="https://your-website-url.com/guidelines" style="display: inline-block; background: ${brandBlue}; color: #ffffff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-size: 11px; font-weight: bold; text-transform: uppercase;">View Guidelines</a>
                      </div>

                      <div style="border-top: 1px solid #f1f5f9; padding-top: 30px; margin-top: 30px;">
                        <p style="margin: 0; color: ${brandBlue}; font-weight: 900; font-size: 14px;">Regards,</p>
                        <p style="margin: 2px 0 0; color: #64748b; font-size: 14px; font-weight: 600;">Organizing Committee</p>
                        <p style="margin: 0; color: ${brandGold}; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px;">DBA Conference 2026</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: ${brandBlue}; color: #ffffff; padding: 25px; text-align: center; font-family: 'Segoe UI', Arial, sans-serif;">
                      <p style="margin: 0; font-size: 10px; letter-spacing: 1px; font-weight: bold;">EAST WEST UNIVERSITY | AFTABNAGAR, DHAKA</p>
                      <div style="margin-top: 12px; font-size: 10px;">
                        <a href="#" style="color: ${brandGold}; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                        <a href="#" style="color: ${brandGold}; text-decoration: none; margin: 0 10px;">Contact Us</a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await transporter.verify();
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Mail Error:", error);
    return NextResponse.json(
      { error: "Email delivery failed", details: error.message },
      { status: 500 },
    );
  }
}
