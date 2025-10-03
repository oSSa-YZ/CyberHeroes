import { NextResponse } from "next/server"
import { readTeachers } from "@/lib/teacher-auth"
import { hashPasswordWithSalt } from "@/lib/teacher-auth-edge"
import crypto from "crypto"

function createTeacherSessionTokenNode(username: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url")
  const payload = Buffer.from(JSON.stringify({ sub: username, role: "teacher", iat: Date.now() })).toString("base64url")
  const data = `${header}.${payload}`
  const secret = process.env.TEACHER_AUTH_SECRET || "teacher-secret-change-me"
  const sig = crypto.createHmac("sha256", secret).update(data).digest("base64url")
  return `${data}.${sig}`
}

export async function POST(request: Request) {
  const { username, password } = await request.json().catch(() => ({}))
  if (!username || !password) {
    return NextResponse.json({ ok: false, error: "Missing username or password" }, { status: 400 })
  }

  const teachers = readTeachers()
  const teacher = teachers.find((t) => t.username.toLowerCase() === String(username).toLowerCase())
  if (!teacher) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 })

  const hash = await hashPasswordWithSalt(password, teacher.salt) // returns hex string
  if (hash !== teacher.passwordHash) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 })

  const token = createTeacherSessionTokenNode(teacher.username)
  const res = NextResponse.json({ 
    ok: true, 
    username: teacher.username,
    fullName: teacher.fullName,
    email: teacher.email,
    school: teacher.school,
    role: teacher.role
  })
  res.headers.append("Set-Cookie", `teacher_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`)
  return res
}
