"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import confetti from "canvas-confetti"
import { Shield, ArrowLeft, Trophy, Star, CheckCircle2, XCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sticker } from "@/components/sticker"
import { AuthButtons } from "@/components/auth-buttons"
import { useEffect as useEffectProgress } from "react"
import { logProgressOnce } from "@/lib/progress-client"

interface EmailSegment {
  text: string
  isClue?: boolean
  explanation?: string
}

interface EmailScenario {
  id: string
  tier: 1 | 2 | 3
  isPhishing: boolean
  senderName: string
  senderEmail: string
  subject: string
  body: EmailSegment[]
}

const TIER_2_EMAILS: EmailScenario[] = [
  {
    id: "t2-e1",
    tier: 2,
    isPhishing: true,
    senderName: "PayPal Support",
    senderEmail: "security@paypai.com",
    subject: "Action Required: Unusual sign-in",
    body: [
      { text: "Hi, we noticed something strange. " },
      {
        text: "Please verify your account",
        isClue: true,
        explanation: "Phishing emails ask you to 'verify' accounts to steal details."
      },
      { text: " by clicking this secure link: " },
      {
        text: "bit.ly/secure-login",
        isClue: true,
        explanation: "Short links can hide the real website."
      },
      { text: ". " },
      {
        text: "Do it within 12 hours",
        isClue: true,
        explanation: "Urgent deadlines are a classic trick."
      },
      { text: "." }
    ]
  },
  {
    id: "t2-e2",
    tier: 2,
    isPhishing: false,
    senderName: "School Newsletter",
    senderEmail: "newsletter@school.edu",
    subject: "This Week's News",
    body: [
      { text: "Hello families! " },
      { text: "Here are the fun events happening this week at school. " },
      { text: "See you soon!" }
    ]
  },
  {
    id: "t2-e3",
    tier: 2,
    isPhishing: true,
    senderName: "ShipFast Updates",
    senderEmail: "shipping@shipfast.co",
    subject: "Delivery attempt failed",
    body: [
      { text: "We couldn't deliver your package. " },
      {
        text: "Update payment details",
        isClue: true,
        explanation: "Real shippers don't ask for payment in random emails."
      },
      { text: " and " },
      {
        text: "visit your account here",
        isClue: true,
        explanation: "Links in emails can lead to fake websites."
      },
      { text: ": " },
      {
        text: "shipfast-support.help",
        isClue: true,
        explanation: "The website name looks odd for a shipping company."
      }
    ]
  },
  {
    id: "t2-e4",
    tier: 2,
    isPhishing: true,
    senderName: "Game Boost Team",
    senderEmail: "mods@gameboost.win",
    subject: "Get faster coins with this verified extension!",
    body: [
      { text: "Hey player! " },
      {
        text: "Install this verified browser extension",
        isClue: true,
        explanation: "No real game asks you to install random extensions."
      },
      { text: " from " },
      {
        text: "fastcoins.win",
        isClue: true,
        explanation: "The site name looks untrustworthy."
      },
      { text: " for a " },
      {
        text: "limited-time",
        isClue: true,
        explanation: "Time pressure is a trick to rush you."
      }
    ]
  },
  {
    id: "t2-e5",
    tier: 2,
    isPhishing: true,
    senderName: "Social Media Security",
    senderEmail: "form@sm-media-secure.ru",
    subject: "We noticed a login from a new device",
    body: [
      { text: "We saw a new login. " },
      {
        text: "Reset your password here",
        isClue: true,
        explanation: "Never reset passwords through links in emails."
      },
      { text: ": " },
      {
        text: "sm-media-secure.ru/reset",
        isClue: true,
        explanation: "The web address doesn't match the real site."
      },
      { text: ". If you don't, " },
      {
        text: "we will disable your account",
        isClue: true,
        explanation: "Threats are a big red flag."
      }
    ]
  }
]

