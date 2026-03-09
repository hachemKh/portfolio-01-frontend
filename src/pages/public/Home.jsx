import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer'
import ProjectCard from '../../components/public/ProjectCard'
import api from '../../api/axios'

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { category: 'Backend',  items: ['Node.js', 'Express', 'REST APIs', 'GraphQL'] },
  { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma'] },
  { category: 'DevOps',   items: ['Docker', 'Vercel', 'Railway', 'GitHub Actions'] },
]

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    api.get('/projects?category=All')
      .then(({ data }) => setFeatured(data.filter(p => p.featured).slice(0, 3)))
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="flex items-center min-h-screen pt-16">
        <div className="max-w-6xl px-6 py-24 mx-auto">
          <div className="max-w-3xl animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
              Available for work
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
                Khelifi Hachem
              </span>
            </h1>

            <p className="max-w-2xl mb-10 text-xl leading-relaxed text-gray-400">
              Full Stack Developer crafting modern web experiences. I build scalable applications
              with clean code and thoughtful design.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className="py-3 text-base btn-primary px-7">
                View My Work →
              </Link>
              <Link to="/contact" className="py-3 text-base btn-secondary px-7">
                Get In Touch
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex gap-12 pt-12 mt-16 border-t border-gray-800">
              {[
                { num: '20+', label: 'Projects Built' },
                { num: '3+', label: 'Years Coding' },
                { num: '10+', label: 'Technologies' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="text-3xl font-bold text-white">{num}</p>
                  <p className="mt-1 text-sm text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 border-t border-gray-800">
        <div className="max-w-6xl px-6 mx-auto">
          <div className="mb-12">
            <p className="mb-2 font-mono text-sm text-primary-400">// skills</p>
            <h2 className="text-3xl font-bold text-white">Tech Stack</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skills.map(({ category, items }) => (
              <div key={category} className="card">
                <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-primary-400">{category}</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 border-t border-gray-800">
        <div className="max-w-6xl px-6 mx-auto">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="mb-2 font-mono text-sm text-primary-400">// about</p>
              <h2 className="mb-6 text-3xl font-bold text-white">About Me</h2>
              <div className="space-y-4 leading-relaxed text-gray-400">
                <p>
                  I'm a passionate full-stack developer with a love for building products
                  that make a difference. I enjoy solving complex problems with elegant solutions.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing
                  to open source, or learning about system design and architecture patterns.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', title: 'Fast Learner', desc: 'Always picking up new tools and frameworks' },
                { icon: '🎯', title: 'Detail Oriented', desc: 'Clean code and polished UIs matter to me' },
                { icon: '🤝', title: 'Team Player', desc: 'Love collaborating and pair programming' },
                { icon: '🚀', title: 'Ship It', desc: 'Focused on delivering real value quickly' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="card">
                  <span className="block mb-3 text-2xl">{icon}</span>
                  <h4 className="mb-1 text-sm font-semibold text-white">{title}</h4>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="py-24 border-t border-gray-800">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="mb-2 font-mono text-sm text-primary-400">// featured</p>
                <h2 className="text-3xl font-bold text-white">Selected Work</h2>
              </div>
              <Link to="/projects" className="text-sm btn-secondary">View All →</Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map(p => <ProjectCard key={p._id} project={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 border-t border-gray-800">
        <div className="max-w-6xl px-6 mx-auto text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">Let's Build Something Together</h2>
          <p className="max-w-xl mx-auto mb-8 text-gray-400">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
          </p>
          <Link to="/contact" className="px-8 py-3 text-base btn-primary">
            Start a Conversation →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
