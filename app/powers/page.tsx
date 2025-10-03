"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Lock, Eye, CheckCircle2, XCircle } from "lucide-react"
import { Sticker } from "@/components/sticker"
import { VideoPlayer } from "@/components/video-player"
import { MobileMenu } from "@/components/mobile-menu"
import { AuthButtons } from "@/components/auth-buttons"
import { useSearchParams } from "next/navigation"
import { logProgressOnce } from "@/lib/progress-client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import confetti from "canvas-confetti"

export default function PowersPage() {
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/profile", label: "Profile", icon: "🦸" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  // Modals open state
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeviceModal, setShowDeviceModal] = useState(false)
  const [showScamModal, setShowScamModal] = useState(false)

  // Password power state
  const [passwordInput, setPasswordInput] = useState("")
  const passwordChecks = {
    length: passwordInput.length >= 12,
    uppercase: /[A-Z]/.test(passwordInput),
    number: /[0-9]/.test(passwordInput),
    symbol: /[^A-Za-z0-9]/.test(passwordInput),
    noCommon: !/(password|1234|qwerty|abc|admin)/i.test(passwordInput)
  }
  const passwordScore = Object.values(passwordChecks).filter(Boolean).length * 20
  
  // Trigger confetti when password is complete
  useEffect(() => {
    if (passwordScore === 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [passwordScore])
  
  const generateStrongPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@$%^&*?"
    let out = ""
    for (let i = 0; i < 16; i++) out += chars[Math.floor(Math.random() * chars.length)]
    setPasswordInput(out)
    try { navigator.clipboard.writeText(out) } catch {}
  }

  // Device shield state
  const [didUpdate, setDidUpdate] = useState(false)
  const [didAntivirus, setDidAntivirus] = useState(false)
  const [didPasscode, setDidPasscode] = useState(false)
  const deviceProgress = (Number(didUpdate) + Number(didAntivirus) + Number(didPasscode)) * (100 / 3)
  
  // Trigger confetti when device shield is complete
  useEffect(() => {
    if (deviceProgress === 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [deviceProgress])

  // Scam spotter mini-quiz
  const scamScenarios = [
    { t: "A site shows a lock symbol and the address is exactly 'https://school.edu'", safe: true },
    { t: "A message says you won a mystery prize if you click fast", safe: false },
    { t: "Login link comes from 'support@minecraffthelp.net'", safe: false },
  ]
  const [scamStep, setScamStep] = useState(0)
  const [scamScore, setScamScore] = useState(0)
  const [scamFeedback, setScamFeedback] = useState<null | boolean>(null)
  const searchParams = useSearchParams()
  
  // Trigger confetti when scam spotter is complete
  useEffect(() => {
    if (scamScore === scamScenarios.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [scamScore, scamScenarios.length])

  // Log progress when component mounts
  useEffect(() => {
    logProgressOnce('powers : visited')
  }, [])

  // Open specific modal when coming from Home with query ?open=...
  useEffect(() => {
    const which = searchParams.get("open")
    if (which === "password") setShowPasswordModal(true)
    if (which === "device") setShowDeviceModal(true)
    if (which === "scam") setShowScamModal(true)
  }, [searchParams])

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

          {/* Mobile Menu */}
          <MobileMenu items={navItems} />

          <AuthButtons />

          {/* Desktop Navigation */}
          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                className="text-sm font-bold text-purple-800 hover:scale-110 transition-transform flex flex-col items-center"
                href={item.href}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-purple-400 to-purple-600">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="bg-yellow-300 hover:bg-yellow-400 text-purple-800 rounded-full"
              >
                <Link href="/">
                  <ArrowLeft className="h-6 w-6" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white drop-shadow-md flex items-center gap-2">
                <Sticker emoji="⚡" size="lg" /> Your Cyber Super Powers!
              </h1>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl sm:text-3xl">👉</span>
              <p className="text-base sm:text-xl text-white font-medium">Learn these powers to defeat the bad guys!</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {/* Password Power Card */}
              <div className="bg-white rounded-xl border-8 border-red-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                <div className="bg-red-500 p-4 flex justify-center">
                  <div className="bg-white rounded-full p-4 border-4 border-red-300">
                    <Lock className="h-12 w-12 sm:h-16 sm:w-16 text-red-500" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-center mb-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-purple-800">Password Power</h2>
                    <div className="inline-block bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500">
                      Level 1 Power
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-red-50 p-3 rounded-lg border-2 border-red-200">
                      <span className="text-xl sm:text-2xl">✏️</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Create super strong passwords
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 p-3 rounded-lg border-2 border-red-200">
                      <span className="text-xl sm:text-2xl">🔄</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Use different passwords everywhere
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 p-3 rounded-lg border-2 border-red-200">
                      <span className="text-xl sm:text-2xl">🤐</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Never share your passwords
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-red-100 p-3 flex justify-center">
                  <Button onClick={() => setShowPasswordModal(true)} className="bg-red-500 hover:bg-red-600 text-white font-bold border-2 border-red-600">
                    Master This Power!
                  </Button>
                </div>
              </div>

              {/* Device Shield Card */}
              <div className="bg-white rounded-xl border-8 border-blue-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                <div className="bg-blue-500 p-4 flex justify-center">
                  <div className="bg-white rounded-full p-4 border-4 border-blue-300">
                    <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-blue-500" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-center mb-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-purple-800">Device Shield</h2>
                    <div className="inline-block bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500">
                      Level 1 Power
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
                      <span className="text-xl sm:text-2xl">🔄</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Keep apps and games updated
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
                      <span className="text-xl sm:text-2xl">🛡️</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">Use anti-virus shields</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
                      <span className="text-xl sm:text-2xl">🔒</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Lock your devices with codes
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 flex justify-center">
                  <Button onClick={() => setShowDeviceModal(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold border-2 border-blue-600">
                    Master This Power!
                  </Button>
                </div>
              </div>

              {/* Scam Spotter Card */}
              <div className="bg-white rounded-xl border-8 border-green-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                <div className="bg-green-500 p-4 flex justify-center">
                  <div className="bg-white rounded-full p-4 border-4 border-green-300">
                    <Eye className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-center mb-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-purple-800">Scam Spotter</h2>
                    <div className="inline-block bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500">
                      Level 2 Power
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg border-2 border-green-200">
                      <span className="text-xl sm:text-2xl">🕵️</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Spot fake emails and websites
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg border-2 border-green-200">
                      <span className="text-xl sm:text-2xl">🔍</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Check for the lock symbol
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg border-2 border-green-200">
                      <span className="text-xl sm:text-2xl">🎁</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Be careful of too-good offers
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 p-3 flex justify-center">
                  <Button onClick={() => { setScamStep(0); setScamScore(0); setScamFeedback(null); setShowScamModal(true) }} className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600">
                    Master This Power!
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-white p-4 rounded-xl border-4 border-yellow-400 flex flex-col md:flex-row items-center gap-4">
                <div className="md:w-1/3 w-full">
                  <VideoPlayer
                    title="How to Use Your Cyber Powers"
                    thumbnailSrc="/placeholder.svg?height=200&width=300"
                  />
                </div>
                <div className="md:w-2/3 w-full">
                  <h3 className="text-lg sm:text-xl font-bold text-purple-800 mb-2">Watch: How to Use Your Powers!</h3>
                  <p className="text-sm sm:text-base text-purple-800 mb-4">
                    Learn how to use your cyber powers with this fun video!
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Sticker emoji="🔑" />
                    </div>
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Sticker emoji="🛡️" />
                    </div>
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Sticker emoji="👁️" />
                    </div>
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Sticker emoji="🔍" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Password Power Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-purple-800 font-extrabold">Password Power Trainer</DialogTitle>
            <DialogDescription className="text-purple-700 font-bold">Create a super-strong password and watch your power bar fill up!</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
              <label className="font-bold text-purple-800 mb-2 block">Type or generate a strong password</label>
              <div className="flex gap-2">
                <Input value={passwordInput} onChange={e => setPasswordInput(e.target.value)} placeholder="Type here..." className="border-2 border-purple-300" />
                <Button onClick={generateStrongPassword} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">Generate</Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <span className={`px-2 py-1 rounded border-2 ${passwordChecks.length ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}>12+ chars</span>
                <span className={`px-2 py-1 rounded border-2 ${passwordChecks.uppercase ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}>Uppercase</span>
                <span className={`px-2 py-1 rounded border-2 ${passwordChecks.number ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}>Number</span>
                <span className={`px-2 py-1 rounded border-2 ${passwordChecks.symbol ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}>Symbol</span>
                <span className={`px-2 py-1 rounded border-2 ${passwordChecks.noCommon ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}>Not common</span>
              </div>
              <div className="mt-4">
                <Progress value={passwordScore} />
                <p className="text-sm text-purple-700 font-bold mt-1">Strength: {Math.round(passwordScore/20)}/5</p>
              </div>
            </div>
            <div className="text-right">
              <Button onClick={() => setShowPasswordModal(false)} className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600">I'm Powered Up!</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Device Shield Modal */}
      <Dialog open={showDeviceModal} onOpenChange={setShowDeviceModal}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-purple-800 font-extrabold">Device Shield Checklist</DialogTitle>
            <DialogDescription className="text-purple-700 font-bold">Tick the actions you completed (real life or pretend) to fill your shield.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={didUpdate} onChange={e => setDidUpdate(e.target.checked)} className="h-5 w-5" />
                <span className="font-bold text-purple-800">I updated my apps and games</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={didAntivirus} onChange={e => setDidAntivirus(e.target.checked)} className="h-5 w-5" />
                <span className="font-bold text-purple-800">I turned on anti‑virus or safe browsing</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={didPasscode} onChange={e => setDidPasscode(e.target.checked)} className="h-5 w-5" />
                <span className="font-bold text-purple-800">I set a lock code on my device</span>
              </label>
              <div className="mt-2">
                <Progress value={deviceProgress} />
                <p className="text-sm text-purple-700 font-bold mt-1">Shield charge: {Math.round(deviceProgress)}%</p>
              </div>
            </div>
            <div className="text-right">
              <Button onClick={() => setShowDeviceModal(false)} className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600">Shield Ready!</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Scam Spotter Modal */}
      <Dialog open={showScamModal} onOpenChange={setShowScamModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-purple-800 font-extrabold">Scam Spotter Mini‑Quiz</DialogTitle>
            <DialogDescription className="text-purple-700 font-bold">Safe or Risky? Pick the right answer.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="text-lg font-bold text-purple-800 mb-2">{scamScenarios[scamStep].t}</p>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => { if (scamFeedback !== null) return; const ok = scamScenarios[scamStep].safe; setScamFeedback(ok); if (ok) setScamScore(s=>Math.min(s+1, scamScenarios.length)) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold border-2 border-blue-600">Safe ✅</Button>
                <Button onClick={() => { if (scamFeedback !== null) return; const ok = !scamScenarios[scamStep].safe; setScamFeedback(ok); if (ok) setScamScore(s=>Math.min(s+1, scamScenarios.length)) }} className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-extrabold border-2 border-yellow-600">Risky ⚠️</Button>
              </div>
              {scamFeedback !== null && (
                <div className={`mt-4 p-3 rounded-lg border-2 ${scamFeedback ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
                  <div className="flex items-center gap-2 font-bold">
                    {scamFeedback ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    <span>{scamFeedback ? 'Great pick!' : 'Not quite — try to think why.'}</span>
                  </div>
                </div>
              )}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-purple-800 font-bold">Score: {Math.min(scamScore, scamScenarios.length)}/{scamScenarios.length}</span>
                <Button onClick={() => { setScamFeedback(null); if (scamStep < scamScenarios.length - 1) setScamStep(s=>s+1); else { setScamStep(0); setShowScamModal(false); } }} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">
                  {scamStep < scamScenarios.length - 1 ? 'Next ➡️' : 'Finish 🎉'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <footer className="w-full border-t py-4 bg-brand-footer text-white border-t-8 border-brand-footer">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-base text-white font-medium">© {new Date().getFullYear()} CyberHeroes</p>
          <div className="flex gap-4">
            <Link className="text-sm font-medium hover:underline text-yellow-300" href="#">
              For Parents
            </Link>
            <Link className="text-sm font-medium hover:underline text-yellow-300" href="#">
              For Teachers
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
