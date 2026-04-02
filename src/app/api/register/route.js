import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    // 🚀 Added country and userType to the destructured body
    const { name, email, password, country, userType } = body;

    // 1. Basic Validation
    if (!name || !email || !password || !country || !userType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 🚀 Normalization: Trim and Lowercase to prevent "User Not Found" at login
    const normalizedEmail = email.toLowerCase().trim();

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      // 🚀 This specific message triggers the redirect in your AuthModal
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 },
      );
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the user
    // Ensure your schema.prisma includes 'country' and 'userType' fields
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        country: country,
        userType: userType,
        role: "RESEARCHER", // Default role
      },
    });

    // 🚀 Log for verification in your VS Code terminal
    console.log("✅ DB_WRITE_SUCCESS: User created ->", user.email);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { email: user.email },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ REGISTRATION_API_ERROR:", error);

    // Check if it's a Prisma connection error to give better feedback
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
