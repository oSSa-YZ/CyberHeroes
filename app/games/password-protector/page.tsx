"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import confetti from "canvas-confetti"
import { ArrowLeft, CheckCircle2, KeyRound, Shield, Star, Trophy, XCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sticker } from "@/components/sticker"
import { useEffect as useEffectProgress } from "react"
import { logProgressOnce } from "@/lib/progress-client"
import { AuthButtons } from "@/components/auth-buttons"

type StrengthLabel = "Weak" | "Okay" | "Strong"

interface QuizItem {
  id: string
  password: string
  expected: Extract<StrengthLabel, "Weak" | "Strong">
  explanation: string
}

// Scenario stage removed per request

const SAMPLE_PASSWORDS: QuizItem[] = [
  {
    id: "p1",
    password: "password123",
    expected: "Weak",
    explanation: "Common word + simple numbers is easy to guess."
  },
  {
    id: "p2",
    password: "C@t7Moon!",
    expected: "Strong",
    explanation: "Mix of cases, symbol, number, and not a common phrase."
  },
  {
    id: "p3",
    password: "abc12345",
    expected: "Weak",
    explanation: "Simple sequence patterns are weak."
  },
  {
    id: "p4",
    password: "Zebra-Rocket-18",
    expected: "Strong",
    explanation: "Passphrase style with words + number is strong."
  },
  {
    id: "p5",
    password: "mydogname",
    expected: "Weak",
    explanation: "Personal info (pet name) is guessable."
  },
  {
    id: "p6",
    password: "N1nja!Galaxy!",
    expected: "Strong",
    explanation: "Long, mixed characters, not a single common word."
  }
]

// Scenarios removed

const WORD_TILES = ["Zebra", "Rocket", "Puzzle", "Banana", "Galaxy", "River"]
const NUMBER_TILES = ["17", "42", "98", "2025"]
const SYMBOL_TILES = ["!", "@", "#", "$", "*", "-"]

function estimateStrength(password: string): StrengthLabel {
  const lengthScore = password.length >= 12 ? 2 : password.length >= 8 ? 1 : 0
  const lower = /[a-z]/.test(password)
  const upper = /[A-Z]/.test(password)
  const digit = /\d/.test(password)
  const symbol = /[^A-Za-z0-9]/.test(password)
  const varietyScore = [lower, upper, digit, symbol].filter(Boolean).length
  const commonish = /(password|abc|123|qwerty|letmein|admin|dog|cat|name)/i.test(password)
  const sequential = /(0123|1234|2345|abcd|qwer)/i.test(password)
  const penalties = (commonish ? 1 : 0) + (sequential ? 1 : 0)
  const total = lengthScore + varietyScore - penalties
  if (total >= 5) return "Strong"
  if (total >= 3) return "Okay"
  return "Weak"
}

