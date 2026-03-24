import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

// --- 1. GET: Fetch all users for the Management Table ---
export async function GET() {
  const session = await getServerSession(authOptions);

  // Security Check: Only Admins can see the user list
  if (!session || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(users);
  } catch (error) {
    console.error("GET_USERS_ERROR:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// --- 2. PATCH: Update User Roles (Researcher -> Reviewer etc.) ---
export async function PATCH(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId, role } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return Response.json(updatedUser);
  } catch (error) {
    console.error("PATCH_USER_ROLE_ERROR:", error);
    return Response.json({ error: "Failed to update role" }, { status: 500 });
  }
}
