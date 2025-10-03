"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoPlayerProps {
  title: string
  thumbnailSrc: string
  videoId?: string
}

export function VideoPlayer({ title, thumbnailSrc, videoId = "example-video" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="rounded-xl overflow-hidden border-4 border-purple-400 shadow-lg">
      <div className="relative">
        <div className="aspect-video bg-gray-900 flex items-center justify-center">
          {/* This would be replaced with an actual video player in production */}
          <img src={thumbnailSrc || "/placeholder.svg"} alt={title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transform transition-transform hover:scale-110"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </button>
          </div>
        </div>
        <div className="bg-purple-600 p-2 flex items-center justify-between">
          <h3 className="text-white font-bold truncate">{title}</h3>
          <button onClick={toggleMute} className="text-white hover:bg-purple-700 rounded-full p-1">
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  )
}
