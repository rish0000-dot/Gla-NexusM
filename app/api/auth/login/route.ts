import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const formattedEmail = email.toLowerCase().trim();

    // 2. Find user in PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email: formattedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email. Please sign up." },
        { status: 404 }
      );
    }

    // 3. Compare password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    // Return authenticated user info
    return NextResponse.json(
      {
        message: "Login successful!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          domain: user.domain,
          branch: user.branch,
          year: user.year,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { error: "Database connection or server error during login." },
      { status: 500 }
    );
  }
}
