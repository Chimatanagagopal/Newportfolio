import { skills } from '../data/portfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'

function CategoryCard({ category, index }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="glass rounded-2xl border border-white/5 p-5 h-full hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${category.color}12`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base border"
            style={{ background: `${category.color}15`, borderColor: `${category.color}30` }}
          >
            {category.icon}
          </div>
          <h3 className="font-mono text-xs font-bold tracking-widest" style={{ color: category.color }}>
            {category.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.items.map(item => (
            <span
              key={item}
              className="px-3 py-1 rounded-lg text-xs font-mono border transition-all duration-200 hover:scale-105"
              style={{
                color: category.color,
                borderColor: `${category.color}25`,
                background: `${category.color}08`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const [titleRef, titleVisible] = useScrollReveal()

  return (
    <section id="skills" className="relative py-28">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#8b5cf6]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="font-mono text-[#00f5d4] text-sm tracking-[4px] block mb-3">03. SKILLS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white section-title">
            Technical Arsenal
          </h2>
          <p className="text-white/40 font-body mt-4 max-w-xl mx-auto">
            Technologies and tools I work with across the AI/ML stack.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.categories.map((category, i) => (
            <CategoryCard key={category.name} category={category} index={i} />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className={`glass rounded-2xl p-6 border border-white/5 transition-all duration-700 delay-500 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map(s => (
                <span key={s} className="px-3 py-1 rounded-lg text-xs font-mono border border-[#00f5d4]/20 text-[#00f5d4]/70 bg-[#00f5d4]/05">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className={`glass rounded-2xl p-6 border border-white/5 transition-all duration-700 delay-600 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
              Focus Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.interests.map(interest => (
                <span key={interest} className="px-3 py-1 rounded-lg text-xs font-mono border border-[#8b5cf6]/20 text-[#8b5cf6]/70 bg-[#8b5cf6]/05">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}