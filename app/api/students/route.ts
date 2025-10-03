import { NextResponse } from "next/server"
import { readUsers } from "@/lib/auth"
import { readProgressEvents } from "@/lib/progress"

export async function GET() {
  try {
    const users = readUsers()
    const events = readProgressEvents()
    
    // Create a map of user events for quick lookup
    const userEvents = new Map<string, any[]>()
    events.forEach(event => {
      if (!userEvents.has(event.username)) {
        userEvents.set(event.username, [])
      }
      userEvents.get(event.username)!.push(event)
    })

    const students = users.map(user => {
      const userEventList = userEvents.get(user.username) || []
      
      // Calculate progress based on completed events
      const phishingAwareness = userEventList.some(e => e.type === 'phishing-detective:completed')
      const passwordSecurity = userEventList.some(e => e.type === 'password-protector:completed')
      const quizCompleted = userEventList.some(e => e.type === 'quiz:completed')
      const gamesVisited = userEventList.some(e => e.type === 'games:visited')
      const powersVisited = userEventList.some(e => e.type === 'powers:visited')
      
      // Calculate activity counts
      const activitiesVisited = userEventList.filter(e => e.type.includes(':visited')).length
      const gamesCompleted = userEventList.filter(e => e.type.includes(':completed')).length
      const powersVisits = userEventList.filter(e => e.type.startsWith('powers:')).length
      
      // Get last activity
      const lastActivity = userEventList.length > 0 
        ? new Date(Math.max(...userEventList.map(e => new Date(e.createdAt).getTime()))).toISOString()
        : user.createdAt

      // Calculate progress percentages (simplified for now)
      const progress = {
        phishingAwareness: phishingAwareness ? 100 : 0,
        passwordSecurity: passwordSecurity ? 100 : 0,
        onlinePrivacy: quizCompleted ? 100 : 0,
        cyberbullying: gamesVisited ? 70 : 0,
        digitalFootprint: powersVisited ? 60 : 0
      }

      return {
        id: user.username, // Using username as ID for now
        username: user.username,
        name: user.username, // Using username as name for now
        email: `${user.username}@school.edu`, // Generated email
        grade: "5th Grade", // Default grade
        joinDate: user.createdAt,
        progress,
        quizCompleted,
        activities: activitiesVisited,
        games: gamesCompleted,
        powersVisits,
        lastActive: lastActivity
      }
    })

    return NextResponse.json({ 
      ok: true, 
      students,
      totalStudents: students.length
    })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json({ 
      ok: false, 
      error: 'Failed to fetch students' 
    }, { status: 500 })
  }
}
