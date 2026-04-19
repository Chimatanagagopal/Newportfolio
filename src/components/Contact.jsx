import { useState } from 'react'
import { personalInfo } from '../data/portfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'

const contactLinks = [
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    color: '#00f5d4',
  },
  {
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.93 6.93l1.14-1.16a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    color: '#8b5cf6',
  },
  {
    label: 'GitHub',
    value: 'Chimatanagagopal',
    href: personalInfo.github,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
    color: '#38bdf8',
  },
  {
    label: 'LinkedIn',
    value: 'naga-gopal',
    href: personalInfo.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: '#a78bfa',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [titleRef, titleVisible] = useScrollReveal()
  const [formRef, formVisible] = useScrollReveal()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative py-28 section-glow">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#8b5cf6]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="font-mono text-[#00f5d4] text-sm tracking-[4px] block mb-3">05. CONTACT</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white section-title">
            Let's Connect
          </h2>
          <p className="text-white/40 font-body mt-4 max-w-xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left — contact links */}
          <div
            className={`space-y-4 transition-all duration-700 ${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            ref={formRef}
          >
            <h3 className="font-display text-xl font-semibold text-white mb-6">Get In Touch</h3>

            {contactLinks.map(({ label, value, href, icon, color }, i) => (
              <a
                key={label}
                href={href}
                target={label === 'GitHub' || label === 'LinkedIn' ? '_blank' : undefined}
                rel="noreferrer"
                className={`flex items-center gap-4 p-4 rounded-xl glass border border-white/5 group transition-all duration-300 hover:border-opacity-40 hover:-translate-y-0.5 cursor-pointer`}
                style={{ '--link-color': color }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${color}40`
                  e.currentTarget.style.boxShadow = `0 8px 30px ${color}10`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{ color, background: `${color}15` }}
                >
                  {icon}
                </div>
                <div>
                  <div className="text-white/30 text-xs font-mono mb-0.5">{label}</div>
                  <div className="text-white text-sm font-medium group-hover:text-[var(--link-color)] transition-colors duration-300">{value}</div>
                </div>
                <svg className="ml-auto text-white/20 group-hover:text-[var(--link-color)] transition-colors duration-300 group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            ))}

            {/* Availability badge */}
            <div className="mt-6 p-4 rounded-xl glass border border-[#00f5d4]/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#00f5d4] animate-pulse" />
                <span className="text-white/70 text-sm">Currently open to new opportunities</span>
              </div>
              <p className="text-white/30 text-xs mt-2 ml-6 font-mono">
                📍 {personalInfo.location}
              </p>
            </div>
          </div>

          {/* Right — contact form */}
          <div
            className={`transition-all duration-700 delay-200 ${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/40 text-xs font-mono mb-2 tracking-wider uppercase">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Naga Gopal"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 outline-none focus:border-[#00f5d4]/50 focus:shadow-[0_0_20px_rgba(0,245,212,0.05)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs font-mono mb-2 tracking-wider uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 outline-none focus:border-[#00f5d4]/50 focus:shadow-[0_0_20px_rgba(0,245,212,0.05)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs font-mono mb-2 tracking-wider uppercase">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Hi Naga, I'd like to discuss..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 outline-none focus:border-[#00f5d4]/50 focus:shadow-[0_0_20px_rgba(0,245,212,0.05)] transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-300 ${
                  sent
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                    : 'bg-gradient-to-r from-[#00f5d4] to-[#8b5cf6] text-dark-900 hover:scale-[1.02] active:scale-[0.98]'
                }`}
                style={!sent ? { boxShadow: '0 0 30px rgba(0,245,212,0.25)' } : {}}
              >
                {sent ? '✓ Message Sent!' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
