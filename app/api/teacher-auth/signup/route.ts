import { NextResponse } from "next/server"
import { readTeachers, createTeacher } from "@/lib/teacher-auth"

export async function POST(request: Request) {
  const { username, password, email, fullName, school } = await request.json().catch(() => ({}))
  
  if (!username || !password || !email || !fullName || !school) {
    return NextResponse.json({ 
      ok: false, 
      error: "Missing required fields: username, password, email, fullName, school" 
    }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ 
      ok: false, 
      error: "Password must be at least 6 characters long" 
    }, { status: 400 })
  }

  const teachers = readTeachers()
  const existingTeacher = teachers.find(t => t.username.toLowerCase() === username.toLowerCase())
  if (existingTeacher) {
    return NextResponse.json({ 
      ok: false, 
      error: "Username already exists" 
    }, { status: 409 })
  }

  const existingEmail = teachers.find(t => t.email.toLowerCase() === email.toLowerCase())
  if (existingEmail) {
    return NextResponse.json({ 
      ok: false, 
      error: "Email already registered" 
    }, { status: 409 })
  }

  try {
    const teacher = createTeacher(username, password, email, fullName, school)
    return NextResponse.json({ 
      ok: true, 
      message: "Teacher account created successfully",
      username: teacher.username,
      fullName: teacher.fullName,
      email: teacher.email,
      school: teacher.school
    })
  } catch (error) {
    console.error('Error creating teacher account:', error)
    return NextResponse.json({ 
      ok: false, 
      error: "Failed to create teacher account" 
    }, { status: 500 })
  }
}
