import { experience } from '../data/portfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'

function calcDuration(startDate, endDate) {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()

  if (months < 0) {
    years -= 1
    months += 12
  }

  months += 1
  if (months === 12) {
    years += 1
    months = 0
  }

  const parts = []
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`)
  return parts.join(' ') || '< 1 mo'
}

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function ExperienceCard({ exp, index }) {
  const [ref, visible] = useScrollReveal()
  const duration = calcDuration(exp.startDate, exp.endDate)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        className="relative glass rounded-2xl border border-white/5 overflow-hidden group hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${exp.color}10`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />

        {/* Hover glow */}
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{ background: exp.color }} />

        <div className="p-7">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border"
                style={{ background: `${exp.color}12`, borderColor: `${exp.color}30` }}>
                {exp.icon}
              </div>
              <div>
                <h3 className="font-display text-white text-xl font-semibold leading-tight">{exp.role}</h3>
                <p className="font-display text-base font-medium mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
              </div>

              {/* Live duration badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: exp.color }} />
                <span className="font-mono text-xs font-semibold" style={{ color: exp.color }}>{duration}</span>
              </div>

              <span className="text-xs font-mono px-2 py-0.5 rounded-md text-white/30 bg-white/5">
                {exp.type} · {exp.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-5">{exp.description}</p>

          {/* Responsibilities */}
          <div className="mb-5">
            <h4 className="text-white/30 text-xs font-mono tracking-widest uppercase mb-3">Responsibilities</h4>
            <ul className="space-y-2">
              {exp.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/55">
                  <svg className="flex-shrink-0 mt-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={exp.color} strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {exp.skills.map(skill => (
              <span key={skill} className="px-3 py-1 rounded-lg text-xs font-mono border"
                style={{ color: exp.color, borderColor: `${exp.color}30`, background: `${exp.color}08` }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const [titleRef, titleVisible] = useScrollReveal()

  return (
    <section id="experience" className="relative py-28 section-glow">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00f5d4]/4 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="font-mono text-[#00f5d4] text-sm tracking-[4px] block mb-3">02. EXPERIENCE</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white section-title">
            Work Experience
          </h2>
          <p className="text-white/40 font-body mt-4 max-w-xl mx-auto">
            Professional journey and the companies I've had the pleasure to work with.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.company + exp.role} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
