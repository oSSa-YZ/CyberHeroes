"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, Eye, EyeOff, School, User, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function TeacherLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/teacher-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.ok) {
        router.push("/progress-dashboard")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <header className="sticky top-0 z-50 w-full border-b bg-blue-600 shadow-md">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <div className="bg-white rounded-full p-2">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-extrabold">CyberHeroes</span>
            <span className="text-xs bg-blue-500 px-2 py-1 rounded-md">Teacher Portal</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border-2 border-blue-200 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <School className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-blue-800">Teacher Login</CardTitle>
            <p className="text-blue-600 mt-2">Access your teacher dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-blue-700 mb-2 block">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-blue-700 mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center text-sm text-blue-600">
                <p className="mb-2">Default teacher account:</p>
                <p className="font-mono text-xs bg-blue-50 p-2 rounded">
                  Username: teacher<br />
                  Password: teacher123
                </p>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-blue-100">
              <div className="text-center">
                <p className="text-sm text-blue-600 mb-2">Need a teacher account?</p>
                <Link
                  href="/teacher-signup"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Contact your administrator
                </Link>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                ← Back to Student Portal
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="w-full border-t py-4 bg-blue-600 text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-base text-white font-medium">© {new Date().getFullYear()} CyberHeroes Teacher Portal</p>
          <div className="flex gap-4">
            <Link className="text-xs sm:text-sm font-medium hover:underline text-white" href="#">
              Help Center
            </Link>
            <Link className="text-xs sm:text-sm font-medium hover:underline text-white" href="#">
              Privacy Policy
            </Link>
            <Link className="text-xs sm:text-sm font-medium hover:underline text-white" href="#">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
