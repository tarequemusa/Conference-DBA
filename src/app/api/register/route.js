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

    // 🚀 FIX: Normalize email (Trim spaces and force lowercase)
    const normalizedEmail = email.toLowerCase().trim();

    // 2. Check if user already exists using normalized email
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
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
    // Using normalizedEmail ensures login works every time
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "RESEARCHER",
      },
    });

    // 🚀 Log success to terminal to verify DB write
    console.log("✅ User created in Prisma:", user.email);

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("REGISTRATION_API_ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
