import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  const { _id, title, description, category, techStack, images, liveUrl, githubUrl, featured } = project
  const thumb = images?.[0]?.url

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-primary-500/40 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-800">
        {thumb ? (
          <img
            src={thumb}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl">⊞</div>
        )}
        {featured && (
          <span className="absolute top-3 left-3 badge bg-primary-500/20 text-primary-300 border border-primary-500/30">
            ★ Featured
          </span>
        )}
        <span className="absolute top-3 right-3 badge bg-gray-900/80 text-gray-300 backdrop-blur">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack?.slice(0, 5).map(tech => (
            <span key={tech} className="px-2 py-0.5 text-xs rounded bg-gray-800 text-gray-400 font-mono">
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-800">
          <Link
            to={`/projects/${_id}`}
            className="flex-1 text-center py-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
          >
            View Details →
          </Link>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
              className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              Live ↗
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
