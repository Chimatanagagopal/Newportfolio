import { useRef, useState } from 'react'
import { projects } from '../data/portfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [ref, visible] = useScrollReveal()

  const onMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 16
    const y = -((e.clientY - top) / height - 0.5) * 16
    setTilt({ x, y })
  }

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        className="relative group rounded-2xl glass border border-white/5 overflow-hidden h-full"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) ${hovered ? 'scale(1.02)' : 'scale(1)'}`,
          transition: 'transform 0.3s ease',
          boxShadow: hovered ? '0 30px 80px rgba(0,0,0,0.4), 0 0 40px rgba(0,245,212,0.08)' : 'none',
        }}
      >
        {/* Gradient top border */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.color} opacity-60`} />

        {/* Glow on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`} />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00f5d4]/10 border border-[#00f5d4]/30">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f5d4] animate-pulse" />
            <span className="text-[#00f5d4] text-xs font-mono">Featured</span>
          </div>
        )}

        <div className="p-6">
          {/* Icon + title */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${project.color} bg-opacity-10 flex-shrink-0`}
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="font-display font-semibold text-white text-lg leading-tight">{project.title}</h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-5">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs font-mono border border-white/8 text-white/40 bg-white/[0.02]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-[#00f5d4] transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Code
            </a>
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-[#8b5cf6] transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [titleRef, titleVisible] = useScrollReveal()

  return (
    <section id="projects" className="relative py-28 section-glow">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#00f5d4]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="font-mono text-[#00f5d4] text-sm tracking-[4px] block mb-3">03. PROJECTS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white section-title">
            Things I've Built
          </h2>
          <p className="text-white/40 font-body mt-4 max-w-xl mx-auto">
            A collection of projects that showcase my skills across different domains.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-500 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <a
            href="https://github.com/Chimatanagagopal"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl glass border border-[#00f5d4]/20 text-[#00f5d4] font-display font-medium text-sm hover:bg-[#00f5d4]/10 transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            View All on GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
