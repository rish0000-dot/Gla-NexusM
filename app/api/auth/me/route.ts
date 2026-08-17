import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwtToken } from "@/lib/jwt";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("gla_nexus_session")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    const payload = verifyJwtToken(token);

    if (!payload) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
      user: payload,
    }, { status: 200 });
  } catch (err) {
    console.error("Auth Me Error:", err);
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
