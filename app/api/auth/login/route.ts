import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signJwtToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Basic validation
    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "Both email and password are required." },
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
        { 
          error: "No account found with this email. Please register first.",
          needsRegistration: true
        },
        { status: 404 }
      );
    }

    // 3. Verify password hash using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password. Please check your password and try again." },
        { status: 401 }
      );
    }

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      domain: user.domain,
      branch: user.branch,
      year: user.year,
    };

    // 4. Create JWT token
    const token = signJwtToken(userPayload);

    // 5. Response with HttpOnly session cookie
    const response = NextResponse.json(
      {
        message: "Login successful! Welcome back.",
        user: userPayload,
      },
      { status: 200 }
    );

    response.cookies.set("gla_nexus_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: unknown) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { error: "Database connection or server error during login." },
      { status: 500 }
    );
  }
}
