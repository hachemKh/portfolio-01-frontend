import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

function StatCard({ label, value, icon, sub }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        {sub && <span className="badge bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs">{sub}</span>}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value ?? '—'}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/stats')
      .then(({ data }) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Projects"   value={stats?.totalProjects}    icon="⊞" />
        <StatCard label="Featured"         value={stats?.featuredProjects}  icon="★" />
        <StatCard label="Total Messages"   value={stats?.totalMessages}     icon="✉" />
        <StatCard label="Unread Messages"  value={stats?.unreadMessages}    icon="🔔" sub={stats?.unreadMessages > 0 ? 'New' : null} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent projects */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-white">Recent Projects</h2>
            <Link to="/admin/projects" className="text-xs text-primary-400 hover:text-primary-300">View all →</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentProjects?.length === 0 && (
              <p className="text-sm text-gray-500">No projects yet.</p>
            )}
            {stats?.recentProjects?.map(p => (
              <div key={p._id} className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0">
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex-shrink-0 overflow-hidden">
                  {p.images?.[0]?.url
                    ? <img src={p.images[0].url} alt="" className="w-full h-full object-cover" />
                    : <span className="w-full h-full flex items-center justify-center text-gray-600 text-sm">⊞</span>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.category}</p>
                </div>
                <span className="text-xs text-gray-600">{new Date(p.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-white">Recent Messages</h2>
            <Link to="/admin/messages" className="text-xs text-primary-400 hover:text-primary-300">View all →</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentMessages?.length === 0 && (
              <p className="text-sm text-gray-500">No messages yet.</p>
            )}
            {stats?.recentMessages?.map(m => (
              <div key={m._id} className="flex items-start gap-3 py-2 border-b border-gray-800 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${m.read ? 'bg-gray-700' : 'bg-primary-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{m.name}</p>
                  <p className="text-xs text-gray-400 truncate">{m.subject}</p>
                </div>
                <span className="text-xs text-gray-600">{new Date(m.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
