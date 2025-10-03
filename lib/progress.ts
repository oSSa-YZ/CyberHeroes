import fs from "fs"
import path from "path"

export type ProgressEvent = {
  username: string
  type: string
  payload?: any
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const PROGRESS_FILE = path.join(DATA_DIR, "progress.json")

export function ensureProgressStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(PROGRESS_FILE)) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ events: [] }, null, 2))
  }
}

export function appendProgressEvent(event: Omit<ProgressEvent, "createdAt">) {
  ensureProgressStore()
  const raw = fs.readFileSync(PROGRESS_FILE, "utf8")
  const data = JSON.parse(raw || '{"events":[]}')
  const events: ProgressEvent[] = Array.isArray(data.events) ? data.events : []
  // Server-side dedupe: skip if same user + normalized type logged within last 4 seconds
  const now = Date.now()
  const normalize = (t: string) => String(t).replace(/\s*:\s*/, ':')
  const incomingType = normalize(event.type)
  const last = events.length > 0 ? events[events.length - 1] : null
  if (last && last.username === event.username && normalize(last.type) === incomingType) {
    const lastTs = Date.parse(last.createdAt || '') || 0
    if (now - lastTs < 4000) {
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ events }, null, 2), "utf8")
      return
    }
  }
  events.push({ ...event, createdAt: new Date(now).toISOString() })
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ events }, null, 2), "utf8")
}

export function readProgressEvents(): ProgressEvent[] {
  ensureProgressStore()
  const raw = fs.readFileSync(PROGRESS_FILE, "utf8")
  const data = JSON.parse(raw || '{"events":[]}')
  return Array.isArray(data.events) ? data.events : []
}

export type BadgeId =
  | 'beginner.passwordStarter'
  | 'beginner.phishSpotter'
  | 'beginner.firstLogin'
  | 'advanced.passwordPro'
  | 'advanced.phishDetective'
  | 'advanced.quizChampion'
  | 'hero.tripleThreat'

export type UserBadges = {
  earned: BadgeId[]
  meta: Record<BadgeId, { title: string; description: string }>
}

const BADGE_META: Record<BadgeId, { title: string; description: string }> = {
  'beginner.passwordStarter': { title: 'Password Starter', description: 'Visited Password Protector' },
  'beginner.phishSpotter': { title: 'Phish Spotter', description: 'Visited Phishing Detective' },
  'beginner.firstLogin': { title: 'First Login', description: 'Signed up and started training' },
  'advanced.passwordPro': { title: 'Password Pro', description: 'Completed Password Protector' },
  'advanced.phishDetective': { title: 'Phishing Detective', description: 'Completed Phishing Detective Tier' },
  'advanced.quizChampion': { title: 'Quiz Champion', description: 'Completed Cyber Hero Quiz' },
  'hero.tripleThreat': { title: 'Triple Threat', description: 'Completed Quiz + Password + Phishing' },
}

function normalizeType(t: string): string { return String(t).replace(/\s*:\s*/, ':') }

export function computeUserBadges(username: string): UserBadges {
  const events = readProgressEvents().filter(e => e.username === username)
  const types = new Set(events.map(e => normalizeType(e.type)))
  const earned: BadgeId[] = []

  if (types.has('password-protector:visited')) earned.push('beginner.passwordStarter')
  if (types.has('phishing-detective:visited')) earned.push('beginner.phishSpotter')
  // Consider firstLogin if any event exists
  if (events.length > 0) earned.push('beginner.firstLogin')

  if (types.has('password-protector:completed')) earned.push('advanced.passwordPro')
  if (types.has('phishing-detective:completed')) earned.push('advanced.phishDetective')
  if (types.has('quiz:completed')) earned.push('advanced.quizChampion')

  const triple = ['password-protector:completed','phishing-detective:completed','quiz:completed'].every(t => types.has(t))
  if (triple) earned.push('hero.tripleThreat')

  return { earned, meta: BADGE_META }
}

