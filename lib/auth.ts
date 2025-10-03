import crypto from "crypto"
import fs from "fs"
import path from "path"

export interface StoredUserRecord {
  username: string
  passwordHash: string
  salt: string
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const USERS_FILE = path.join(DATA_DIR, "users.json")

export function ensureUserStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2))
  }
}

export function readUsers(): StoredUserRecord[] {
  ensureUserStore()
  const raw = fs.readFileSync(USERS_FILE, "utf8")
  const data = JSON.parse(raw || "{\"users\":[]}")
  return Array.isArray(data.users) ? data.users : []
}

export function writeUsers(users: StoredUserRecord[]) {
  ensureUserStore()
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2), "utf8")
}

export function generateSalt(bytes: number = 16): string {
  return crypto.randomBytes(bytes).toString("hex")
}

export function hashPasswordWithSalt(password: string, salt: string): string {
  return crypto.createHash("sha256").update(salt + ":" + password).digest("hex")
}

const DEFAULT_SECRET = "dev-secret-change-me"

export function getAuthSecret(): string {
  return process.env.AUTH_SECRET || DEFAULT_SECRET
}

export function createSessionToken(username: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url")
  const payload = Buffer.from(JSON.stringify({ sub: username, iat: Date.now() })).toString("base64url")
  const data = `${header}.${payload}`
  const sig = crypto.createHmac("sha256", getAuthSecret()).update(data).digest("base64url")
  return `${data}.${sig}`
}

export function verifySessionToken(token?: string | null): { valid: boolean; username?: string } {
  if (!token) return { valid: false }
  const parts = token.split(".")
  if (parts.length !== 3) return { valid: false }
  const [header, payload, sig] = parts
  const expected = crypto.createHmac("sha256", getAuthSecret()).update(`${header}.${payload}`).digest("base64url")
  if (expected !== sig) return { valid: false }
  try {
    const obj = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    return { valid: true, username: obj.sub }
  } catch {
    return { valid: false }
  }
}

