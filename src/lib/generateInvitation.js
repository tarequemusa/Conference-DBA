import { jsPDF } from "jspdf";

export const downloadInvitation = (user, abstract) => {
  const doc = new jsPDF();

  // --- Header / Letterhead ---
  doc.setFillColor(0, 51, 102); // Navy Blue
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("CONFERENCE DBA 2026", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text("EAST WEST UNIVERSITY | DHAKA, BANGLADESH", 105, 30, {
    align: "center",
  });

  // --- Body ---
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  const date = new Date().toLocaleDateString();
  doc.text(`Date: ${date}`, 20, 55);
  doc.text(
    `Ref: EWU/DBA/2026/INV-${abstract.id.slice(-6).toUpperCase()}`,
    20,
    62,
  );

  doc.setFont("helvetica", "bold");
  doc.text(`To: ${user.name}`, 20, 80);
  doc.setFont("helvetica", "normal");
  doc.text(`${user.email}`, 20, 86);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("OFFICIAL LETTER OF INVITATION", 105, 110, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const message = `We are pleased to formally invite you to the International Conference on Building Resilient Supply Chains, hosted by the Department of Business Administration at East West University. 

Your abstract titled "${abstract.title}" has been accepted for presentation. Following the verification of your registration fee payment, your participation is now fully confirmed for the event scheduled for December 18-19, 2026.`;

  const splitText = doc.splitTextToSize(message, 170);
  doc.text(splitText, 20, 130);

  // --- Footer / Signature ---
  doc.text("Sincerely,", 20, 180);
  doc.setFont("helvetica", "bold");
  doc.text("Conference Chair,", 20, 195);
  doc.text("Conference DBA 2026 Committee", 20, 200);

  // --- Gold Seal Line ---
  doc.setDrawColor(197, 160, 89); // Gold
  doc.setLineWidth(1);
  doc.line(20, 210, 190, 210);

  // Download
  doc.save(`Invitation_Letter_ConferenceDBA_${abstract.id.slice(-6)}.pdf`);
};
