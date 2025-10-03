interface AnimatedGifProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function AnimatedGif({ src, alt, width = 300, height = 200, className = "" }: AnimatedGifProps) {
  return (
    <div className={`rounded-lg overflow-hidden border-4 border-purple-300 ${className}`}>
      {/* In a real implementation, this would be an actual GIF */}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover"
      />
    </div>
  )
}
