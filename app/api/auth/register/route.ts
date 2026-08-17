import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signJwtToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, domain, branch, year } = body;

    // 1. Check all required fields
    if (!name?.trim() || !email?.trim() || !password || !domain?.trim() || !branch?.trim() || !year?.trim()) {
      return NextResponse.json(
        { error: "All fields (Name, GLA Email, Password, Domain, Branch, Year) are required." },
        { status: 400 }
      );
    }

    const formattedEmail = email.toLowerCase().trim();
    const trimmedName = name.trim();

    // 2. Validate email domain (Must end with @gla.ac.in)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gla\.ac\.in$/;
    if (!emailPattern.test(formattedEmail)) {
      return NextResponse.json(
        { error: "Only official @gla.ac.in student/faculty emails are allowed." },
        { status: 400 }
      );
    }

    // 3. Password security check (At least 6 characters, letters and numbers)
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)/;
    if (!passwordPattern.test(password)) {
      return NextResponse.json(
        { error: "Password must contain both letters and numbers for security." },
        { status: 400 }
      );
    }

    // 4. Duplicate Check: Prevent re-registration if email exists in PostgreSQL
    const existingUser = await prisma.user.findUnique({
      where: { email: formattedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          error: "An account with this GLA email already exists. Please log in instead.",
          isAlreadyRegistered: true 
        },
        { status: 409 }
      );
    }

    // 5. Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Save user to PostgreSQL database
    const user = await prisma.user.create({
      data: {
        name: trimmedName,
        email: formattedEmail,
        password: hashedPassword,
        domain: domain.trim(),
        branch: branch.trim(),
        year: year.trim(),
      },
    });

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      domain: user.domain,
      branch: user.branch,
      year: user.year,
    };

    // 7. Create JWT token
    const token = signJwtToken(userPayload);

    // 8. Create Response with HttpOnly session cookie
    const response = NextResponse.json(
      {
        message: "Registration successful! Welcome to Gla~Nexus.",
        user: userPayload,
      },
      { status: 201 }
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
    console.error("Register Security Error:", err);
    return NextResponse.json(
      { error: "Server or database connection error during registration." },
      { status: 500 }
    );
  }
}
