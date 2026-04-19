import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState('')
  const fullText = 'INITIALIZING...'

  useEffect(() => {
    let i = 0
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
      }
    }, 80)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => {
      clearInterval(typeInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="loading-screen flex-col gap-8">
      {/* Animated logo */}
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute inset-0 rounded-full border border-[#00f5d4]/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-[#8b5cf6]/40 animate-spin-slow" />
        <span className="font-display font-bold text-3xl text-gradient">NG</span>
      </div>

      {/* Typewriter text */}
      <div className="loader-text tracking-[6px]">
        {text}<span className="cursor-blink">_</span>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#00f5d4] to-[#8b5cf6] transition-all duration-75 ease-out rounded-full"
          style={{ width: `${progress}%`, boxShadow: '0 0 12px rgba(0,245,212,0.8)' }}
        />
      </div>

      <div className="loader-text text-xs opacity-40">{progress}%</div>
    </div>
  )
}
