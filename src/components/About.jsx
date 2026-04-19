import { personalInfo, education, achievements } from '../data/portfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'

function RevealCard({ children, delay = 0, className = '' }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function About() {
  const [titleRef, titleVisible] = useScrollReveal()

  return (
    <section id="about" className="relative py-28 section-glow">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="font-mono text-[#00f5d4] text-sm tracking-[4px] block mb-3">01. ABOUT</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white section-title">
            Who Am I?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — photo + bio */}
          <div className="space-y-8">
            <RevealCard delay={100}>
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                {/* Photo */}
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-40 rounded-2xl overflow-hidden neon-border">
                    <img
                      src={personalInfo.photoUrl}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00f5d4]/20 to-[#8b5cf6]/20"><span class="font-display text-4xl font-bold text-gradient">NG</span></div>`
                      }}
                    />
                  </div>
                  {/* Decorative corner */}
                  <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-[#8b5cf6]/30" />
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {[
                    { label: 'CGPA', value: '8.6', sub: 'B.Tech' },
                    { label: 'Projects', value: '5+', sub: 'Built' },
                    { label: 'Certs', value: '3', sub: 'Earned' },
                    { label: 'Skills', value: '12+', sub: 'Technical' },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="glass rounded-xl p-4 text-center border border-white/5">
                      <div className="font-display text-2xl font-bold text-gradient">{value}</div>
                      <div className="text-white/60 text-xs font-mono mt-0.5">{label}</div>
                      <div className="text-white/30 text-xs">{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealCard>

            <RevealCard delay={200}>
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-display text-lg font-semibold text-white mb-3">About Me</h3>
                <p className="text-white/60 text-base leading-relaxed font-body">
                  {personalInfo.bio}
                </p>
              </div>
            </RevealCard>

            {/* Achievements */}
            <RevealCard delay={300}>
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-display text-lg font-semibold text-white mb-4">Highlights</h3>
                <ul className="space-y-3">
                  {achievements.map(({ text, icon }, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                      <span className="text-lg flex-shrink-0">{icon}</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealCard>
          </div>

          {/* Right — education timeline */}
          <div>
            <RevealCard delay={150}>
              <h3 className="font-display text-lg font-semibold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#00f5d4]/10 border border-[#00f5d4]/20 flex items-center justify-center text-[#00f5d4] text-sm">🎓</span>
                Education
              </h3>
            </RevealCard>

            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-[#00f5d4]/50 via-[#8b5cf6]/30 to-transparent" />

              {education.map((edu, i) => (
                <RevealCard key={i} delay={200 + i * 120}>
                  <div className="relative mb-8 last:mb-0">
                    {/* Timeline dot */}
                    <div className="absolute -left-[25px] top-4 w-4 h-4 rounded-full border-2 border-[#00f5d4] bg-dark-900 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00f5d4]" />
                    </div>

                    <div className="glass rounded-2xl p-5 border border-white/5 glass-hover ml-2">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-xl">{edu.icon}</div>
                        <span className="font-mono text-xs text-[#00f5d4]/70 bg-[#00f5d4]/10 px-2 py-1 rounded-md">
                          {edu.year}
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-white text-base mb-1">{edu.degree}</h4>
                      <p className="text-white/50 text-sm mb-2">{edu.institution}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/30 text-xs font-mono">{edu.location}</span>
                        <span className="text-[#00f5d4] text-xs font-mono font-medium">{edu.score}</span>
                      </div>
                    </div>
                  </div>
                </RevealCard>
              ))}
            </div>

            {/* Passion tags */}
            <RevealCard delay={600}>
              <div className="mt-8 glass rounded-2xl p-5 border border-white/5">
                <h3 className="font-display text-sm font-semibold text-white/60 mb-3 tracking-widest uppercase">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {['Software Development', 'Generative AI', 'Web Applications', 'Backend Logic', 'Frontend Design', 'AI-driven Solutions'].map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-xs font-mono border border-[#8b5cf6]/30 text-[#a78bfa] bg-[#8b5cf6]/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </RevealCard>
          </div>
        </div>
      </div>
    </section>
  )
}
