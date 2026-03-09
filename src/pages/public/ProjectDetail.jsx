import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer'
import api from '../../api/axios'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(({ data }) => setProject(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
    </div>
  )

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl text-gray-500">Project not found</p>
      <Link to="/projects" className="btn-primary">← Back to Projects</Link>
    </div>
  )

  const { title, description, longDescription, category, techStack, images, liveUrl, githubUrl } = project

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">

        {/* Back */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
          ← Back to Projects
        </Link>

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
          <div>
            <span className="badge bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-3">{category}</span>
            <h1 className="text-4xl font-bold text-white">{title}</h1>
          </div>
          <div className="flex gap-3">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Live Demo ↗
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                GitHub →
              </a>
            )}
          </div>
        </div>

        {/* Images */}
        {images?.length > 0 && (
          <div className="mb-10">
            <div className="rounded-xl overflow-hidden border border-gray-800 h-80 bg-gray-900 mb-3">
              <img src={images[activeImg].url} alt={title} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`h-16 w-24 rounded-lg overflow-hidden border-2 transition-colors
                      ${i === activeImg ? 'border-primary-500' : 'border-gray-800 hover:border-gray-600'}`}>
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Description */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-white mb-4">About This Project</h2>
            <p className="text-gray-400 leading-relaxed mb-4">{description}</p>
            {longDescription && <p className="text-gray-400 leading-relaxed">{longDescription}</p>}
          </div>

          {/* Tech stack */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {techStack?.map(tech => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 text-sm font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
