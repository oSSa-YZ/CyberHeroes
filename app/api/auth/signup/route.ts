import { NextResponse } from "next/server"
import { readUsers, writeUsers, generateSalt, hashPasswordWithSalt, createSessionToken } from "@/lib/auth"

export async function POST(request: Request) {
  const { username, password } = await request.json().catch(() => ({}))
  if (!username || !password) {
    return NextResponse.json({ ok: false, error: "Missing username or password" }, { status: 400 })
  }

  const users = readUsers()
  if (users.some((u) => u.username.toLowerCase() === String(username).toLowerCase())) {
    return NextResponse.json({ ok: false, error: "Username already exists" }, { status: 409 })
  }

  const salt = generateSalt()
  const passwordHash = hashPasswordWithSalt(password, salt)
  users.push({ username, salt, passwordHash, createdAt: new Date().toISOString() })
  writeUsers(users)

  const token = createSessionToken(username)
  const res = NextResponse.json({ ok: true, username })
  res.headers.append("Set-Cookie", `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`)
  return res
}

