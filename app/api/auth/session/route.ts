import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value
  const result = verifySessionToken(token)
  return NextResponse.json({ ok: result.valid, username: result.username || null })
}

