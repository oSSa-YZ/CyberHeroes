"use client"

import { useState } from "react"
import { Lightbulb } from "lucide-react"

interface InteractiveTipProps {
  title: string
  content: string
  emoji: string
}

export function InteractiveTip({ title, content, emoji }: InteractiveTipProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2 p-3 rounded-lg ${isOpen ? "bg-yellow-300" : "bg-yellow-100"} border-2 border-yellow-400 hover:bg-yellow-200 transition-colors`}
      >
        <span className="text-2xl">{emoji}</span>
        <span className="font-bold text-purple-800">{title}</span>
        <Lightbulb className={`ml-auto h-5 w-5 text-yellow-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="mt-2 p-3 bg-white rounded-lg border-2 border-yellow-300 animate-fadeIn">
          <p className="text-purple-800">{content}</p>
        </div>
      )}
    </div>
  )
}
