import crypto from "crypto"

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

export function getTeacherAuthSecret(): string {
  return process.env.TEACHER_AUTH_SECRET || "teacher-secret-change-me"
}

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  const base64 = btoa(binary)
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

async function hmacSha256(key: CryptoKey, data: string): Promise<string> {
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data))
  return base64UrlEncode(signature)
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  )
}

export async function hashPasswordWithSalt(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest("SHA-256", data)
  // Convert to hex
  const bytes = new Uint8Array(digest)
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function createTeacherSessionToken(username: string): Promise<string> {
  const header = base64UrlEncode(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })))
  const payload = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify({ sub: username, role: "teacher", iat: Date.now() }))
  )
  const data = `${header}.${payload}`
  const key = await importHmacKey(getTeacherAuthSecret())
  const sig = await hmacSha256(key, data)
  return `${data}.${sig}`
}

export async function verifyTeacherSessionToken(
  token?: string | null
): Promise<{ valid: boolean; username?: string; role?: string }> {
  if (!token) return { valid: false }
  const parts = token.split(".")
  if (parts.length !== 3) return { valid: false }
  const [header, payload, sig] = parts
  const key = await importHmacKey(getTeacherAuthSecret())
  const expected = await hmacSha256(key, `${header}.${payload}`)
  if (expected !== sig) return { valid: false }
  try {
    const json = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(payload.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0))))
    if (json.role !== "teacher") return { valid: false }
    return { valid: true, username: json.sub, role: json.role }
  } catch {
    return { valid: false }
  }
}
