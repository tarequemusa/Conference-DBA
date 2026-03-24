import prisma from "@/lib/prisma"; // Use the singleton
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 1. Basic Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 },
      );
    }

    // 3. Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the user
    // Note: Role defaults to RESEARCHER if not specified in your schema
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "RESEARCHER", // Ensuring they start as a researcher
      },
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    // Check your terminal for this log if registration fails!
    console.error("REGISTRATION_API_ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
