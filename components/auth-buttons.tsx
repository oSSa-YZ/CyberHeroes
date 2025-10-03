"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function AuthButtons() {
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetch("/api/auth/session").then(async (r) => {
      const data = await r.json()
      if (mounted) {
        setUsername(data.ok ? data.username : null)
        setLoading(false)
      }
    })
    return () => { mounted = false }
  }, [])

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUsername(null)
  }

  if (loading) return null

  return (
    <div className="ml-4 flex items-center gap-2">
      {username ? (
        <>
          <span className="font-bold text-purple-800 group-[.teacher-header]:text-white">Hi, {username}</span>
          <button onClick={logout} className="px-3 py-1 rounded-md bg-red-500 text-white font-bold border-2 border-red-600 hover:bg-red-600">Logout</button>
        </>
      ) : (
        <>
          <Link href="/login" className="px-3 py-1 rounded-md bg-white text-purple-800 font-bold border-2 border-purple-600 hover:bg-purple-50">Login</Link>
          <Link href="/signup" className="px-3 py-1 rounded-md bg-yellow-300 text-purple-900 font-extrabold border-2 border-yellow-500 hover:bg-yellow-400">Sign Up</Link>
        </>
      )}
    </div>
  )
}


