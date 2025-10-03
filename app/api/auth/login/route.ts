import { NextResponse } from "next/server"
import { readUsers, hashPasswordWithSalt, createSessionToken } from "@/lib/auth"

export async function POST(request: Request) {
  const { username, password } = await request.json().catch(() => ({}))
  if (!username || !password) {
    return NextResponse.json({ ok: false, error: "Missing username or password" }, { status: 400 })
  }

  const users = readUsers()
  const user = users.find((u) => u.username.toLowerCase() === String(username).toLowerCase())
  if (!user) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 })

  const hash = hashPasswordWithSalt(password, user.salt)
  if (hash !== user.passwordHash) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 })

  const token = createSessionToken(user.username)
  const res = NextResponse.json({ ok: true, username: user.username })
  res.headers.append("Set-Cookie", `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`)
  return res
}

