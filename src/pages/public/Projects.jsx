import { useState, useEffect } from 'react'
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer'
import ProjectCard from '../../components/public/ProjectCard'
import api from '../../api/axios'

export default function Projects() {
  const [projects,   setProjects]   = useState([])
  const [categories, setCategories] = useState(['All'])
  const [active,     setActive]     = useState('All')
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    api.get('/projects/categories')
      .then(({ data }) => setCategories(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const query = active !== 'All' ? `?category=${encodeURIComponent(active)}` : ''
    api.get(`/projects${query}`)
      .then(({ data }) => setProjects(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [active])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        <div className="mb-12">
          <p className="text-primary-400 font-mono text-sm mb-2">// projects</p>
          <h1 className="text-4xl font-bold text-white mb-4">My Work</h1>
          <p className="text-gray-400 max-w-xl">
            A collection of projects I've built — from side projects to production apps.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${active === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse h-80 bg-gray-800/50" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-4xl mb-4">⊘</p>
            <p>No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => <ProjectCard key={p._id} project={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