export function summarizeProgress() {
  const events = readProgressEvents()
  const usernames = Array.from(new Set(events.map(e => e.username)))
  const userToModules: Record<string, { phishingAwareness: boolean; passwordSecurity: boolean; quizCompleted: boolean }> = {}
  for (const u of usernames) {
    userToModules[u] = { phishingAwareness: false, passwordSecurity: false, quizCompleted: false }
  }

  for (const ev of events) {
    if (!usernames.includes(ev.username)) continue
    const t = String(ev.type).replace(/\s*:\s*/, ':')
    if (t === 'phishing-detective:completed') userToModules[ev.username].phishingAwareness = true
    if (t === 'password-protector:completed') userToModules[ev.username].passwordSecurity = true
    if (t === 'quiz:completed') userToModules[ev.username].quizCompleted = true
  }

  const totalUsers = usernames.length || 1
  const phishingCompleted = usernames.filter(u => userToModules[u].phishingAwareness).length
  const passwordCompleted = usernames.filter(u => userToModules[u].passwordSecurity).length
  const quizCompleted = usernames.filter(u => userToModules[u].quizCompleted).length

  // Percentages are share of users that completed that module
  const categories: any = {
    phishingAwareness: Math.round((phishingCompleted / totalUsers) * 100),
    passwordSecurity: Math.round((passwordCompleted / totalUsers) * 100),
    onlinePrivacy: Math.round((quizCompleted / totalUsers) * 100),
    games: 0,
    activities: 0,
    badGuys: 0,
    powers: 0,
    cyberbullying: 0,
    digitalFootprint: 0,
  }

  // Deterministic pseudo-randoms for placeholders based on current student set
  const seedStr = usernames.join("|") || "seed"
  function seededRand(min: number, max: number) {
    let h = 2166136261
    for (let i = 0; i < seedStr.length; i++) {
      h ^= seedStr.charCodeAt(i)
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
    }
    const x = Math.abs(h % 1000) / 1000
    return Math.round(min + (max - min) * x)
  }
  // Compute additional real categories based on events we track today
  const gameCompletion = events.filter(e => String(e.type).replace(/\s*:\s*/, ':').endsWith(':completed')).length
  categories.games = Math.round((gameCompletion / Math.max(1, usernames.length * 2)) * 100)

  const visitsActivities = events.filter(e => String(e.type).replace(/\s*:\s*/, ':').startsWith('activities:')).length
  categories.activities = Math.min(100, Math.round((visitsActivities / Math.max(1, usernames.length * 3)) * 100))

  const visitsBadGuys = events.filter(e => String(e.type).replace(/\s*:\s*/, ':').startsWith('bad-guys:')).length
  categories.badGuys = Math.min(100, Math.round((visitsBadGuys / Math.max(1, usernames.length * 3)) * 100))

  const visitsPowers = events.filter(e => String(e.type).replace(/\s*:\s*/, ':').startsWith('powers:')).length
  categories.powers = Math.min(100, Math.round((visitsPowers / Math.max(1, usernames.length * 3)) * 100))

  // Calculate real progress for cyberbullying and digital footprint
  const cyberbullyingEvents = events.filter(e => String(e.type).replace(/\s*:\s*/, ':').includes('cyberbullying') || String(e.type).replace(/\s*:\s*/, ':').includes('bad-guys'))
  categories.cyberbullying = Math.min(100, Math.round((cyberbullyingEvents.length / Math.max(1, usernames.length * 5)) * 100))
  
  const digitalFootprintEvents = events.filter(e => String(e.type).replace(/\s*:\s*/, ':').includes('digital-footprint'))
  categories.digitalFootprint = Math.min(100, Math.round((digitalFootprintEvents.length / Math.max(1, usernames.length * 5)) * 100))

  const students = usernames.map(u => {
    const userEvents = events.filter(e => e.username === u)
    const userTypes = new Set(userEvents.map(e => String(e.type).replace(/\s*:\s*/, ':')))
    
    const gamesPlayed = Array.from(userTypes).filter(t => t.endsWith(':visited') && (t.startsWith('phishing-detective') || t.startsWith('password-protector') || t.startsWith('digital-footprint'))).length
    const activitiesDone = Array.from(userTypes).filter(t => t.startsWith('activities:')).length
    const powersVisits = Array.from(userTypes).filter(t => t.startsWith('powers:')).length
    const cyberdefenderDone = userTypes.has('digital-footprint:completed')
    
    return {
      username: u,
      phishingAwareness: userToModules[u].phishingAwareness,
      passwordSecurity: userToModules[u].passwordSecurity,
      quizCompleted: userToModules[u].quizCompleted,
      cyberdefenderDone,
      games: gamesPlayed,
      activities: activitiesDone,
      powers: powersVisits,
      totalCompleted: Number(userToModules[u].phishingAwareness) + Number(userToModules[u].passwordSecurity) + Number(userToModules[u].quizCompleted) + Number(cyberdefenderDone)
    }
  })

  const completedModules = phishingCompleted + passwordCompleted + quizCompleted

  // Normalize type spacing for display
  const displayEvents = events.map(e => ({ ...e, type: String(e.type).replace(/\s*:\s*/, ' : ') }))

  return {
    totalUsers: usernames.length,
    totalEvents: events.length,
    completedModules,
    categories,
    students,
    events: displayEvents
  }
}


