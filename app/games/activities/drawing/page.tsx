"use client"

import { useEffect, useRef, useState } from "react"
import { logProgressOnce } from "@/lib/progress-client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brush, Download, Eraser, Shield, ArrowLeft } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { AuthButtons } from "@/components/auth-buttons"

export default function DrawingPage() {
  useEffect(() => { logProgressOnce('activities : visited', { page: 'drawing' }) }, [])
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/profile", label: "Profile", icon: "🦸" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isDrawingRef = useRef<boolean>(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const [brushColor, setBrushColor] = useState<string>("#7c3aed")
  const [brushSize, setBrushSize] = useState<number>(10)
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null)
  const [stickerSize, setStickerSize] = useState<number>(64)
  const [hasCompleted, setHasCompleted] = useState(false)

  const palette = [
    "#111827",
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f3f4f6",
  ]

  const stickers = [
    "🔒",
    "🛡️",
    "🧑‍💻",
    "🐞",
    "🦠",
    "⚠️",
    "✅",
    "❌",
    "📱",
    "💻",
    "🕵️‍♂️",
    "🔑",
    "👾",
    "🧹",
    "🚫",
    "🌐",
    "🔍",
    "🏆",
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const parent = containerRef.current
      if (!parent) return
      const width = parent.clientWidth
      const height = Math.max(360, Math.min(620, Math.floor(parent.clientWidth * 0.6)))
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, width, height)
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  const getPos = (e: PointerEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDrawing = (e: PointerEvent) => {
    e.preventDefault()
    if (selectedSticker) {
      const { x, y } = getPos(e)
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (canvas && ctx) {
        ctx.save()
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = `${stickerSize}px system-ui, -apple-system, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, emoji`
        ctx.fillText(selectedSticker, x, y)
        ctx.restore()
      }
      return
    }
    isDrawingRef.current = true
    lastPointRef.current = getPos(e)
  }

  const draw = (e: PointerEvent) => {
    if (!isDrawingRef.current) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const current = getPos(e)
    const last = lastPointRef.current || current
    ctx.strokeStyle = brushColor
    ctx.lineWidth = brushSize
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(current.x, current.y)
    ctx.stroke()
    lastPointRef.current = current
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "cyberheroes-drawing.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
    
    // Mark as completed when user downloads their drawing
    if (!hasCompleted) {
      setHasCompleted(true)
      logProgressOnce('activities : completed', { activity: 'drawing' })
    }
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
        <section className="w-full py-8 md:py-12 bg-brand-gradient min-h-[calc(100vh-4rem)]">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" asChild className="bg-yellow-300 hover:bg-yellow-400 text-purple-800 rounded-full">
                <Link href="/games">
                  <ArrowLeft className="h-6 w-6" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
            </div>
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white drop-shadow-md">
                Create a Cyber Safety Poster
              </h1>
              <div className="mt-2">
                <Badge className="bg-purple-100 text-purple-800 font-bold border-0">Drawing Activity</Badge>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[280px,1fr]">
              <div className="bg-white border-8 border-purple-500 rounded-xl p-4 shadow-xl">
                <h2 className="text-purple-800 font-extrabold mb-3 flex items-center gap-2">
                  <Brush className="h-5 w-5" /> Tools
                </h2>

                <div className="mb-4">
                  <p className="text-sm font-bold text-purple-800 mb-2">Colors</p>
                  <div className="grid grid-cols-8 gap-2">
                    {palette.map((c) => (
                      <button
                        key={c}
                        aria-label={`color-${c}`}
                        onClick={() => {
                          setBrushColor(c)
                          setSelectedSticker(null)
                        }}
                        className={`h-8 w-8 rounded-full border-2 ${
                          brushColor === c ? "border-purple-700 scale-110" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <input
                      type="color"
                      value={brushColor}
                      onChange={(e) => {
                        setBrushColor(e.target.value)
                        setSelectedSticker(null)
                      }}
                      className="h-8 w-full rounded-md border border-gray-300 col-span-4"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-bold text-purple-800 mb-2">Brush Size: {brushSize}px</p>
                  <input
                    type="range"
                    min={1}
                    max={48}
                    value={brushSize}
                    onChange={(e) => {
                      setBrushSize(parseInt(e.target.value))
                      setSelectedSticker(null)
                    }}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <p className="text-sm font-bold text-purple-800 mb-2">Stickers</p>
                  <div className="grid grid-cols-6 gap-2">
                    {stickers.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSticker(s)}
                        className={`h-9 w-9 flex items-center justify-center rounded-md border-2 bg-white text-lg transition-transform hover:scale-110 ${
                          selectedSticker === s ? "border-purple-700" : "border-gray-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-bold text-purple-800 mb-2">Sticker Size: {stickerSize}px</p>
                  <input
                    type="range"
                    min={24}
                    max={144}
                    value={stickerSize}
                    onChange={(e) => setStickerSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={clearCanvas} className="bg-red-500 hover:bg-red-600 text-white font-bold border-2 border-red-600">
                    <Eraser className="h-4 w-4 mr-2" /> Clear
                  </Button>
                  <Button onClick={downloadImage} className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>

              <div className="bg-white border-8 border-purple-500 rounded-xl p-2 shadow-xl" ref={containerRef}>
                <canvas
                  ref={canvasRef}
                  className="touch-none rounded-lg bg-white"
                  onPointerDown={(e) => startDrawing(e.nativeEvent as PointerEvent)}
                  onPointerMove={(e) => draw(e.nativeEvent as PointerEvent)}
                  onPointerUp={stopDrawing}
                  onPointerLeave={stopDrawing}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

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


