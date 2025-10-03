import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken } from "@/lib/auth"
import { computeUserBadges } from "@/lib/progress"

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value
  const result = verifySessionToken(token)
  if (!result.valid || !result.username) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }
  const badges = computeUserBadges(result.username)
  return NextResponse.json({ ok: true, badges })
}


