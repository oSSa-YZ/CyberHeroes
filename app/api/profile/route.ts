import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken } from "@/lib/auth"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const PROFILE_FILE = path.join(DATA_DIR, "profiles.json")

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(PROFILE_FILE)) fs.writeFileSync(PROFILE_FILE, JSON.stringify({ profiles: [] }, null, 2))
}

function readProfiles(): any[] {
  ensureStore()
  const raw = fs.readFileSync(PROFILE_FILE, 'utf8')
  const data = JSON.parse(raw || '{"profiles":[]}')
  return Array.isArray(data.profiles) ? data.profiles : []
}

function writeProfiles(profiles: any[]) {
  ensureStore()
  fs.writeFileSync(PROFILE_FILE, JSON.stringify({ profiles }, null, 2), 'utf8')
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('session')?.value
  const res = verifySessionToken(token)
  if (!res.valid || !res.username) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  const profiles = readProfiles()
  const profile = profiles.find(p => p.username === res.username) || { username: res.username, fullName: res.username, avatarUrl: '' }
  return NextResponse.json({ ok: true, profile })
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('session')?.value
  const res = verifySessionToken(token)
  if (!res.valid || !res.username) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  const body = await request.json().catch(()=>({}))
  const profiles = readProfiles()
  const idx = profiles.findIndex(p => p.username === res.username)
  const prev = idx === -1 ? {} : (profiles[idx] || {})
  const next = {
    username: res.username,
    fullName: body.fullName ?? prev.fullName ?? res.username,
    avatarUrl: body.avatarUrl ?? prev.avatarUrl ?? '',
    email: body.email ?? prev.email ?? '',
    mobile: body.mobile ?? prev.mobile ?? '',
    birthdate: body.birthdate ?? prev.birthdate ?? '',
    studentNo: body.studentNo ?? prev.studentNo ?? ''
  }
  if (idx === -1) profiles.push(next); else profiles[idx] = next
  writeProfiles(profiles)
  return NextResponse.json({ ok: true })
}


