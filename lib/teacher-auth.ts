import crypto from "crypto"
import fs from "fs"
import path from "path"

export interface TeacherRecord {
  username: string
  passwordHash: string
  salt: string
  email: string
  fullName: string
  school: string
  role: string
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const TEACHERS_FILE = path.join(DATA_DIR, "teachers.json")

export function ensureTeacherStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(TEACHERS_FILE)) {
    // Create default teacher account
    const salt = generateSalt()
    const defaultTeacher: TeacherRecord = {
      username: "teacher",
      passwordHash: hashPasswordWithSalt("teacher123", salt),
      salt: salt,
      email: "teacher@school.edu",
      fullName: "Default Teacher",
      school: "CyberHeroes School",
      role: "Teacher",
      createdAt: new Date().toISOString()
    }
    fs.writeFileSync(TEACHERS_FILE, JSON.stringify({ teachers: [defaultTeacher] }, null, 2))
  }
}

export function readTeachers(): TeacherRecord[] {
  ensureTeacherStore()
  const raw = fs.readFileSync(TEACHERS_FILE, "utf8")
  const data = JSON.parse(raw || "{\"teachers\":[]}")
  return Array.isArray(data.teachers) ? data.teachers : []
}

export function writeTeachers(teachers: TeacherRecord[]) {
  ensureTeacherStore()
  fs.writeFileSync(TEACHERS_FILE, JSON.stringify({ teachers }, null, 2), "utf8")
}

export function generateSalt(bytes: number = 16): string {
  return crypto.randomBytes(bytes).toString("hex")
}

export function hashPasswordWithSalt(password: string, salt: string): string {
  return crypto.createHash("sha256").update(salt + ":" + password).digest("hex")
}

const TEACHER_SECRET = "teacher-secret-change-me"

export function getTeacherAuthSecret(): string {
  return process.env.TEACHER_AUTH_SECRET || TEACHER_SECRET
}

export function createTeacherSessionToken(username: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url")
  const payload = Buffer.from(JSON.stringify({ sub: username, role: "teacher", iat: Date.now() })).toString("base64url")
  const data = `${header}.${payload}`
  const sig = crypto.createHmac("sha256", getTeacherAuthSecret()).update(data).digest("base64url")
  return `${data}.${sig}`
}

export function verifyTeacherSessionToken(token?: string | null): { valid: boolean; username?: string; role?: string } {
  if (!token) return { valid: false }
  const parts = token.split(".")
  if (parts.length !== 3) return { valid: false }
  const [header, payload, sig] = parts
  const expected = crypto.createHmac("sha256", getTeacherAuthSecret()).update(`${header}.${payload}`).digest("base64url")
  if (expected !== sig) return { valid: false }
  try {
    const obj = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    if (obj.role !== "teacher") return { valid: false }
    return { valid: true, username: obj.sub, role: obj.role }
  } catch {
    return { valid: false }
  }
}

export function createTeacher(username: string, password: string, email: string, fullName: string, school: string): TeacherRecord {
  const salt = generateSalt()
  const passwordHash = hashPasswordWithSalt(password, salt)
  
  const teacher: TeacherRecord = {
    username,
    passwordHash,
    salt,
    email,
    fullName,
    school,
    role: "Teacher",
    createdAt: new Date().toISOString()
  }
  
  const teachers = readTeachers()
  teachers.push(teacher)
  writeTeachers(teachers)
  
  return teacher
}
