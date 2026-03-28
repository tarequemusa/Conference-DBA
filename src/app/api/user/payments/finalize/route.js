import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendDecisionEmail as sendEmail } from "@/lib/mail"; // 🚀 Added mailer
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const { abstractId } = await req.json();

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Atomic update to CONFIRMED status
    const updated = await prisma.abstract.update({
      where: { id: abstractId, userId: session.user.id },
      data: {
        status: "CONFIRMED",
        isPaid: true,
        updatedAt: new Date(),
      },
      include: { user: true }, // 🚀 Include user to get email/name
    });

    // 🚀 Trigger Automated Email Receipt
    await sendEmail(
      updated.user.email,
      updated.user.name,
      updated.title,
      "ACCEPT", // Reuses your accepted template style
      `
      <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-top: 20px;">
        <h3 style="color: #003366; margin-top: 0; text-transform: uppercase; font-size: 14px;">Official Payment Receipt</h3>
        <p style="font-size: 12px; color: #64748b;">Transaction Reference: <strong>REG-${updated.id.slice(-8).toUpperCase()}</strong></p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
        <table style="width: 100%; font-size: 13px;">
          <tr>
            <td><strong>Registration Fee:</strong></td>
            <td style="text-align: right;">$100.00 USD</td>
          </tr>
          <tr>
            <td><strong>Status:</strong></td>
            <td style="text-align: right; color: #166534; font-weight: bold;">PAID & VERIFIED</td>
          </tr>
        </table>
      </div>
      <p style="margin-top: 20px;">Your registration for <strong>Conference DBA 2026</strong> is now complete. You may now download your <strong>Official Invitation Letter</strong> from your dashboard to assist with travel or institutional requirements.</p>
      `,
    );

    return NextResponse.json({ message: "Registration confirmed" });
  } catch (error) {
    console.error("Finalize Error:", error);
    return NextResponse.json(
      { error: "Database update failed" },
      { status: 500 },
    );
  }
}
