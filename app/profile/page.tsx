"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, ArrowLeft, Upload, X } from "lucide-react"
import { AuthButtons } from "@/components/auth-buttons"
import { logProgressOnce } from "@/lib/progress-client"

export default function ProfilePage() {
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [studentNo, setStudentNo] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Check authentication first
    fetch('/api/auth/session').then(r => r.json()).then(d => {
      if (d.ok && d.username) {
        setIsAuthenticated(true)
        // Track visit only if authenticated
        logProgressOnce('profile : visited')
        // Load profile data
        fetch('/api/profile').then(r => r.json()).then(d => {
          if (d.ok && d.profile) {
            setUsername(d.profile.username || "")
            setFullName(d.profile.fullName || "")
            setAvatarUrl(d.profile.avatarUrl || "")
            setEmail(d.profile.email || "")
            setMobile(d.profile.mobile || "")
            setBirthdate(d.profile.birthdate || "")
            setStudentNo(d.profile.studentNo || "")
            setProfileImage(d.profile.avatarUrl || null)
          }
        }).catch(()=>{})
      } else {
        setIsAuthenticated(false)
      }
    }).catch(() => {
      setIsAuthenticated(false)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setStatus(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/profile/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      
      if (data.ok) {
        setProfileImage(data.url)
        setAvatarUrl(data.url)
        setStatus('Image uploaded!')
      } else {
        setStatus(data.error || 'Upload failed')
      }
    } catch (error) {
      setStatus('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    setAvatarUrl("")
    setStatus('Image removed')
  }

  const save = async () => {
    setStatus(null)
    const res = await fetch('/api/profile', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ fullName, avatarUrl, email, mobile, birthdate, studentNo }) })
    const d = await res.json()
    if (d.ok) {
      setStatus('Saved!')
      try { logProgressOnce('profile : updated', { fullName, avatarUrl, email, mobile, birthdate, studentNo }) } catch {}
    } else {
      setStatus(d.error || 'Failed')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-purple-50">
        <header className="sticky top-0 z-50 w-full border-b bg-brand-header shadow-md">
          <div className="container flex h-16 items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-purple-800">
              <div className="bg-purple-600 rounded-full p-2">
                <Shield className="h-6 w-6 text-yellow-300" />
              </div>
              <span className="font-extrabold">CyberHeroes</span>
            </Link>
            <AuthButtons />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-purple-800 font-bold">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-purple-50">
        <header className="sticky top-0 z-50 w-full border-b bg-brand-header shadow-md">
          <div className="container flex h-16 items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-purple-800">
              <div className="bg-purple-600 rounded-full p-2">
                <Shield className="h-6 w-6 text-yellow-300" />
              </div>
              <span className="font-extrabold">CyberHeroes</span>
            </Link>
            <AuthButtons />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="bg-white border-8 border-purple-500 rounded-xl p-8 shadow-xl">
              <div className="text-6xl mb-4">🔒</div>
              <h1 className="text-2xl font-extrabold text-purple-800 mb-4">Access Required</h1>
              <p className="text-purple-700 mb-6">You need to be logged in to access your profile.</p>
              <div className="flex gap-3 justify-center">
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-purple-800 font-bold border-2 border-yellow-600">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-purple-50">
      <header className="sticky top-0 z-50 w-full border-b bg-brand-header shadow-md">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-purple-800">
            <div className="bg-purple-600 rounded-full p-2">
              <Shield className="h-6 w-6 text-yellow-300" />
            </div>
            <span className="font-extrabold">CyberHeroes</span>
          </Link>
          <AuthButtons />
          {/* Desktop Navigation */}
          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            <Link className="text-sm font-bold text-purple-800 hover:scale-110 transition-transform flex flex-col items-center" href="/">
              <span className="text-xl">🏠</span>
              <span>Home</span>
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:scale-110 transition-transform flex flex-col items-center" href="/games">
              <span className="text-xl">🎯</span>
              <span>Games</span>
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:scale-110 transition-transform flex flex-col items-center" href="/bad-guys">
              <span className="text-xl">😈</span>
              <span>Bad Guys</span>
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:scale-110 transition-transform flex flex-col items-center" href="/powers">
              <span className="text-xl">⚡</span>
              <span>Powers</span>
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:scale-110 transition-transform flex flex-col items-center" href="/quiz">
              <span className="text-xl">🎮</span>
              <span>Quiz</span>
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:scale-110 transition-transform flex flex-col items-center" href="/profile">
              <span className="text-xl">🦸</span>
              <span>Profile</span>
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:scale-110 transition-transform flex flex-col items-center" href="/progress-dashboard">
              <span className="text-xl">👨‍👩‍👧‍👦</span>
              <span>For Teachers</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <section className="flex-1 w-full py-8 md:py-12 bg-brand-gradient">
          <div className="container px-4 md:px-6 max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" asChild className="bg-yellow-300 hover:bg-yellow-400 text-purple-800 rounded-full">
                <Link href="/games">
                  <ArrowLeft className="h-6 w-6" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-2xl font-extrabold tracking-tighter text-white drop-shadow-md">Your Profile</h1>
            </div>
            <Card className="bg-white border-8 border-purple-500 rounded-xl shadow-xl p-0 overflow-hidden">
              <div className="bg-purple-600 text-white font-extrabold px-6 py-3">Personal Details</div>
              <div className="p-6">
                {/* Profile Picture Section */}
                <div className="mb-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <Label className="font-bold text-purple-800 mb-3 block">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {profileImage ? (
                        <div className="relative">
                          <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-20 h-20 rounded-full object-cover border-4 border-purple-300"
                          />
                          <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-purple-200 border-4 border-purple-300 flex items-center justify-center">
                          <span className="text-2xl">👤</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700 flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        {uploading ? 'Uploading...' : 'Upload Image'}
                      </Button>
                      <p className="text-xs text-purple-600 mt-1">Max 5MB, JPG/PNG/GIF</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="font-bold text-purple-800">Username</Label>
                      <Input value={username} readOnly className="border-2 border-purple-300 bg-gray-50" />
                    </div>
                    <div>
                      <Label className="font-bold text-purple-800">Student No</Label>
                      <Input value={studentNo} onChange={e => setStudentNo(e.target.value)} className="border-2 border-purple-300" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-bold text-purple-800">Display name</Label>
                    <Input value={fullName} onChange={e => setFullName(e.target.value)} className="border-2 border-purple-300" />
                  </div>
                  <div>
                    <Label className="font-bold text-purple-800">Birthdate</Label>
                    <Input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} className="border-2 border-purple-300" />
                  </div>
                  <div>
                    <Label className="font-bold text-purple-800">Email</Label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} className="border-2 border-purple-300" />
                  </div>
                  <div>
                    <Label className="font-bold text-purple-800">Mobile</Label>
                    <Input value={mobile} onChange={e => setMobile(e.target.value)} className="border-2 border-purple-300" />
                  </div>
                  <div className="md:col-span-2 flex gap-2 mt-2">
                    <Button onClick={save} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">Save</Button>
                    {status && <span className="font-bold text-white bg-green-600 px-3 py-1 rounded">{status}</span>}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-4 bg-purple-800 text-white border-t-8 border-yellow-400">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-base text-white font-medium">© {new Date().getFullYear()} CyberHeroes</p>
          <div className="flex gap-4">
            <Link className="text-sm font-medium hover:underline text-yellow-300" href="#">For Parents</Link>
            <Link className="text-sm font-medium hover:underline text-yellow-300" href="#">For Teachers</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


