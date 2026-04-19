import { useState } from 'react'
import { skills } from '../data/portfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'AI/ML']

const categoryColors = {
  Frontend: '#00f5d4',
  Backend: '#8b5cf6',
  Database: '#38bdf8',
  Tools: '#f59e0b',
  'AI/ML': '#ec4899',
}

function SkillBar({ skill, visible, delay }) {
  return (
    <div
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="glass rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors duration-300">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-display text-sm font-medium text-white">{skill.name}</span>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-md"
              style={{
                color: categoryColors[skill.category] || '#00f5d4',
                background: `${categoryColors[skill.category] || '#00f5d4'}15`,
              }}
            >
              {skill.category}
            </span>
            <span className="font-mono text-xs text-white/40">{skill.level}%</span>
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          {visible && (
            <div
              className="skill-bar-fill"
              style={{
                width: `${skill.level}%`,
                background: `linear-gradient(90deg, ${categoryColors[skill.category] || '#00f5d4'}, ${categoryColors[skill.category] || '#00f5d4'}88)`,
                boxShadow: `0 0 8px ${categoryColors[skill.category] || '#00f5d4'}60`,
                animationDelay: `${delay}ms`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [titleRef, titleVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useScrollReveal()

  const filtered = activeCategory === 'All'
    ? skills.technical
    : skills.technical.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="relative py-28">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#8b5cf6]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="font-mono text-[#00f5d4] text-sm tracking-[4px] block mb-3">02. SKILLS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white section-title">
            Technical Arsenal
          </h2>
        </div>

        {/* Category filter */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-mono font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#00f5d4] text-dark-900 shadow-[0_0_20px_rgba(0,245,212,0.4)]'
                  : 'glass border border-white/10 text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Skill bars */}
          <div ref={gridRef} className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} visible={gridVisible} delay={i * 60} />
              ))}
            </div>
          </div>

          {/* Right panel — soft skills + tech stack icons */}
          <div className="space-y-6">
            {/* Soft skills */}
            <div
              className={`glass rounded-2xl p-6 border border-white/5 transition-all duration-700 delay-300 ${titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            >
              <h3 className="font-display text-base font-semibold text-white mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
                Soft Skills
              </h3>
              <div className="space-y-3">
                {skills.soft.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <div
                          key={j}
                          className="w-2 h-2 rounded-full"
                          style={{ background: j < 4 ? '#00f5d4' : 'rgba(255,255,255,0.1)' }}
                        />
                      ))}
                    </div>
                    <span className="text-white/60 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack quick view */}
            <div
              className={`glass rounded-2xl p-6 border border-white/5 transition-all duration-700 delay-400 ${titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            >
              <h3 className="font-display text-base font-semibold text-white mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                Tech Stack
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'React', color: '#61DAFB' },
                  { name: 'JS', color: '#F7DF1E' },
                  { name: 'Python', color: '#3776AB' },
                  { name: 'Node', color: '#339933' },
                  { name: 'MongoDB', color: '#47A248' },
                  { name: 'MySQL', color: '#4479A1' },
                  { name: 'Git', color: '#F05032' },
                  { name: 'HTML', color: '#E34F26' },
                  { name: 'CSS', color: '#1572B6' },
                ].map(({ name, color }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl glass-hover border border-white/5 cursor-default"
                    style={{ '--hover-color': color }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
                    />
                    <span className="text-white/50 text-xs font-mono">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div
              className={`glass rounded-2xl p-6 border border-white/5 transition-all duration-700 delay-500 ${titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            >
              <h3 className="font-display text-base font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                Focus Areas
              </h3>
              <div className="flex flex-col gap-2">
                {skills.interests.map(interest => (
                  <div
                    key={interest}
                    className="flex items-center gap-3 text-sm text-white/50 py-2 border-b border-white/5 last:border-0"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f5d4" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
