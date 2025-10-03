import { NextResponse } from "next/server"
import { readUsers } from "@/lib/auth"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const GROUPS_FILE = path.join(DATA_DIR, "groups.json")

interface Group {
  id: string
  name: string
  description: string
  students: string[]
  createdAt: string
  updatedAt: string
}

function ensureGroupsStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(GROUPS_FILE)) {
    fs.writeFileSync(GROUPS_FILE, JSON.stringify({ groups: [] }, null, 2))
  }
}

function readGroups(): Group[] {
  ensureGroupsStore()
  const raw = fs.readFileSync(GROUPS_FILE, "utf8")
  const data = JSON.parse(raw || '{"groups":[]}')
  return Array.isArray(data.groups) ? data.groups : []
}

function writeGroups(groups: Group[]) {
  ensureGroupsStore()
  fs.writeFileSync(GROUPS_FILE, JSON.stringify({ groups }, null, 2), "utf8")
}

export async function GET() {
  try {
    const groups = readGroups()
    const users = readUsers()
    
    // Add student count and creation info to each group
    const groupsWithDetails = groups.map(group => ({
      ...group,
      studentCount: group.students.length,
      students: group.students.map(username => {
        const user = users.find(u => u.username === username)
        return {
          username,
          name: username, // Using username as name for now
          email: `${username}@school.edu`
        }
      })
    }))

    return NextResponse.json({ 
      ok: true, 
      groups: groupsWithDetails,
      totalGroups: groups.length
    })
  } catch (error) {
    console.error('Error fetching groups:', error)
    return NextResponse.json({ 
      ok: false, 
      error: 'Failed to fetch groups' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, students } = body
    
    if (!name) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Group name is required' 
      }, { status: 400 })
    }

    const groups = readGroups()
    const newGroup: Group = {
      id: `group_${Date.now()}`,
      name,
      description: description || '',
      students: students || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    groups.push(newGroup)
    writeGroups(groups)

    return NextResponse.json({ 
      ok: true, 
      group: newGroup
    })
  } catch (error) {
    console.error('Error creating group:', error)
    return NextResponse.json({ 
      ok: false, 
      error: 'Failed to create group' 
    }, { status: 500 })
  }
}
