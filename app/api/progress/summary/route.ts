import { NextResponse } from "next/server"
import { summarizeProgress } from "@/lib/progress"
import { verifySessionToken } from "@/lib/auth"
import { readProgressEvents } from "@/lib/progress"

export async function GET() {
  const summary = summarizeProgress()
  return NextResponse.json({ ok: true, summary })
}

// Per-user lightweight summary used by Games page progress cards
export async function POST(request: Request) {
  const token = (await (request as any).cookies?.get?.("session")?.value) || null
  // If cookies accessor isn't available here (node runtime), parse from header
  const cookieHeader = (request.headers.get('cookie') || '')
  const cookieMap = Object.fromEntries(cookieHeader.split(';').map(s=>s.trim().split('=')))
  const tokenFromHeader = cookieMap['session']
  const t = token || tokenFromHeader
  const res = verifySessionToken(t)
  if (!res.valid || !res.username) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })

  const events = readProgressEvents().filter(e => e.username === res.username)
  const types = new Set(events.map(e => String(e.type).replace(/\s*:\s*/, ':')))
  const quizDone = types.has('quiz:completed')
  const phishingDone = types.has('phishing-detective:completed')
  const passwordDone = types.has('password-protector:completed')
  const cyberdefenderDone = types.has('digital-footprint:completed')
  const gamesPlayed = Array.from(types).filter(t => t.endsWith(':visited') && (t.startsWith('phishing-detective') || t.startsWith('password-protector') || t.startsWith('digital-footprint'))).length
  const activitiesDone = Array.from(types).filter(t => t.startsWith('activities:')).length
  return NextResponse.json({ ok: true, user: res.username, progress: {
    quizCompleted: quizDone,
    gamesPlayed,
    activitiesDone,
    modulesCompleted: { phishingDone, passwordDone, cyberdefenderDone }
  }})
}


