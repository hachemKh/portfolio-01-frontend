import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../api/axios'

const EMPTY_FORM = {
  title: '', description: '', longDescription: '', category: '',
  techStack: '', liveUrl: '', githubUrl: '', featured: false, order: 0,
}

function ProjectForm({ project, onSave, onCancel }) {
  const [form, setForm]         = useState(project ? {
    ...project,
    techStack: project.techStack?.join(', ') || '',
    featured: project.featured || false,
  } : EMPTY_FORM)
  const [newFiles, setNewFiles]   = useState([])
  const [newPreviews, setNewPreviews] = useState([])
  const [removeIds, setRemoveIds] = useState([])
  const [loading, setLoading]     = useState(false)

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleNewFiles = e => {
    const files = Array.from(e.target.files)
    setNewFiles(files)
    setNewPreviews(files.map(f => URL.createObjectURL(f)))
  }

  const removeNewFile = (index) => {
    setNewFiles(f => f.filter((_, i) => i !== index))
    setNewPreviews(p => p.filter((_, i) => i !== index))
  }

  const toggleRemoveExisting = (publicId) => {
    setRemoveIds(ids =>
      ids.includes(publicId)
        ? ids.filter(i => i !== publicId)
        : [...ids, publicId]
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('title',           form.title)
      fd.append('description',     form.description)
      fd.append('longDescription', form.longDescription || '')
      fd.append('category',        form.category)
      fd.append('techStack',       form.techStack)
      fd.append('liveUrl',         form.liveUrl || '')
      fd.append('githubUrl',       form.githubUrl || '')
      fd.append('featured',        form.featured)
      fd.append('order',           form.order)

      newFiles.forEach(f => fd.append('images', f))

      if (removeIds.length > 0) {
        fd.append('removeImages', JSON.stringify(removeIds))
      }

      if (project) {
        await api.put(`/projects/${project._id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Project updated!')
      } else {
        await api.post('/projects', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Project created!')
      }
      onSave()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">
            {project ? '✏️ Edit Project' : '➕ New Project'}
          </h2>
          <button onClick={onCancel} className="text-xl text-gray-500 transition-colors hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Title + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1.5">Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required className="input" placeholder="Project title" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Category *</label>
              <input name="category" value={form.category} onChange={handleChange} required className="input" placeholder="e.g. Web App" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Order</label>
              <input name="order" type="number" value={form.order} onChange={handleChange} className="input" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Short Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="resize-none input" placeholder="Brief description shown on cards" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Long Description</label>
            <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows={4} className="resize-none input" placeholder="Detailed description on project page" />
          </div>

          {/* Tech stack */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Tech Stack (comma separated)</label>
            <input name="techStack" value={form.techStack} onChange={handleChange} className="input" placeholder="React, Node.js, MongoDB" />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Live URL</label>
              <input name="liveUrl" value={form.liveUrl} onChange={handleChange} className="input" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">GitHub URL</label>
              <input name="githubUrl" value={form.githubUrl} onChange={handleChange} className="input" placeholder="https://github.com/..." />
            </div>
          </div>

          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 rounded accent-primary-500" />
            <span className="text-sm text-gray-400">⭐ Featured project (shown on homepage)</span>
          </label>

          {/* ── EXISTING IMAGES ── */}
          {project?.images?.length > 0 && (
            <div>
              <label className="block mb-3 text-sm text-gray-400">
                Current Images
                <span className="ml-2 text-xs text-gray-600">— click the 🗑️ button to mark for deletion</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {project.images.map(img => {
                  const markedForDelete = removeIds.includes(img.publicId)
                  return (
                    <div key={img.publicId} className="relative overflow-hidden transition-all duration-200 border-2 group rounded-xl"
                      style={{ borderColor: markedForDelete ? '#ef4444' : '#374151' }}>

                      <img src={img.url} alt="" className={`w-full h-28 object-cover transition-all duration-200 ${markedForDelete ? 'opacity-30' : 'opacity-100'}`} />

                      {/* Delete overlay */}
                      {markedForDelete && (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-900/40">
                          <span className="px-2 py-1 text-sm font-bold text-red-400 rounded-lg bg-red-900/80">Will be deleted</span>
                        </div>
                      )}

                      {/* Toggle button */}
                      <button
                        type="button"
                        onClick={() => toggleRemoveExisting(img.publicId)}
                        className={`absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 shadow-lg
                          ${markedForDelete
                            ? 'bg-green-600 hover:bg-green-500 text-white'
                            : 'bg-red-600 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100'
                          }`}
                      >
                        {markedForDelete ? '↩' : '🗑'}
                      </button>
                    </div>
                  )
                })}
              </div>

              {removeIds.length > 0 && (
                <p className="mt-2 text-xs text-red-400">
                  ⚠️ {removeIds.length} image{removeIds.length > 1 ? 's' : ''} will be deleted on save
                </p>
              )}
            </div>
          )}

          {/* ── NEW IMAGES ── */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              {project ? 'Add New Images' : 'Upload Images'}
            </label>

            <label className="flex flex-col items-center justify-center w-full h-24 transition-all duration-200 border-2 border-gray-700 border-dashed cursor-pointer rounded-xl hover:border-primary-500 hover:bg-primary-500/5">
              <span className="mb-1 text-2xl">📁</span>
              <span className="text-sm text-gray-500">Click to select images</span>
              <input type="file" multiple accept="image/*" onChange={handleNewFiles} className="hidden" />
            </label>

            {/* New image previews */}
            {newPreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {newPreviews.map((src, i) => (
                  <div key={i} className="relative overflow-hidden border-2 group rounded-xl border-primary-500/40">
                    <img src={src} alt="" className="object-cover w-full h-28" />
                    <span className="absolute top-1 left-1 text-xs bg-primary-600/80 text-white px-1.5 py-0.5 rounded">New</span>
                    <button
                      type="button"
                      onClick={() => removeNewFile(i)}
                      className="absolute flex items-center justify-center text-xs font-bold text-white transition-all bg-red-600 rounded-lg opacity-0 top-2 right-2 w-7 h-7 hover:bg-red-500 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-gray-800">
            <button type="submit" disabled={loading} className="justify-center flex-1 py-3 btn-primary">
              {loading
                ? <><span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></span> Saving...</>
                : project ? '💾 Save Changes' : '🚀 Create Project'
              }
            </button>
            <button type="button" onClick={onCancel} className="px-6 btn-secondary">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [editing, setEditing]   = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/projects').then(({ data }) => setProjects(data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await api.delete(`/projects/${id}`)
      toast.success('Project deleted')
      load()
    } catch {
      toast.error('Failed to delete project')
    }
  }

  return (
    <div className="animate-fade-in">
      {editing && (
        <ProjectForm
          project={editing === 'new' ? null : editing}
          onSave={() => { setEditing(null); load() }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">{projects.length} total</p>
        </div>
        <button onClick={() => setEditing('new')} className="btn-primary">+ New Project</button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-20 card animate-pulse bg-gray-800/50" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="py-16 text-center card">
          <p className="mb-4 text-4xl">⊞</p>
          <p className="mb-6 text-gray-500">No projects yet</p>
          <button onClick={() => setEditing('new')} className="mx-auto btn-primary">Create First Project</button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p._id} className="flex items-center gap-4 py-4 card">
              <div className="flex-shrink-0 overflow-hidden bg-gray-800 rounded-lg w-14 h-14">
                {p.images?.[0]?.url
                  ? <img src={p.images[0].url} alt="" className="object-cover w-full h-full" />
                  : <span className="flex items-center justify-center w-full h-full text-xl text-gray-600">⊞</span>
                }
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-white truncate">{p.title}</p>
                  {p.featured && (
                    <span className="text-xs border badge bg-primary-500/10 text-primary-400 border-primary-500/20">⭐ Featured</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{p.category}</span>
                  <span className="text-xs text-gray-700">•</span>
                  <span className="font-mono text-xs text-gray-500">{p.techStack?.slice(0, 3).join(', ')}</span>
                </div>
              </div>

              <div className="flex flex-shrink-0 gap-2">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                    Live ↗
                  </a>
                )}
                <button onClick={() => setEditing(p)}
                  className="px-3 py-1.5 text-xs text-primary-400 hover:text-primary-300 hover:bg-primary-500/10 rounded-lg transition-colors">
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(p._id, p.title)}
                  className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
