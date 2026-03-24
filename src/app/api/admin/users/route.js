import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const roleFilter = searchParams.get("role");

    // Build query WITHOUT createdAt if you haven't run db push yet
    const queryOptions = {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        // createdAt: true, // Comment this out if you skip Step 1
      },
      // orderBy: { id: "desc" }, // Sort by ID instead of createdAt for now
    };

    if (roleFilter) {
      queryOptions.where = { role: roleFilter };
    }

    const users = await prisma.user.findMany(queryOptions);

    return Response.json(users);
  } catch (error) {
    console.error("PRISMA_QUERY_ERROR:", error.message);
    return Response.json(
      { error: "Query failed. check if createdAt exists in User model." },
      { status: 500 },
    );
  }
}
