import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession();
  const { abstractId, decision } = await req.json(); // decision: 'ACCEPTED' or 'REJECTED'

  // 1. Verify if the user is an Admin/Lead Reviewer
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (user.role !== "REVIEWER")
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  // 2. Check if all reviewers have submitted their ratings
  const reviewCount = await prisma.review.count({ where: { abstractId } });

  if (reviewCount < 2) {
    return Response.json(
      { error: "At least 2 reviews required before finalization" },
      { status: 400 },
    );
  }

  // 3. Update state and notify researcher
  const updated = await prisma.abstract.update({
    where: { id: abstractId },
    data: {
      status: decision === "ACCEPTED" ? "FINAL_DECISION" : "REVISION_REQUIRED",
    },
  });

  return Response.json(updated);
}
