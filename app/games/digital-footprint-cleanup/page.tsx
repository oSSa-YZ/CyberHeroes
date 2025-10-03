"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Shield, ArrowLeft, Info, Trophy, CheckCircle2, XCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AuthButtons } from "@/components/auth-buttons"
import { Sticker } from "@/components/sticker"
import { MobileMenu } from "@/components/mobile-menu"
import { logProgressOnce } from "@/lib/progress-client"
import confetti from "canvas-confetti"

type ZoneId = "keep" | "private" | "delete" | "report"

interface GameItem {
  id: string
  text: string
  tooltip: string
  suggested: ZoneId
  emoji: string
}

const ALL_ITEMS: GameItem[] = [
  {
    id: "item-home-photo",
    text: "Photo of you at your home with house number visible",
    tooltip: "Reveals your address/location.",
    suggested: "private",
    emoji: "🏠"
  },
  {
    id: "item-phone-public",
    text: "Post sharing your phone number publicly",
    tooltip: "Sharing phone numbers publicly invites harassment/scams.",
    suggested: "delete",
    emoji: "📱"
  },
  {
    id: "item-mean-comment",
    text: "Mean comment from a classmate",
    tooltip: "Cyberbullying should be reported and documented.",
    suggested: "report",
    emoji: "😡"
  },
  {
    id: "item-suspicious-link",
    text: "Suspicious link claiming 'Free iPhone - Click Here!'",
    tooltip: "Likely phishing/scam. Report it to the platform.",
    suggested: "report",
    emoji: "📎"
  },
  {
    id: "item-fun-photo",
    text: "Fun vacation photo with friends (no personal info)",
    tooltip: "Harmless, no sensitive data visible.",
    suggested: "keep",
    emoji: "🏖️"
  },
  {
    id: "item-university",
    text: "Post about getting into university",
    tooltip: "Positive milestone. Fine to keep public if comfortable.",
    suggested: "keep",
    emoji: "🎓"
  },
  {
    id: "item-bank-screenshot",
    text: "Screenshot of your bank account balance",
    tooltip: "Extremely sensitive. Remove immediately.",
    suggested: "delete",
    emoji: "🏦"
  },
  {
    id: "item-fake-news",
    text: "Link to fake news article",
    tooltip: "Misinformation should be reported.",
    suggested: "report",
    emoji: "📰"
  },
  {
    id: "item-location-post",
    text: "Post with your live location at a cafe",
    tooltip: "Live location risks safety. Keep private.",
    suggested: "private",
    emoji: "📍"
  }
]

const ZONES: { id: ZoneId; label: string; color: string; description: string; emoji: string }[] = [
  { id: "keep", label: "Keep Public", color: "bg-green-500", description: "Safe to share", emoji: "🌍" },
  { id: "private", label: "Make Private", color: "bg-yellow-500", description: "Limit to friends", emoji: "🔐" },
  { id: "delete", label: "Delete", color: "bg-red-500", description: "Remove sensitive info", emoji: "🗑️" },
  { id: "report", label: "Report", color: "bg-blue-500", description: "Report abuse/scams", emoji: "🚩" }
]

