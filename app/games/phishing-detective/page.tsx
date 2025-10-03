"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import confetti from "canvas-confetti"
import { Shield, ArrowLeft, Trophy, Star, CheckCircle2, XCircle, Info } from "lucide-react"
import { useEffect as useEffectProgress } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sticker } from "@/components/sticker"
import { AuthButtons } from "@/components/auth-buttons"
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

const TIER_1_EMAILS: EmailScenario[] = [
  {
    id: "t1-e1",
    tier: 1,
    isPhishing: true,
    senderName: "FortNite Gifts",
    senderEmail: "rewards@forrnite-prizes.com",
    subject: "GET 10,000 FREE V-Bucks NOW!!!",
    body: [
      { text: "Hi Player, " },
      {
        text: "Congratulations!",
        isClue: true,
        explanation: "Exciting words can be used to trick you. Be careful with surprise prizes."
      },
      { text: " You have been chosen to win " },
      {
        text: "10,000 FREE V-Bucks",
        isClue: true,
        explanation: "If it sounds too good to be true, it probably is!"
      },
      { text: ". Please " },
      {
        text: "CLICK HERE",
        isClue: true,
        explanation: "Links in phishing emails try to make you click fast without thinking."
      },
      { text: " and type your username and password to get your prize. " },
      {
        text: "Do it NOW or your prize will be gone!",
        isClue: true,
        explanation: "Scary, urgent language tries to rush you. Real companies don’t act like this."
      }
    ]
  },
  {
    id: "t1-e2",
    tier: 1,
    isPhishing: false,
    senderName: "GameWorld Support",
    senderEmail: "support@gameworld.com",
    subject: "Your password was changed successfully",
    body: [
      { text: "Hello, " },
      { text: "this is a quick note to let you know your password was updated. " },
      { text: "If this wasn’t you, please visit settings in the app and ask a grown-up for help." }
    ]
  },
  {
    id: "t1-e3",
    tier: 1,
    isPhishing: true,
    senderName: "Minecraft Team",
    senderEmail: "security@minecraffthelp.net",
    subject: "Important: Verify your account",
    body: [
      { text: "Dear Builder, " },
      { text: "Your account needs a quick check. " },
      {
        text: "Verify here",
        isClue: true,
        explanation: "Never click unexpected links. Go to the app or website yourself."
      },
      { text: " to keep your worlds safe. " },
      {
        text: "We will lock your account in 24 hours.",
        isClue: true,
        explanation: "Urgent threats are a common phishing trick."
      }
    ]
  },
  {
    id: "t1-e4",
    tier: 1,
    isPhishing: false,
    senderName: "School Library",
    senderEmail: "library@school.edu",
    subject: "Reminder: Book due Friday",
    body: [
      { text: "Hello! " },
      { text: "This is a friendly reminder to return your library book by Friday. " },
      { text: "Have a great day!" }
    ]
  },
  {
    id: "t1-e5",
    tier: 1,
    isPhishing: true,
    senderName: "Phishy Phil",
    senderEmail: "no-reply@freerobux-best.co",
    subject: "Free ROBUX for our favorite players",
    body: [
      { text: "Hey Superstar, " },
      {
        text: "you’re one of the lucky winners!",
        isClue: true,
        explanation: "Random prizes are a common trick to get your attention."
      },
      { text: " To claim, just " },
      {
        text: "enter your password here",
        isClue: true,
        explanation: "No one should ever ask for your password in an email."
      },
      { text: ". " },
      {
        text: "Offer ends today!",
        isClue: true,
        explanation: "Rushing you is a red flag. Take your time and ask a grown-up."
      }
    ]
  }
]

