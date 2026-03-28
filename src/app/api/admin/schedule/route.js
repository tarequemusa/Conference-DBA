import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch only papers that have completed payment/confirmation
    const confirmedPapers = await prisma.abstract.findMany({
      where: { status: "CONFIRMED" },
      select: { id: true, title: true, scheduledSlot: true },
    });
    return Response.json(confirmedPapers);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch schedule data" },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  const { paperId, slotTime } = await req.json();
  try {
    await prisma.abstract.update({
      where: { id: paperId },
      data: { scheduledSlot: slotTime }, // Ensure this field exists in your schema
    });
    return Response.json({ message: "Slot updated" });
  } catch (error) {
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}
