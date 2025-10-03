"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, User, School } from "lucide-react"
import { useRouter } from "next/navigation"

interface TeacherData {
  username: string
  fullName: string
  email: string
  school: string
  role: string
}

export function TeacherAuthButtons() {
  const [teacher, setTeacher] = useState<TeacherData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkTeacherAuth()
  }, [])

  const checkTeacherAuth = async () => {
    try {
      const response = await fetch("/api/teacher-auth/session")
      const data = await response.json()
      
      if (data.ok && data.authenticated) {
        setTeacher({
          username: data.username,
          fullName: data.fullName,
          email: data.email,
          school: data.school,
          role: data.role
        })
      }
    } catch (error) {
      console.error("Error checking teacher auth:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/teacher-auth/logout", { method: "POST" })
      setTeacher(null)
      router.push("/teacher-login")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-200 rounded-full animate-pulse"></div>
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/teacher-login")}
          className="text-white border-white hover:bg-blue-700"
        >
          <School className="h-4 w-4 mr-1" />
          Teacher Login
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:flex items-center text-white text-sm gap-1 ml-3 sm:ml-4">
        <User className="h-4 w-4" />
        <span className="font-medium">{teacher.fullName}</span>
      </div>
      <Button
        size="sm"
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        <LogOut className="h-4 w-4 mr-1" />
        Logout
      </Button>
    </div>
  )
}
