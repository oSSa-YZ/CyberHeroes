"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface StickerProps {
  emoji: string
  size?: "sm" | "md" | "lg"
  interactive?: boolean
}

export function Sticker({ emoji, size = "md", interactive = true }: StickerProps) {
  const [clicked, setClicked] = useState(false)

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  }

  const handleClick = () => {
    if (interactive) {
      setClicked(true)
      setTimeout(() => setClicked(false), 1000)
    }
  }

  return (
    <motion.div
      className={`inline-block ${interactive ? "cursor-pointer" : ""}`}
      onClick={handleClick}
      animate={clicked ? { scale: [1, 1.5, 1] } : {}}
      transition={{ duration: 0.5 }}
      whileHover={interactive ? { scale: 1.2 } : {}}
    >
      <span className={sizeClasses[size]}>{emoji}</span>
    </motion.div>
  )
}
