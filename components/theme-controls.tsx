"use client"

import { useEffect, useState } from "react"

function getVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

export function ThemeControls() {
  const [header, setHeader] = useState<string>("#facc15") // yellow-400 default
  const [from, setFrom] = useState<string>("#60a5fa")
  const [to, setTo] = useState<string>("#a78bfa")
  const [open, setOpen] = useState<boolean>(false)
  const [ready, setReady] = useState<boolean>(false)
  const [footerBg, setFooterBg] = useState<string>("#4c1d95")
  const [footerBorder, setFooterBorder] = useState<string>("#facc15")

  // draft values for unsaved edits inside the panel
  const [dHeader, setDHeader] = useState<string>(header)
  const [dFrom, setDFrom] = useState<string>(from)
  const [dTo, setDTo] = useState<string>(to)
  const [dFooterBg, setDFooterBg] = useState<string>(footerBg)
  const [dFooterBorder, setDFooterBorder] = useState<string>(footerBorder)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cyberheroes:theme") || "{}")
      if (saved.header || saved.from || saved.to || saved.footerBg || saved.footerBorder) {
        if (saved.header) setHeader(saved.header)
        if (saved.from) setFrom(saved.from)
        if (saved.to) setTo(saved.to)
        if (saved.footerBg) setFooterBg(saved.footerBg)
        if (saved.footerBorder) setFooterBorder(saved.footerBorder)
      } else {
        // fall back to current CSS vars if set by ThemeBoot
        const cssHeader = getVar("--brand-header", header)
        const cssFrom = getVar("--brand-from", from)
        const cssTo = getVar("--brand-to", to)
        const cssFooter = getVar("--brand-footer", footerBg)
        const cssFooterBorder = getVar("--brand-footer-border", footerBorder)
        setHeader(cssHeader)
        setFrom(cssFrom)
        setTo(cssTo)
        setFooterBg(cssFooter)
        setFooterBorder(cssFooterBorder)
      }
      setReady(true)
    } catch {}
  }, [])

  useEffect(() => {
    if (!ready) return
    const root = document.documentElement
    root.style.setProperty("--brand-header", header)
    root.style.setProperty("--brand-from", from)
    root.style.setProperty("--brand-to", to)
    root.style.setProperty("--brand-footer", footerBg)
    root.style.setProperty("--brand-footer-border", footerBorder)
  }, [header, from, to, footerBg, footerBorder, ready])

  const applyVars = (h: string, f: string, t: string, fb: string, fbd: string) => {
    const root = document.documentElement
    root.style.setProperty("--brand-header", h)
    root.style.setProperty("--brand-from", f)
    root.style.setProperty("--brand-to", t)
    root.style.setProperty("--brand-footer", fb)
    root.style.setProperty("--brand-footer-border", fbd)
  }

  // live preview drafts while panel is open
  useEffect(() => {
    if (!open) return
    applyVars(dHeader, dFrom, dTo, dFooterBg, dFooterBorder)
  }, [open, dHeader, dFrom, dTo, dFooterBg, dFooterBorder])

  const saveTheme = (h: string, f: string, t: string, fb: string, fbd: string) => {
    try { localStorage.setItem("cyberheroes:theme", JSON.stringify({ header: h, from: f, to: t, footerBg: fb, footerBorder: fbd })) } catch {}
  }

  const handleOpen = () => {
    // initialize drafts from the currently saved/baseline values
    setDHeader(header); setDFrom(from); setDTo(to); setDFooterBg(footerBg); setDFooterBorder(footerBorder)
    setOpen(true)
  }

  const handleClose = () => {
    // revert preview to baseline if user didn't save
    applyVars(header, from, to, footerBg, footerBorder)
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {open ? (
        <div className="bg-white border-4 border-purple-500 rounded-2xl shadow-2xl p-4 w-[280px]">
          <div className="flex items-center justify-between mb-2">
            <div className="font-extrabold text-purple-800">Theme Controls</div>
            <button onClick={handleClose} className="px-2 py-1 rounded-md border-2 border-purple-300 text-purple-700 font-bold hover:bg-purple-50">Close</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-bold text-purple-800">Header</label>
              <input type="color" value={dHeader} onChange={(e) => setDHeader(e.target.value)} className="h-8 w-12 border rounded" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-bold text-purple-800">Background From</label>
              <input type="color" value={dFrom} onChange={(e) => setDFrom(e.target.value)} className="h-8 w-12 border rounded" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-bold text-purple-800">Background To</label>
              <input type="color" value={dTo} onChange={(e) => setDTo(e.target.value)} className="h-8 w-12 border rounded" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-bold text-purple-800">Footer BG</label>
              <input type="color" value={dFooterBg} onChange={(e) => setDFooterBg(e.target.value)} className="h-8 w-12 border rounded" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-bold text-purple-800">Footer Border</label>
              <input type="color" value={dFooterBorder} onChange={(e) => setDFooterBorder(e.target.value)} className="h-8 w-12 border rounded" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => { const dh = "#facc15", df = "#60a5fa", dt = "#a78bfa", dfb = "#4c1d95", dfbd = "#facc15"; setHeader(dh); setFrom(df); setTo(dt); setFooterBg(dfb); setFooterBorder(dfbd); setDHeader(dh); setDFrom(df); setDTo(dt); setDFooterBg(dfb); setDFooterBorder(dfbd); saveTheme(dh, df, dt, dfb, dfbd); applyVars(dh, df, dt, dfb, dfbd); setOpen(false); }} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700 rounded-md px-3 py-2">Reset</button>
              <button onClick={() => { setHeader(dHeader); setFrom(dFrom); setTo(dTo); setFooterBg(dFooterBg); setFooterBorder(dFooterBorder); saveTheme(dHeader, dFrom, dTo, dFooterBg, dFooterBorder); setOpen(false); }} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-extrabold border-2 border-green-700 rounded-md px-3 py-2">Save</button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={handleOpen} className="bg-yellow-300 text-purple-800 font-bold px-4 py-2 rounded-full border-2 border-yellow-500 shadow-lg">Theme</button>
      )}
    </div>
  )
}