export default function DigitalFootprintCleanupPage() {
  const [items, setItems] = useState<GameItem[]>(() => shuffle(ALL_ITEMS))
  const [placed, setPlaced] = useState<Record<string, ZoneId | null>>({})
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [hoverZone, setHoverZone] = useState<ZoneId | null>(null)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackOk, setFeedbackOk] = useState<boolean | null>(null)
  const [showTutorial, setShowTutorial] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const justDroppedRef = useRef<string | null>(null)
  const dragCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const dragPreviewRef = useRef<HTMLDivElement | null>(null)

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/profile", label: "Profile", icon: "🦸" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  useEffect(() => {
    // Initialize placed map
    const m: Record<string, ZoneId | null> = {}
    for (const it of items) m[it.id] = null
    setPlaced(m)
    // Reset completion guard when items list resets (e.g., replay)
    hasFinishedRef.current = false
  }, [items])

  useEffect(() => {
    try { logProgressOnce('digital-footprint : visited', { game: 'Digital Footprint Cleanup' }) } catch {}
  }, [])

  const completedCount = useMemo(() => Object.values(placed).filter((v) => v !== null).length, [placed])
  const progress = useMemo(() => Math.round((completedCount / items.length) * 100), [completedCount, items.length])
  const stars = useMemo(() => items.filter((it) => placed[it.id] === it.suggested).length, [items, placed])
  const remainingCount = useMemo(() => items.filter((it) => placed[it.id] == null).length, [items, placed])
  const hasFinishedRef = useRef(false)

  useEffect(() => {
    if (!hasFinishedRef.current && items.length > 0 && remainingCount === 0) {
      hasFinishedRef.current = true
      const allCorrect = items.every((it) => placed[it.id] === it.suggested)
      if (allCorrect) setScore((s) => s + 10)
      try { logProgressOnce('digital-footprint : completed', { stars, score, total: items.length, game: 'Digital Footprint Cleanup' }) } catch {}
      setShowResult(true)
    }
  }, [remainingCount, items, placed])

  const onDragStart = (e: React.DragEvent<HTMLButtonElement>, id: string) => {
    setDraggingId(id)
    justDroppedRef.current = null
    e.dataTransfer.setData("text/plain", id)
    e.dataTransfer.effectAllowed = "move"
    const item = items.find((x) => x.id === id)
    // Canvas-based drag image for consistent rendering across browsers
    const canvas = renderDragCanvas(item?.emoji || '', item?.text || '')
    e.dataTransfer.setDragImage(canvas, 20, 20)
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, zone: ZoneId) => {
    e.preventDefault()
    setHoverZone(zone)
  }

  const onDragLeave = () => setHoverZone(null)

  const onDrop = (e: React.DragEvent<HTMLDivElement>, zone: ZoneId) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    if (!id) return
    setHoverZone(null)
    setDraggingId(null)
    handlePlacement(id, zone)
  }

  const onDragEnd = () => {
    setDraggingId(null)
    if (dragPreviewRef.current && dragPreviewRef.current.parentNode) {
      try { dragPreviewRef.current.parentNode.removeChild(dragPreviewRef.current) } catch {}
      dragPreviewRef.current = null
    }
    if (dragCanvasRef.current && dragCanvasRef.current.parentNode) {
      try { dragCanvasRef.current.parentNode.removeChild(dragCanvasRef.current) } catch {}
      dragCanvasRef.current = null
    }
  }

  const handlePlacement = (id: string, zone: ZoneId) => {
    const item = items.find((x) => x.id === id)
    if (!item) return
    const prev = placed[id]
    const prevCorrect = prev ? item.suggested === prev : false
    const nowCorrect = item.suggested === zone
    setPlaced((m) => ({ ...m, [id]: zone }))
    setScore((s) => {
      // Only award when transitioning from not-correct to correct; remove if leaving correct
      if (!prevCorrect && nowCorrect) return s + 10
      if (prevCorrect && !nowCorrect) return Math.max(0, s - 10)
      return s
    })
    setFeedback(nowCorrect ? `Nice! ${explain(item, zone)}` : `Not the best choice. ${explain(item, zone)}`)
    setFeedbackOk(nowCorrect)
    justDroppedRef.current = id
  }

  const reset = () => {
    setItems(shuffle(ALL_ITEMS))
    setPlaced({})
    setDraggingId(null)
    setHoverZone(null)
    setScore(0)
    setFeedback(null)
    setFeedbackOk(null)
    setShowResult(false)
    hasFinishedRef.current = false
  }

  const remaining = items.filter((it) => placed[it.id] === null)

  // Trigger confetti when result is shown
  useEffect(() => {
    if (showResult) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [showResult])

  function renderDragCanvas(emoji: string, text: string) {
    const dpi = Math.max(1, Math.floor(window.devicePixelRatio || 1))
    const paddingX = 18
    const paddingY = 12
    const fontSize = 14
    const gap = 10
    const emojiSize = 18
    const radius = 12

    if (!dragCanvasRef.current) {
      dragCanvasRef.current = document.createElement('canvas')
      dragCanvasRef.current.style.position = 'fixed'
      dragCanvasRef.current.style.top = '-1000px'
      dragCanvasRef.current.style.left = '-1000px'
      document.body.appendChild(dragCanvasRef.current)
    }
    const canvas = dragCanvasRef.current
    const ctx = canvas.getContext('2d')!

    // Measure text (rough pass at CSS font)
    ctx.font = `${fontSize * dpi}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`
    const metrics = ctx.measureText(text)
    const textWidth = metrics.width / dpi
    const width = (paddingX * 2 + emojiSize + gap + textWidth)
    const height = (paddingY * 2 + Math.max(emojiSize, fontSize))
    canvas.width = Math.ceil(width * dpi)
    canvas.height = Math.ceil(height * dpi)

    // Scale for DPI
    ctx.setTransform(dpi, 0, 0, dpi, 0, 0)

    // Background rounded rect
    const w = width
    const h = height
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#a855f7'
    ctx.lineWidth = 3
    ctx.beginPath()
    const r = radius
    ctx.moveTo(r, 0)
    ctx.lineTo(w - r, 0)
    ctx.arcTo(w, 0, w, r, r)
    ctx.lineTo(w, h - r)
    ctx.arcTo(w, h, w - r, h, r)
    ctx.lineTo(r, h)
    ctx.arcTo(0, h, 0, h - r, r)
    ctx.lineTo(0, r)
    ctx.arcTo(0, 0, r, 0, r)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Emoji
    ctx.font = `${emojiSize}px emoji, Apple Color Emoji, Segoe UI Emoji`
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(emoji || '', paddingX, paddingY + emojiSize - 2)

    // Text
    ctx.font = `${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`
    ctx.fillStyle = '#4c1d95'
    ctx.textBaseline = 'middle'
    const textY = Math.round(h / 2)
    ctx.fillText(text, paddingX + emojiSize + gap, textY)

    return canvas
  }

  if (showResult) {
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
          <section className="w-full py-10 bg-brand-gradient min-h-[calc(100vh-8rem)]">
            <div className="container px-4 md:px-6 max-w-4xl">
              <Card className="border-8 border-purple-500">
                <CardHeader className="bg-white">
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <Sticker emoji={stars >= items.length ? "🦸‍♂️" : stars >= Math.ceil(items.length * 0.6) ? "💪" : "📚"} size="lg" />
                  </div>
                  <div className="relative">
                    {stars >= items.length && (
                      <>
                        <div className="absolute top-6 left-6 bg-yellow-400 text-purple-800 font-bold px-4 py-2 rounded-full border-2 border-yellow-500 rotate-12 animate-bounce z-10">
                          Amazing!
                        </div>
                        <div className="absolute bottom-6 right-6 bg-pink-400 text-white font-bold px-4 py-2 rounded-full border-2 border-pink-500 -rotate-12 animate-bounce z-10">
                          Super Hero!
                        </div>
                      </>
                    )}
                    {stars >= Math.ceil(items.length * 0.6) && stars < items.length && (
                      <div className="absolute top-6 right-6 bg-green-400 text-white font-bold px-4 py-2 rounded-full border-2 border-green-500 rotate-12 animate-bounce z-10">
                        Great Job!
                      </div>
                    )}
                  </div>
                  <h1 className="text-3xl font-extrabold text-purple-800 mb-2 text-center">CyberDefender Certificate</h1>
                  <p className="text-purple-800 font-medium mb-4 text-center">Advanced Level Complete!</p>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <span className="text-xl font-extrabold text-purple-800">Score: {stars} / {items.length}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Badge className="bg-purple-100 text-purple-800 font-bold">Advanced Level</Badge>
                    <Badge className="bg-blue-100 text-blue-800 font-bold">Digital Footprint Master</Badge>
                  </div>
                  <div className="grid gap-3">
                    <Tip text="Think before you post. Would you share this with a stranger?" />
                    <Tip text="Avoid posting live locations. Share after you leave." />
                    <Tip text="Delete sensitive info like phone numbers and financial details." />
                    <Tip text="Report cyberbullying, scams, and misinformation to the platform." />
                    <Tip text="Use privacy settings to control who sees your content." />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button onClick={reset} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">Play Again</Button>
                    <Button asChild className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600">
                      <Link href="/games">Back to Games</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
        <section className="w-full py-8 md:py-12 bg-brand-gradient min-h-[calc(100vh-8rem)]">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="icon" asChild className="bg-yellow-300 hover:bg-yellow-400 text-purple-800 rounded-full">
                <Link href="/games">
                  <ArrowLeft className="h-6 w-6" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white drop-shadow-md flex items-center gap-2">
                <Sticker emoji="🧹" size="lg" /> CyberDefender: Digital Footprint Cleanup
              </h1>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-yellow-300 text-purple-800 font-bold border-2 border-yellow-500">Ages 10–12</Badge>
              <div className="flex items-center gap-2 ml-auto text-white font-bold">
                <Star className="h-5 w-5 text-yellow-300" /> Stars: {stars}
              </div>
            </div>

            <div className="mb-4">
              <Progress value={progress} />
              <p className="text-white font-bold mt-1">Completed: {progress}%</p>
            </div>

            {/* Tutorial Banner */}
            {showTutorial && (
              <div className="bg-white/90 border-4 border-purple-500 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-6 w-6 text-purple-700 mt-0.5" />
                  <div className="text-purple-800">
                    <h3 className="font-extrabold">How to play</h3>
                    <p className="font-medium text-sm">
                      Drag each item from your profile into one of the four zones: <b>Keep Public 🌍</b>, <b>Make Private 🔐</b>, <b>Delete 🗑️</b>, or <b>Report 🚩</b>.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button onClick={() => setShowTutorial(false)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">Got it!</Button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
              {/* Draggable Items */}
              <Card className="bg-white border-8 border-purple-500 rounded-xl shadow-xl overflow-hidden">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="text-purple-800 font-extrabold">Your Social Profile</CardTitle>
                  <CardDescription className="text-purple-700 font-bold">Drag items into the best zone</CardDescription>
                </CardHeader>
                <CardContent className="p-4 min-h-[320px]">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {remaining.map((it) => (
                      <button
                        key={it.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, it.id)}
                        onDragEnd={onDragEnd}
                        className={`text-left p-3 rounded-lg border-2 transition-transform active:scale-[.98] ${draggingId === it.id ? 'ring-4 ring-purple-300 shadow-lg scale-[.99]' : ''} border-purple-300 hover:border-purple-500 bg-white`}
                        aria-label={`Draggable item: ${it.text}`}
                        title={it.tooltip}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-xl" aria-hidden>{it.emoji}</span>
                          <span className="font-bold text-purple-800 text-sm sm:text-base">{it.text}</span>
                        </div>
                      </button>
                    ))}
                    {remaining.length === 0 && (
                      <div className="text-center text-purple-700 font-bold py-6">All items placed. Great job!</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Drop Zones & Feedback */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {ZONES.map((z) => (
                    <div key={z.id} aria-label={`${z.label} dropzone`}>
                      <div
                        onDragOver={(e) => onDragOver(e, z.id)}
                        onDragLeave={onDragLeave}
                        onDrop={(e) => onDrop(e, z.id)}
                        className={`rounded-xl border-4 p-3 min-h-[96px] bg-white transition-colors ${hoverZone === z.id ? 'border-purple-700 bg-purple-50' : 'border-purple-300'}`}
                        role="region"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-white ${z.color}`}>{z.emoji}</span>
                          <div className="font-extrabold text-purple-800">{z.label}</div>
                        </div>
                        <div className="text-xs text-purple-700 font-bold">{z.description}</div>
                        {/* Show last dropped item briefly */}
                        {items
                          .filter((it) => placed[it.id] === z.id)
                          .map((it) => (
                            <button
                              key={it.id}
                              draggable
                              onDragStart={(e) => onDragStart(e, it.id)}
                              onDragEnd={onDragEnd}
                              className={`mt-2 w-full text-left p-2 rounded border-2 ${justDroppedRef.current === it.id ? 'animate-bounce' : ''} ${draggingId === it.id ? 'ring-4 ring-purple-300 shadow-lg scale-[.99]' : ''} border-purple-200 bg-white text-xs font-bold text-purple-800 active:scale-[.98]`}
                              aria-label={`Placed item: ${it.text} (drag to move)`}
                              title={`${it.tooltip} — drag to move`}
                            >
                              {it.emoji} {it.text}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {feedback && (
                  <div className={`p-3 rounded-lg border-2 ${feedbackOk ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}`}>
                    <div className="flex items-center gap-2">
                      {feedbackOk ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-yellow-600" />
                      )}
                      <span className="font-bold text-purple-800 text-sm">{feedback}</span>
                    </div>
                  </div>
                )}
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

function Tip({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 bg-yellow-50 p-3 rounded-md border-2 border-yellow-300">
      <Info className="h-5 w-5 text-yellow-700 mt-0.5" />
      <span className="text-purple-800 font-bold text-sm">{text}</span>
    </div>
  )
}

function explain(item: GameItem, zone: ZoneId): string {
  const map: Record<ZoneId, string> = {
    keep: "Content is generally safe for a wider audience.",
    private: "Better shared only with friends/trusted followers.",
    delete: "Contains sensitive info that should be removed.",
    report: "Violates safety rules or could be a scam/abuse. Report it."
  }
  const action = map[zone]
  const ideal = item.suggested === zone ? "Good call!" : `Recommended: ${labelFor(item.suggested)}.`
  return `${ideal} ${action}`
}

function labelFor(zone: ZoneId): string {
  switch (zone) {
    case "keep":
      return "Keep Public"
    case "private":
      return "Make Private"
    case "delete":
      return "Delete"
    case "report":
      return "Report"
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function renderStars(total: number, filled: number) {
  const max = Math.max(1, total)
  const capped = Math.max(0, Math.min(filled, max))
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: capped }).map((_, i) => (
        <span key={`f-${i}`} className="text-yellow-300 text-2xl">★</span>
      ))}
      {Array.from({ length: Math.max(0, max - capped) }).map((_, i) => (
        <span key={`e-${i}`} className="text-yellow-200 text-2xl">☆</span>
      ))}
    </div>
  )
}




