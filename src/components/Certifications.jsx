import { certifications } from '../data/portfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'

function CertCard({ cert, index }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="glass rounded-2xl p-6 border border-white/5 glass-hover h-full group relative overflow-hidden">
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 opacity-60"
          style={{ background: cert.color }}
        />

        {/* Glow */}
        <div
          className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{ background: cert.color }}
        />

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
          >
            {cert.icon}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-white text-base mb-1 leading-snug">
              {cert.title}
            </h3>
            <p className="text-white/40 text-sm mb-3">{cert.issuer}</p>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-white/30 text-xs font-mono">{cert.duration}</span>
                <span
                  className="text-xs font-mono font-medium px-2 py-0.5 rounded-md self-start"
                  style={{ color: cert.color, background: `${cert.color}15` }}
                >
                  {cert.grade}
                </span>
              </div>

              <a
                href={cert.certUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-300"
                style={{
                  borderColor: `${cert.color}40`,
                  color: cert.color,
                }}
                onMouseEnter={e => e.currentTarget.style.background = `${cert.color}10`}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
                </svg>
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Certifications() {
  const [titleRef, titleVisible] = useScrollReveal()

  return (
    <section id="certifications" className="relative py-28">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#38bdf8]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="font-mono text-[#00f5d4] text-sm tracking-[4px] block mb-3">04. CERTIFICATIONS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white section-title">
            Learning & Growth
          </h2>
          <p className="text-white/40 font-body mt-4 max-w-xl mx-auto">
            Certifications and virtual internships that have shaped my expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
