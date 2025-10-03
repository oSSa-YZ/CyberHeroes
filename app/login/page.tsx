"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Login failed")
      return
    }
    const next = searchParams.get("next")
    router.push(next || "/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 to-purple-500 p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white border-8 border-purple-600 rounded-xl shadow-xl p-6 space-y-4">
        <h1 className="text-2xl font-extrabold text-purple-800">Login</h1>
        {error && <div className="p-2 text-sm font-bold text-red-700 bg-red-50 border-2 border-red-200 rounded">{error}</div>}
        <label className="block">
          <span className="font-bold text-purple-800">Username</span>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full border-2 border-purple-300 rounded p-2" required />
        </label>
        <label className="block">
          <span className="font-bold text-purple-800">Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border-2 border-purple-300 rounded p-2" required />
        </label>
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700 rounded p-2">Login</button>
        <p className="text-sm text-purple-700">No account? <Link href="/signup" className="font-bold underline">Sign up</Link></p>
      </form>
    </div>
  )
}


