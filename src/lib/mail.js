import nodemailer from "nodemailer";

// Shared Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a decision email to the Researcher
 */
export const sendDecisionEmail = async (
  to,
  researcherName,
  paperTitle,
  decision,
  comments,
) => {
  const isAccepted = decision === "ACCEPT";

  const mailOptions = {
    from: `"Conference DBA 2026" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Update on your Submission: ${paperTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #003366;">Submission Decision</h2>
        <p>Dear <strong>${researcherName}</strong>,</p>
        <p>Thank you for your submission titled: <strong>"${paperTitle}"</strong>.</p>
        <p>The Conference Authority has reached a final decision regarding your abstract:</p>
        
        <div style="padding: 15px; background: ${isAccepted ? "#f0fdf4" : "#fef2f2"}; border: 1px solid ${isAccepted ? "#bbf7d0" : "#fecaca"}; border-radius: 8px;">
          <strong style="color: ${isAccepted ? "#166534" : "#991b1b"}; text-transform: uppercase;">
            Result: ${isAccepted ? "Accepted" : "Revision Required / Rejected"}
          </strong>
        </div>

        <p><strong>Authority Comments:</strong></p>
        <blockquote style="border-left: 4px solid #C5A059; padding-left: 15px; font-style: italic; color: #555;">
          ${comments}
        </blockquote>

        ${isAccepted ? `<p>Please log in to your dashboard to proceed with the <strong>Registration and Payment</strong> phase.</p>` : ""}
        
        <p>Regards,<br/>Conference DBA Team</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

/**
 * Sends an automatic assignment notification to the Reviewer
 */
export const sendReviewAssignmentEmail = async (
  to,
  reviewerName,
  paperTitle,
) => {
  const mailOptions = {
    from: `"Conference DBA 2026" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Action Required: New Manuscript Assigned for Review`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; color: #333;">
        <h2 style="color: #003366;">Hello, ${reviewerName}</h2>
        <p>You have been assigned a new manuscript for peer review by the Conference Authority.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #003366; margin: 20px 0;">
          <p style="margin: 0; font-[10px] font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em;">Manuscript Title</p>
          <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold; color: #001A41;">${paperTitle}</p>
        </div>

        <p>Please log in to the <strong>Reviewer Portal</strong> to access the document and submit your evaluation score and comments.</p>
        
        <div style="margin-top: 30px;">
          <a href="${process.env.NEXTAUTH_URL}/reviewer" 
             style="background: #C5A059; color: #001A41; padding: 12px 25px; text-decoration: none; font-weight: 900; border-radius: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block;">
            Open Reviewer Portal
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 11px; color: #94a3b8; font-style: italic;">
          This is an automated system message. If you are unable to conduct this review, please contact the administrator immediately.
        </p>
        <p style="margin-top: 10px;">Regards,<br/><strong>Conference DBA Team</strong></p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};