export default function PasswordProtectorPage() {
  useEffectProgress(() => {
    logProgressOnce('password-protector : visited', { game: 'Password Protector' })
  }, [])
  const [stage, setStage] = useState<0 | 1>(0)
  const [score, setScore] = useState(0)
  const [showCertificate, setShowCertificate] = useState(false)
  const [judgeStars, setJudgeStars] = useState(0)
  const [showTutorial, setShowTutorial] = useState(true)

  // Stage 0: Judge passwords
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizFeedback, setQuizFeedback] = useState<null | { correct: boolean; message: string }>(null)

  // Stage 1: Build a strong password
  const [built, setBuilt] = useState<string>("")
  const builtStrength = useMemo(() => estimateStrength(built), [built])
  const isBuiltGoalMet = useMemo(() => built.length >= 12 && builtStrength === "Strong", [built, builtStrength])

  const totalStages = 2
  const progress = useMemo(() => {
    const raw = Math.round(((stage + (showCertificate ? 1 : 0)) / totalStages) * 100)
    return Math.max(0, Math.min(100, raw))
  }, [stage, showCertificate])

  const award = (points: number) => setScore((s) => s + points)

  const handleJudge = (choice: "Weak" | "Strong") => {
    if (quizFeedback) return
    const item = SAMPLE_PASSWORDS[quizIndex]
    if (!item) return
    const correct = (choice === "Weak" && item.expected === "Weak") || (choice === "Strong" && item.expected === "Strong")
    if (correct) {
      setQuizFeedback({ correct: true, message: `Nice! You spotted it. ${item.explanation}` })
      // 1 star per correct answer in Judge stage
      setJudgeStars((s) => s + 1)
      award(1)
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } })
    } else {
      setQuizFeedback({ correct: false, message: item.explanation })
    }
  }

  const nextQuiz = () => {
    const next = quizIndex + 1
    if (next < SAMPLE_PASSWORDS.length) {
      setQuizIndex(next)
      setQuizFeedback(null)
    } else {
      setStage(1)
      setQuizFeedback(null)
    }
  }

  const appendTile = (value: string) => setBuilt((p) => (p + value))
  const clearBuilt = () => setBuilt("")
  const lockInBuilt = () => {
    if (!isBuiltGoalMet) return
    award(6)
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
    setShowCertificate(true)
    try { logProgressOnce('password-protector : completed', { score }) } catch {}
  }

  if (showCertificate) {
    const maxScore = SAMPLE_PASSWORDS.length + 6
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
          <section className="w-full py-10 bg-brand-gradient flex-1">
            <div className="container px-4 md:px-6 max-w-5xl">
              <div className="bg-white border-8 border-green-500 rounded-2xl shadow-xl p-6 md:p-10 text-center">
                <div className="flex justify-center mb-4">
                  <Sticker emoji="🔑" size="lg" />
                </div>
                <div className="relative">
                  <div className="absolute top-6 left-6 bg-yellow-400 text-purple-800 font-bold px-4 py-2 rounded-full border-2 border-yellow-500 rotate-12 animate-bounce z-10">
                    Awesome!
                  </div>
                  <div className="absolute bottom-6 right-6 bg-pink-400 text-white font-bold px-4 py-2 rounded-full border-2 border-pink-500 -rotate-12 animate-bounce z-10">
                    Protector!
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold text-purple-800 mb-2">Password Protector Certificate</h1>
                <p className="text-purple-800 font-medium mb-4">Level 2 Complete!</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  <span className="text-xl font-extrabold text-purple-800">Score: {score} / {maxScore}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Badge className="bg-green-100 text-green-800 font-bold">Level 2</Badge>
                  <Badge className="bg-blue-100 text-blue-800 font-bold">Super Password Builder</Badge>
                </div>
                <div className="grid gap-3 max-w-xl mx-auto text-left">
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md border-2 border-green-200">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-purple-800 font-bold">You can spot weak vs strong passwords.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md border-2 border-green-200">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-purple-800 font-bold">You built a long, mixed, memorable passphrase.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md border-2 border-green-200">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-purple-800 font-bold">You know not to reuse or share passwords.</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={() => {
                      setStage(0)
                      setScore(0)
                      setShowCertificate(false)
                      setJudgeStars(0)
                      setQuizIndex(0)
                      setQuizFeedback(null)
                      setBuilt("")
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600"
                  >
                    Play Again
                  </Button>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">
                    <Link href="/games">Back to Games</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="w-full border-t py-4 bg-brand-footer text-white border-t-8 border-brand-footer">
          <div className="container flex items-center justify-between">
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

  return (
    <div className={`flex min-h-screen flex-col ${stage === 0 ? "bg-brand-gradient" : "bg-purple-50"}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-brand-header shadow-md">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-purple-800">
            <div className="bg-purple-600 rounded-full p-2">
              <Shield className="h-6 w-6 text-yellow-300" />
            </div>
            <span className="font-extrabold">CyberHeroes</span>
          </Link>
          <AuthButtons />
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
        <section className={`w-full py-8 md:py-12 flex-1 ${stage === 0 ? "bg-transparent" : "bg-brand-gradient"}`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Button variant="ghost" size="icon" asChild className="bg-yellow-300 hover:bg-yellow-400 text-purple-800 rounded-full">
                <Link href="/games">
                  <ArrowLeft className="h-6 w-6" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white drop-shadow-md">
                Password Protector – Level 2 🔑
              </h1>
              <div className="flex items-center gap-4 ml-auto text-white font-bold" aria-live="polite">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-300" aria-hidden="true" /> {score}
                </div>
              </div>
            </div>

            {/* How to Play Box */}
            {showTutorial && (
              <div className="bg-white/90 border-4 border-green-500 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-6 w-6 text-green-700 mt-0.5" />
                  <div className="text-green-800">
                    <h3 className="font-extrabold">How to play</h3>
                    <p className="font-medium text-sm">
                      First, judge if passwords are weak or strong. Then build your own strong password using words, numbers, and symbols. 
                      <b> Get 12+ characters with mixed characters to win! 🔑</b>
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button onClick={() => setShowTutorial(false)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">Got it!</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile step chips */}
            <div className="grid grid-cols-2 gap-2 mb-4 lg:hidden">
              {["Judge", "Build"].map((label, i) => (
                <div key={label} className={`text-center text-xs font-extrabold px-2 py-2 rounded-lg border-2 ${i === stage ? "bg-white text-emerald-700 border-emerald-600" : "bg-emerald-200 text-emerald-900 border-emerald-300"}`}>
                  {i + 1}. {label}
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[220px_1fr_260px]">
              {/* Left stepper */}
              <aside className="hidden lg:block">
                <div className="sticky top-20 bg-white/70 backdrop-blur border-4 border-emerald-500 rounded-xl p-4 shadow-xl">
                  <h3 className="text-emerald-800 font-extrabold mb-3">Stages</h3>
                  <ol className="space-y-3">
                    {["Judge Passwords", "Build One"].map((label, i) => {
                      const active = i === stage
                      const done = i < stage
                      return (
                        <li key={label} className={`flex items-center gap-3 p-2 rounded-lg border-2 ${active ? "bg-emerald-50 border-emerald-400" : done ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"}`}>
                          <span className={`h-7 w-7 flex items-center justify-center rounded-full border-2 text-xs font-extrabold ${active ? "bg-emerald-500 text-white border-emerald-600" : done ? "bg-green-500 text-white border-green-600" : "bg-white text-emerald-700 border-emerald-300"}`}>{done ? "✓" : i + 1}</span>
                          <span className={`font-bold ${active ? "text-emerald-800" : "text-purple-800"}`}>{label}</span>
                        </li>
                      )
                    })}
                  </ol>
                  <div className="mt-4">
                    <Progress value={progress} />
                    <p className="text-xs text-emerald-900 font-bold mt-1">Stage {stage + 1} of 2</p>
                  </div>
                </div>
              </aside>

              {/* Center panel - stage specific */}
              <div>
                {stage === 0 && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border-8 border-yellow-400 overflow-hidden shadow-2xl">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6">
                        <div className="mx-auto max-w-xl text-center">
                          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 border border-white/40">
                            <KeyRound className="h-5 w-5 text-yellow-300" />
                            {/* Highlight strong-making characters when correct */}
                            <span className="text-xl font-mono font-extrabold text-white select-all">
                              {(() => {
                                const current = SAMPLE_PASSWORDS[quizIndex]?.password || ""
                                const parts = current.split("")
                                return parts.map((ch, idx) => {
                                  const isStrongChar = /[^A-Za-z]/.test(ch) || (idx > 0 && ch !== ch.toLowerCase() && ch !== ch.toUpperCase())
                                  const shouldHighlight = quizFeedback?.correct && isStrongChar
                                  return (
                                    <span key={idx} className={shouldHighlight ? "bg-green-300/70 text-white px-0.5 rounded" : ""}>{ch}</span>
                                  )
                                })
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 grid gap-3 sm:grid-cols-2">
                        <Button onClick={() => handleJudge("Weak")} disabled={!!quizFeedback} className="h-16 text-lg bg-white hover:bg-gray-50 text-red-600 font-extrabold border-2 border-gray-300" aria-label="Mark password as weak">🚫 Deny</Button>
                        <Button onClick={() => handleJudge("Strong")} disabled={!!quizFeedback} className="h-16 text-lg bg-white hover:bg-gray-50 text-yellow-600 font-extrabold border-2 border-gray-300" aria-label="Mark password as strong">💪 Approve</Button>
                      </div>
                    </div>

                    {quizFeedback && (
                      <div className={`p-4 rounded-xl border-4 bg-white ${quizFeedback.correct ? "border-green-300" : "border-yellow-300"}`}>
                        <div className="flex items-center gap-2 text-purple-800 font-bold">
                          {quizFeedback.correct ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-yellow-500" />}
                          <span>{quizFeedback.message}</span>
                        </div>
                        <div className="mt-3 flex flex-col sm:flex-row gap-2">
                          {quizFeedback.correct ? (
                            <Button onClick={nextQuiz} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700 animate-bounce w-full sm:w-auto" aria-label="Next password">Next Password ✅✨</Button>
                          ) : (
                            <>
                              <Button onClick={() => setQuizFeedback(null)} className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-extrabold border-2 border-yellow-600 w-full sm:w-auto" aria-label="Try again">Try Again</Button>
                              <Button onClick={nextQuiz} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700 w-full sm:w-auto" aria-label="Next password">Next Password</Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {stage === 1 && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border-8 border-purple-600 overflow-hidden shadow-2xl bg-white">
                      <div className="bg-white p-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-sm font-bold text-purple-800">Your password:</span>
                          <span className="px-3 py-2 rounded-md bg-emerald-50 border-2 border-emerald-200 font-extrabold text-emerald-900 break-all">{built || "(empty)"}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-sm font-bold text-purple-800">Strength:</span>
                          <Badge className={`${builtStrength === "Strong" ? "bg-green-500 text-white" : builtStrength === "Okay" ? "bg-yellow-400 text-purple-900" : "bg-red-500 text-white"}`}>{builtStrength}</Badge>
                          <span className="text-sm font-bold text-purple-900">Length: {built.length}</span>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <div className="text-xs font-bold text-emerald-800 mb-2">Words</div>
                            <div className="flex flex-wrap gap-2">
                              {WORD_TILES.map((w) => (
                                <Button key={w} onClick={() => appendTile(w)} className="bg-purple-200 hover:bg-purple-300 text-purple-900 font-extrabold border-2 border-purple-400">{w}</Button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-emerald-800 mb-2">Numbers</div>
                            <div className="flex flex-wrap gap-2">
                              {NUMBER_TILES.map((n) => (
                                <Button key={n} onClick={() => appendTile(n)} className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-extrabold border-2 border-blue-400">{n}</Button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-emerald-800 mb-2">Symbols</div>
                            <div className="flex flex-wrap gap-2">
                              {SYMBOL_TILES.map((s) => (
                                <Button key={s} onClick={() => appendTile(s)} className="bg-green-200 hover:bg-green-300 text-green-900 font-extrabold border-2 border-green-400">{s}</Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 flex flex-col sm:flex-row gap-3">
                        <Button onClick={clearBuilt} className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-extrabold border-2 border-yellow-600" aria-label="Clear password">Clear</Button>
                        <Button onClick={lockInBuilt} disabled={!isBuiltGoalMet} className={`font-bold border-2 ${isBuiltGoalMet ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-700 animate-bounce" : "bg-purple-200 text-purple-700 border-purple-300"}`} aria-disabled={!isBuiltGoalMet} aria-label="Lock in password">Lock It In ✅</Button>
                      </div>
                    </div>
                  </div>
                )}

                {stage === 2 && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border-8 border-emerald-500 overflow-hidden shadow-2xl">
                      <div className="bg-white p-6">
                        <div className="p-4 rounded-lg border-2 border-emerald-200 bg-emerald-50">
                          <p className="text-purple-900 font-extrabold">{SCENARIOS[scenarioIndex].prompt}</p>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          {SCENARIOS[scenarioIndex].choices.map((c) => (
                            <button key={c.id} onClick={() => chooseScenario(c.id)} disabled={!!scenarioFeedback} className="text-left rounded-xl border-2 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 p-4 font-bold text-purple-900">
                              <span className="mr-2 bg-emerald-200 text-emerald-900 font-extrabold rounded-full px-2 inline-block">{c.id.toUpperCase()}</span>
                              {c.text}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white p-4">
                        {scenarioFeedback && (
                          <div className={`p-3 rounded-md border-2 ${scenarioFeedback.correct ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
                            <div className="flex items-center gap-2 text-purple-800 font-bold">
                              {scenarioFeedback.correct ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              ) : (
                                <XCircle className="h-5 w-5 text-yellow-500" />
                              )}
                              <span>{scenarioFeedback.message}</span>
                            </div>
                          </div>
                        )}
                        {scenarioFeedback && (
                          <div className="mt-3">
                            <Button onClick={nextScenario} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700 animate-bounce w-full sm:w-auto" aria-label="Next scenario">Next Scenario ✅✨</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right scoreboard / tips */}
              <aside className="hidden lg:block">
                <div className="sticky top-20 space-y-4">
                  <div className="bg-white/80 backdrop-blur border-4 border-emerald-500 rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Sticker emoji="🔑" size="sm" />
                      <h3 className="text-emerald-800 font-extrabold">Level 2</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-800 font-bold">Score</span>
                      <span className="text-2xl font-extrabold text-emerald-700">{score}</span>
                    </div>
                    <div className="mt-3">
                      <Progress value={progress} />
                      <p className="text-xs text-emerald-900 font-bold mt-1">Progress</p>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur border-4 border-yellow-400 rounded-xl p-4 shadow-xl">
                    <h4 className="text-purple-800 font-extrabold mb-2">Quick Tips</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="bg-green-50 border-2 border-green-200 p-2 rounded-md font-bold text-purple-800">Use 12+ characters</li>
                      <li className="bg-green-50 border-2 border-green-200 p-2 rounded-md font-bold text-purple-800">Mix UPPER/lower, 123, and symbols</li>
                      <li className="bg-red-50 border-2 border-red-200 p-2 rounded-md font-bold text-purple-800">Don’t reuse or share</li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-4 bg-brand-footer text-white border-t-8 border-brand-footer">
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


