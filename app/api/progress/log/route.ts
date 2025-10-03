import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken } from "@/lib/auth"
import { appendProgressEvent } from "@/lib/progress"

export async function POST(request: NextRequest) {
  const token = request.cookies.get("session")?.value
  const result = verifySessionToken(token)
  if (!result.valid || !result.username) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }
  let body: any = {}
  try {
    body = await request.json()
  } catch {}
  const { type, payload } = body || {}
  if (!type || typeof type !== "string") {
    return NextResponse.json({ ok: false, error: "invalid_type" }, { status: 400 })
  }
  appendProgressEvent({ username: result.username, type, payload })
  return NextResponse.json({ ok: true })
}


