import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, domain, branch, year } = body;

    // 1. Basic validation
    if (!name || !email || !password || !domain || !branch || !year) {
      return NextResponse.json(
        { error: "All fields (Name, Email, Password, Domain, Branch, Year) are required." },
        { status: 400 }
      );
    }

    // 2. Validate email domain
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gla\.ac\.in$/;
    if (!emailPattern.test(email.toLowerCase().trim())) {
      return NextResponse.json(
        { error: "Only verified @gla.ac.in emails are allowed." },
        { status: 400 }
      );
    }

    // 3. Password length check
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const formattedEmail = email.toLowerCase().trim();

    // 4. Check existing user in PostgreSQL
    const existingUser = await prisma.user.findUnique({
      where: { email: formattedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this GLA email already exists." },
        { status: 409 }
      );
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create user record
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: formattedEmail,
        password: hashedPassword,
        domain,
        branch,
        year,
      },
    });

    // Return success without sending back password hash
    return NextResponse.json(
      {
        message: "User registered successfully!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          domain: user.domain,
          branch: user.branch,
          year: user.year,
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Register Error:", err);
    return NextResponse.json(
      { error: "Database connection or server error during registration." },
      { status: 500 }
    );
  }
}
