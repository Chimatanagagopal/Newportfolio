import { useEffect, useRef, useState } from 'react'
import { personalInfo } from '../data/portfolioData'
import FloatingSphere from './FloatingSphere'

const taglines = personalInfo.taglines

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    const current = taglines[taglineIndex]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setTaglineIndex((taglineIndex + 1) % taglines.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, taglineIndex])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-40"
        style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Corner accents */}
      <div className="absolute top-20 left-8 w-32 h-32 border-l border-t border-[#00f5d4]/20 rounded-tl-2xl" />
      <div className="absolute bottom-20 right-8 w-32 h-32 border-r border-b border-[#8b5cf6]/20 rounded-br-2xl" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left — text */}
        <div className={`flex-1 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00f5d4]/20 text-xs font-mono text-[#00f5d4] mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
            Available for opportunities
          </div>

          {/* Name */}
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-4">
            <span className="text-white">Hi, I'm</span>
            <br />
            <span className="text-gradient">{personalInfo.shortName}</span>
          </h1>

          {/* Typewriter */}
          <div className="flex items-center gap-2 mb-6 h-10">
            <span className="text-white/40 font-mono text-lg">&gt;</span>
            <span className="font-display text-2xl md:text-3xl font-semibold text-[#8b5cf6]">
              {displayed}
            </span>
            <span className="cursor-blink text-[#00f5d4] text-3xl font-thin">|</span>
          </div>

          {/* Bio */}
          <p className="text-white/50 font-body text-lg leading-relaxed max-w-xl mb-10">
            Passionate about building clean, efficient, and modern web solutions.
            Turning ideas into reality with code and creativity.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00f5d4] to-[#8b5cf6] text-dark-900 font-display font-semibold text-sm tracking-wide hover:scale-105 active:scale-95 transition-all duration-300"
              style={{ boxShadow: '0 0 30px rgba(0,245,212,0.3)' }}
            >
              View Projects
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-xl glass border border-white/10 text-white font-display font-semibold text-sm tracking-wide hover:border-[#00f5d4]/40 hover:text-[#00f5d4] transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="text-white/40 hover:text-[#00f5d4] transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-white/40 hover:text-[#00f5d4] transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-white/40 hover:text-[#00f5d4] transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>

            <div className="w-px h-6 bg-white/10 mx-2" />
            <span className="text-white/25 text-xs font-mono">chimatanagagopal95@gmail.com</span>
          </div>
        </div>

        {/* Right — 3D sphere */}
        <div
          className={`flex-shrink-0 transition-all duration-1200 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="relative">
            {/* Glow backdrop */}
            <div className="absolute inset-[-40px] rounded-full bg-[#00f5d4]/5 blur-3xl" />
            <FloatingSphere />

            {/* Floating badges around sphere */}
            <div className="absolute -top-4 -right-4 glass neon-border px-3 py-1.5 rounded-full text-xs font-mono text-[#00f5d4] animate-float" style={{ animationDelay: '0s' }}>
              React.js
            </div>
            <div className="absolute top-1/2 -left-8 glass border border-[#8b5cf6]/30 px-3 py-1.5 rounded-full text-xs font-mono text-[#8b5cf6] animate-float" style={{ animationDelay: '1s' }}>
              Python
            </div>
            <div className="absolute -bottom-4 left-1/4 glass border border-[#38bdf8]/30 px-3 py-1.5 rounded-full text-xs font-mono text-[#38bdf8] animate-float" style={{ animationDelay: '2s' }}>
              Node.js
            </div>
            <div className="absolute top-8 -right-12 glass border border-[#a78bfa]/30 px-3 py-1.5 rounded-full text-xs font-mono text-[#a78bfa] animate-float" style={{ animationDelay: '0.5s' }}>
              AI / ML
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-[#00f5d4] transition-colors duration-300"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-5 h-8 rounded-full border border-current flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  )
}
