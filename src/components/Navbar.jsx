import { useState, useEffect } from 'react'
import { personalInfo } from '../data/portfolioData'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('#home')}
          className="font-display font-bold text-xl"
        >
          <span className="text-gradient">NG</span>
          <span className="text-white/30 text-sm font-body font-normal ml-2 hidden sm:inline">
            / {personalInfo.shortName}
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleNav(href)}
                className={`nav-link relative text-sm font-body font-medium tracking-wide transition-all duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#00f5d4] after:transition-all after:duration-300 ${
                  active === href.slice(1)
                    ? 'text-[#00f5d4] after:w-full'
                    : 'text-white/50 hover:text-white after:w-0 hover:after:w-full'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={personalInfo.resumeUrl}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-[#00f5d4]/40 text-[#00f5d4] text-sm font-medium hover:bg-[#00f5d4]/10 transition-all duration-300"
          style={{ boxShadow: '0 0 15px rgba(0,245,212,0.1)' }}
        >
          <span>Resume</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-[#00f5d4] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#00f5d4] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#00f5d4] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-400 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass mt-2 mx-4 rounded-xl p-4 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === href.slice(1)
                  ? 'text-[#00f5d4] bg-[#00f5d4]/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