export default function PhishingDetectiveTier2Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<null | { correct: boolean; message: string }>(null)
  const [showCertificate, setShowCertificate] = useState(false)
  const [stars, setStars] = useState<number[]>(() => Array(TIER_2_EMAILS.length).fill(0))
  const [showTutorial, setShowTutorial] = useState(true)
  const [foundMap, setFoundMap] = useState<Record<string, boolean[]>>(() => {
    const initial: Record<string, boolean[]> = {}
    for (const e of TIER_2_EMAILS) {
      const activeClueIndices = e.body
        .map((b, idx) => (b.isClue ? idx : -1))
        .filter((i) => i !== -1)
        .slice(0, 3)
      initial[e.id] = Array(activeClueIndices.length).fill(false)
    }
    return initial
  })

  const emails = TIER_2_EMAILS
  const total = emails.length
  const current = emails[currentIndex]
  const progress = useMemo(() => Math.round(((currentIndex) / total) * 100), [currentIndex, total])

  const activeClueIndices = current.body
    .map((b, idx) => (b.isClue ? idx : -1))
    .filter((i) => i !== -1)
    .slice(0, 3)
  const totalClues = activeClueIndices.length
  const foundForCurrent = foundMap[current.id] || []
  const foundCount = foundForCurrent.filter(Boolean).length

  const handleClueClick = (segment: EmailSegment, segIndex: number) => {
    if (selected && selected.correct) return
    if (segIndex === -1) return

    if (!foundForCurrent[segIndex]) {
      const next = { ...foundMap, [current.id]: [...foundForCurrent] }
      next[current.id][segIndex] = true
      setFoundMap(next)

      const audio = new Audio("/success-chime.mp3")
      audio.play().catch(() => {})

      const newlyFound = (foundCount + 1)
      setStars((arr) => {
        const copy = [...arr]
        copy[currentIndex] = Math.min(newlyFound, totalClues)
        return copy
      })

      if (newlyFound === totalClues) {
        setSelected({ correct: true, message: "Great job! You found all the clues." })
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
      } else {
        setSelected(null)
      }
    }
  }

  const handleLooksSafe = () => {
    if (selected) return
    if (!current.isPhishing) {
      setSelected({ correct: true, message: "Nice work! This message looks normal and doesn’t ask for secret info." })
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } })
      const audio = new Audio("/success-chime.mp3")
      audio.play().catch(() => {})
      setStars((arr) => {
        const copy = [...arr]
        copy[currentIndex] = 3
        return copy
      })
      setScore((s) => s + 3)
    } else {
      setSelected({ correct: false, message: "This one is tricky! There are clues that it’s fake. Try spotting them." })
    }
  }

  const handleNextFromFoundAll = () => {
    if (allFound) {
      setScore((s) => s + totalClues)
      handleNext()
    }
  }

  const handleNextFromFoundSome = () => {
    const gained = Math.min(3, stars[currentIndex] || 0)
    if (gained > 0) {
      setScore((s) => s + gained)
      handleNext()
    }
  }

  const handleNext = () => {
    const nextIndex = currentIndex + 1
    if (nextIndex < total) {
      setCurrentIndex(nextIndex)
      setSelected(null)
      setStars((arr) => {
        const copy = [...arr]
        copy[currentIndex] = Math.min(copy[currentIndex] || 0, 3)
        return copy
      })
    } else {
      setShowCertificate(true)
    }
  }

  const allFound = totalClues > 0 && foundCount === totalClues

  useEffectProgress(() => {
    logProgressOnce('phishing-detective : visited', { game: 'Phishing Detective - Tier 2' })
  }, [])

  const renderStars = () => {
    const filled = Math.min(3, stars[currentIndex] || 0)
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: filled }).map((_, i) => (
          <span key={`f-${i}`} className="text-yellow-300 text-2xl">★</span>
        ))}
        {Array.from({ length: Math.max(0, 3 - filled) }).map((_, i) => (
          <span key={`e-${i}`} className="text-yellow-200 text-2xl">☆</span>
        ))}
      </div>
    )
  }

  if (showCertificate) {
    return (
      <div className="flex min-h-screen flex-col bg-brand-gradient">
        <header className="sticky top-0 z-50 w-full border-b bg-brand-header shadow-md">
          <div className="container flex h-16 items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-purple-800">
              <div className="bg-purple-600 rounded-full p-2">
                <Shield className="h-6 w-6 text-yellow-300" />
              </div>
              <span className="font-extrabold">CyberHeroes</span>
            </Link>
          </div>
        </header>
        <main className="flex-1">
          <section className="w-full py-10 min-h-[calc(100vh-8rem)]">
            <div className="container px-4 md:px-6">
              <div className="bg-white border-8 border-purple-500 rounded-2xl shadow-xl p-6 md:p-10 text-center">
                <div className="flex justify-center mb-4">
                  <Sticker emoji="🏆" size="lg" />
                </div>
                <div className="relative">
                  <div className="absolute top-6 left-6 bg-yellow-400 text-purple-800 font-bold px-4 py-2 rounded-full border-2 border-yellow-500 rotate-12 animate-bounce z-10">
                    Excellent!
                  </div>
                  <div className="absolute bottom-6 right-6 bg-pink-400 text-white font-bold px-4 py-2 rounded-full border-2 border-pink-500 -rotate-12 animate-bounce z-10">
                    Expert!
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold text-purple-800 mb-2">Phishing Detective Certificate</h1>
                <p className="text-purple-800 font-medium mb-4">Tier 2 Complete!</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  <span className="text-xl font-extrabold text-purple-800">Stars: {score} / {total * 3}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Badge className="bg-yellow-300 text-purple-800 font-bold border-2 border-yellow-500">Intermediate</Badge>
                  <Badge className="bg-blue-100 text-blue-800 font-bold">Phishy Phil Buster</Badge>
                </div>
                <div className="grid gap-3 max-w-xl mx-auto text-left mb-6">
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md border-2 border-green-200">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-purple-800 font-bold">Spot short links and odd website names.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md border-2 border-green-200">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-purple-800 font-bold">Don’t install extensions or apps from emails.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md border-2 border-green-200">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-purple-800 font-bold">Go to the app or site yourself to check messages.</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600">
                    <Link href="/games/phishing-detective/tier-2">Replay Tier</Link>
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

  const emailBodyClasses = `mt-3 p-4 rounded-lg border-2 border-purple-200 bg-purple-50 leading-7 text-purple-900 ${
    allFound ? 'mb-0' : ''
  }`

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
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-brand-gradient min-h-[calc(100vh-8rem)]">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="icon" asChild className="bg-yellow-300 hover:bg-yellow-400 text-purple-800 rounded-full">
                <Link href="/games">
                  <ArrowLeft className="h-6 w-6" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white drop-shadow-md">
                Phishing Detective – Tier 2 🕵️
              </h1>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-yellow-300 text-purple-800 font-bold border-2 border-yellow-500">Intermediate</Badge>
              <Badge className="bg-blue-100 text-blue-800 font-bold">Up to 3 stars per email</Badge>
              <div className="flex items-center gap-2 ml-auto text-white font-bold">
                <Star className="h-5 w-5 text-yellow-300" /> Stars: {score}
              </div>
            </div>

            {/* How to Play Box */}
            {showTutorial && (
              <div className="bg-white/90 border-4 border-blue-500 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-6 w-6 text-blue-700 mt-0.5" />
                  <div className="text-blue-800">
                    <h3 className="font-extrabold">How to play</h3>
                    <p className="font-medium text-sm">
                      Look for suspicious words in emails and click on them to reveal clues. If the email looks safe, press "Looks Safe". 
                      <b> Find all clues to get 3 stars! ⭐</b>
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button onClick={() => setShowTutorial(false)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">Got it!</Button>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <Progress value={progress} />
              <p className="text-white font-bold mt-1">Email {currentIndex + 1} of {total}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <Card className="bg-white border-8 border-blue-500 rounded-xl shadow-xl overflow-hidden">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-purple-800 font-extrabold text-xl">Email Inspection</CardTitle>
                  <CardDescription className="text-purple-700 font-bold">Tap clues to see if it’s phishing. If it looks safe, press “Looks Safe”.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-purple-800">From:</span>
                      <span className="font-bold text-purple-700">{current.senderName} &lt;{current.senderEmail}&gt;</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-purple-800">Subject:</span>
                      <span className="font-bold text-purple-700">{current.subject}</span>
                    </div>
                  </div>

                  <div className={emailBodyClasses + ' email-body-unclip'}>
                    <style jsx>{`
                      .email-body-unclip { overflow: visible !important; position: relative; z-index: 0; }

                      /* Ensure tooltip sits above surrounding borders */
                      .suspicious-keyword { z-index: 100; }

                      .suspicious-keyword[data-tooltip]::after,
                      .suspicious-keyword[data-tooltip]::before { opacity: 0; pointer-events: none; }

                      .suspicious-keyword[data-tooltip]::after {
                        content: attr(data-tooltip);
                        position: absolute;
                        left: 0;
                        top: auto;
                        bottom: 100%;
                        transform: translateY(-6px);
                        z-index: 9999;
                        white-space: normal;
                        max-width: min(80vw, 520px);
                        width: clamp(200px, 36vw, 320px);
                        text-align: center;
                        background: #fff8dc;
                        color: #4c1d95;
                        border: 2px solid #facc15;
                        border-radius: 8px;
                        box-shadow: 0 8px 16px rgba(0,0,0,0.15);
                        padding: 8px 10px;
                        font-weight: 700;
                        font-size: 12px;
                        line-height: 1.3;
                        display: block;
                        box-sizing: border-box;
                        overflow-wrap: break-word;
                        word-break: break-word;
                        transition: opacity .15s ease;
                      }
                      .suspicious-keyword[data-tooltip]::before {
                        content: '';
                        position: absolute;
                        top: auto;
                        bottom: calc(100% + 2px);
                        left: 12px;
                        border-width: 0 8px 8px 8px;
                        border-style: solid;
                        border-color: transparent transparent #facc15 transparent;
                        z-index: 10000;
                        transition: opacity .15s ease;
                      }

                      .suspicious-keyword[data-tooltip]:hover::after,
                      .suspicious-keyword[data-tooltip]:hover::before,
                      .suspicious-keyword[data-tooltip]:focus-visible::after,
                      .suspicious-keyword[data-tooltip]:focus-visible::before {
                        opacity: 1;
                      }
                    `}</style>
                    {current.body.map((seg, i) => {
                      const clueList = activeClueIndices
                      const clueIdx = clueList.indexOf(i)
                      const isClue = clueIdx !== -1
                      const isFound = isClue ? foundForCurrent[clueIdx] : false
                      const className = isClue
                        ? `relative suspicious-keyword px-1 rounded ${isFound ? 'bg-green-200 border-2 border-green-500' : ''}`
                        : ""
                      return isClue ? (
                        <button
                          key={i}
                          type="button"
                          disabled={!!selected && selected.correct}
                          className={className}
                          data-tooltip={seg.explanation || "Phishing clue"}
                          onClick={() => handleClueClick(seg, clueIdx)}
                        >
                          {seg.text}{isFound ? " ✅" : ""}
                        </button>
                      ) : (
                        <span key={i}>{seg.text}</span>
                      )
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center gap-3">
                    {renderStars()}
                    <span className="text-white font-bold">Words found: {foundCount}/{totalClues}</span>
                  </div>
                  <Button
                    onClick={handleLooksSafe}
                    disabled={!!selected}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600"
                  >
                    Looks Safe
                  </Button>
                  {current.isPhishing ? (
                    (allFound || (stars[currentIndex] || 0) > 0) && (
                      <Button onClick={allFound ? handleNextFromFoundAll : handleNextFromFoundSome} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700 animate-bounce">
                        Next Email ✅✨
                      </Button>
                    )
                  ) : (
                    selected?.correct && (
                      <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700 animate-bounce">
                        Next Email ✅✨
                      </Button>
                    )
                  )}
                  {selected && !selected.correct && (
                    <Button onClick={() => setSelected(null)} className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-extrabold border-2 border-yellow-600">
                      Try Again! 🔍
                    </Button>
                  )}
                </CardFooter>
              </Card>

              <div className="space-y-4">
                <Card className="bg-white border-8 border-yellow-400 rounded-xl shadow-xl">
                  <CardHeader className="bg-yellow-100">
                    <CardTitle className="text-purple-800 font-extrabold text-lg">Your Detective Notes</CardTitle>
                    <CardDescription className="text-purple-700 font-bold">Helpful tips for Tier 2</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-4">
                    <div className="flex items-start gap-2 bg-red-50 p-3 rounded-md border-2 border-red-200">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <span className="text-purple-800 font-bold">Be careful with short links and strange website names.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-red-50 p-3 rounded-md border-2 border-red-200">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <span className="text-purple-800 font-bold">Don't install add-ons from emails.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md border-2 border-green-200">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-purple-800 font-bold">Go to the app or site yourself to check.</span>
                    </div>
                  </CardContent>
                </Card>

                {selected && (
                  <Card className={`bg-white border-8 rounded-xl shadow-xl ${selected.correct ? "border-green-500" : "border-yellow-400"}`}>
                    <CardHeader className={selected.correct ? "bg-green-50" : "bg-yellow-50"}>
                      <CardTitle className={`text-purple-800 font-extrabold text-lg flex items-center gap-2 ${selected.correct ? "animate-bounce" : ""}`}>
                        {selected.correct ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            Correct! ✅✨
                          </div>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-yellow-500" />
                            Almost there — Try Again!
                          </>
                        )}
                      </CardTitle>
                      <CardDescription className="text-purple-700 font-bold">{selected.message}</CardDescription>
                    </CardHeader>
                  </Card>
                )}

                <div className="flex justify-center">
                  <Sticker emoji={selected?.correct ? "😄" : "😼"} size="md" />
                </div>
              </div>
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