export default function PhishingDetectiveTier1Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<null | { correct: boolean; message: string }>(null)
  const [showCertificate, setShowCertificate] = useState(false)
  const [stars, setStars] = useState<number[]>(() => Array(TIER_1_EMAILS.length).fill(0))
  const [showTutorial, setShowTutorial] = useState(true)
  const [foundMap, setFoundMap] = useState<Record<string, boolean[]>>(() => {
    const initial: Record<string, boolean[]> = {}
    for (const e of TIER_1_EMAILS) {
      const activeClueIndices = e.body
        .map((b, idx) => (b.isClue ? idx : -1))
        .filter((i) => i !== -1)
        .slice(0, 3)
      initial[e.id] = Array(activeClueIndices.length).fill(false)
    }
    return initial
  })

  useEffectProgress(() => {
    logProgressOnce('phishing-detective : visited', { game: 'Phishing Detective - Tier 1' })
  }, [])

  const emails = TIER_1_EMAILS
  const total = emails.length
  const current = emails[currentIndex]
  const progress = useMemo(() => Math.round(((currentIndex) / total) * 100), [currentIndex, total])
  const maxPossibleStars = useMemo(() => {
    return TIER_1_EMAILS.reduce((sum, e) => {
      if (!e.isPhishing) return sum + 3
      const clues = e.body.filter((b) => b.isClue).length
      return sum + Math.min(3, clues)
    }, 0)
  }, [])

  const activeClueIndices = current.body
    .map((b, idx) => (b.isClue ? idx : -1))
    .filter((i) => i !== -1)
    .slice(0, 3)
  const totalClues = activeClueIndices.length
  const foundForCurrent = foundMap[current.id] || []
  const foundCount = foundForCurrent.filter(Boolean).length

  const handleClueClick = (segment: EmailSegment, segIndex: number) => {
    if (selected && selected.correct) return

    // Only allow clicking mapped active clues
    if (segIndex === -1) return

    // Mark found if not already
    if (!foundForCurrent[segIndex]) {
      const next = { ...foundMap, [current.id]: [...foundForCurrent] }
      next[current.id][segIndex] = true
      setFoundMap(next)

      // Per-word: ding only, and permanent highlight (already applied). Do not show success card yet.
      const audio = new Audio("/success-chime.mp3")
      audio.play().catch(() => {})

      // Update stars per found word (1 star per word)
      const newlyFound = (foundCount + 1)
      setStars((arr) => {
        const copy = [...arr]
        copy[currentIndex] = Math.min(newlyFound, totalClues)
        return copy
      })

      // Show success card only when ALL clues are found
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
      // Award once and move on
      setScore((s) => s + 3)
    } else {
      setSelected({ correct: false, message: "This one is tricky! There are clues that it’s fake. Try spotting them." })
    }
  }

  const handleNextFromFoundAll = () => {
    if (allFound) {
      // Award stars equal to the number of suspicious words in this email (max 3)
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
      // Reset stars for this index to cap within 3 for display purposes
      setStars((arr) => {
        const copy = [...arr]
        copy[currentIndex] = Math.min(copy[currentIndex] || 0, 3)
        return copy
      })
    } else {
      setShowCertificate(true)
      try { logProgressOnce('phishing-detective : completed', { score, game: 'Phishing Detective - Tier 1' }) } catch {}
    }
  }

  const allFound = totalClues > 0 && foundCount === totalClues

  const emailBodyClasses = `mt-3 p-4 rounded-lg border-2 border-purple-200 bg-purple-50 leading-7 text-purple-900 ${
    allFound ? 'mb-0' : ''
  }`

  // Render star bar: filled vs empty based on per-email clue count
  const renderStars = () => {
    // Display stars up to 3 total (overall scoring), filled based on words found capped to 3
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
          <section className="w-full py-10 bg-brand-gradient min-h-[calc(100vh-8rem)]">
            <div className="container px-4 md:px-6 max-w-5xl">
              <div className="bg-white border-8 border-purple-500 rounded-2xl shadow-xl p-6 md:p-10 text-center">
                <div className="flex justify-center mb-4">
                  <Sticker emoji="🏆" size="lg" />
                </div>
                <div className="relative">
                  <div className="absolute top-6 left-6 bg-yellow-400 text-purple-800 font-bold px-4 py-2 rounded-full border-2 border-yellow-500 rotate-12 animate-bounce z-10">
                    Great!
                  </div>
                  <div className="absolute bottom-6 right-6 bg-pink-400 text-white font-bold px-4 py-2 rounded-full border-2 border-pink-500 -rotate-12 animate-bounce z-10">
                    Detective!
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold text-purple-800 mb-2">Phishing Detective Certificate</h1>
                <p className="text-purple-800 font-medium mb-4">Tier 1 Complete!</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  <span className="text-xl font-extrabold text-purple-800">Score: {score} / {maxPossibleStars}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Badge className="bg-yellow-300 text-purple-800 font-bold border-2 border-yellow-500">Beginner</Badge>
                  <Badge className="bg-blue-100 text-blue-800 font-bold">Phishy Phil Buster</Badge>
                </div>
                <div className="grid gap-3 max-w-xl mx-auto text-left">
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md border-2 border-green-200">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-purple-800 font-bold">You learned to spot urgent, scary language.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md border-2 border-green-200">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-purple-800 font-bold">You know not to share passwords or click surprise links.</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600">
                    <Link href="/games/phishing-detective">Replay Tier</Link>
                  </Button>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">
                    <Link href="/games">Back to Games</Link>
                  </Button>
                  <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white font-bold border-2 border-blue-600">
                    <Link href="/games/phishing-detective/tier-2">Go to Tier 2</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="w-full border-t py-4 bg-purple-800 text-white border-t-8 border-yellow-400">
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

          {/* Desktop Navigation - match main site */}
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
                Phishing Detective – Tier 1 🕵️
              </h1>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-yellow-300 text-purple-800 font-bold border-2 border-yellow-500">Beginner</Badge>
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
              <Card className="bg-white border-8 border-blue-500 rounded-xl shadow-xl overflow-visible">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-purple-800 font-extrabold text-xl">Email Inspection</CardTitle>
                  <CardDescription className="text-purple-700 font-bold">Tap clues to see if it’s phishing. If it looks safe, press “Looks Safe”.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-4 overflow-visible">
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
                    <CardDescription className="text-purple-700 font-bold">Helpful tips for Tier 1</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-4">
                    <div className="flex items-start gap-2 bg-red-50 p-3 rounded-md border-2 border-red-200">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <span className="text-purple-800 font-bold">Beware of free gifts and scary messages.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-red-50 p-3 rounded-md border-2 border-red-200">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <span className="text-purple-800 font-bold">Never type your password into a link from an email.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md border-2 border-green-200">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-purple-800 font-bold">Ask a grown-up if you’re not sure.</span>
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