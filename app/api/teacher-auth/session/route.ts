import { NextResponse } from "next/server"
import { verifyTeacherSessionToken } from "@/lib/teacher-auth-edge"
import { readTeachers } from "@/lib/teacher-auth"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get("teacher_session")?.value
  const { valid, username, role } = await verifyTeacherSessionToken(token)
  
  if (!valid || role !== "teacher") {
    return NextResponse.json({ ok: false, authenticated: false })
  }

  const teachers = readTeachers()
  const teacher = teachers.find(t => t.username === username)
  
  if (!teacher) {
    return NextResponse.json({ ok: false, authenticated: false })
  }

  return NextResponse.json({
    ok: true,
    authenticated: true,
    username: teacher.username,
    fullName: teacher.fullName,
    email: teacher.email,
    school: teacher.school,
    role: teacher.role
  })
}
