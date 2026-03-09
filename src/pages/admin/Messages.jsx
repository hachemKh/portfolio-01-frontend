import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../api/axios'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState(null)

  const load = () => {
    api.get('/contact').then(({ data }) => setMessages(data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleOpen = async (msg) => {
    setSelected(msg)
    if (!msg.read) {
      try {
        await api.patch(`/contact/${msg._id}/read`)
        setMessages(ms => ms.map(m => m._id === msg._id ? { ...m, read: true } : m))
      } catch {}
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await api.delete(`/contact/${id}`)
      toast.success('Message deleted')
      setMessages(ms => ms.filter(m => m._id !== id))
      if (selected?._id === id) setSelected(null)
    } catch {
      toast.error('Failed to delete')
    }
  }

  const unread = messages.filter(m => !m.read).length

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          {unread > 0 && (
            <span className="badge bg-primary-500/20 text-primary-400 border border-primary-500/20">
              {unread} unread
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-1">{messages.length} total messages</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-2">
          {loading ? (
            [...Array(5)].map((_, i) => <div key={i} className="card animate-pulse h-20 bg-gray-800/50" />)
          ) : messages.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-3xl mb-3">✉</p>
              <p className="text-gray-500">No messages yet</p>
            </div>
          ) : messages.map(msg => (
            <div
              key={msg._id}
              onClick={() => handleOpen(msg)}
              className={`card cursor-pointer transition-all py-4 ${
                selected?._id === msg._id ? 'border-primary-500/50 bg-primary-500/5' : 'hover:border-gray-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${msg.read ? 'bg-gray-700' : 'bg-primary-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className={`text-sm font-medium truncate ${msg.read ? 'text-gray-400' : 'text-white'}`}>{msg.name}</p>
                    <span className="text-xs text-gray-600 flex-shrink-0">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className={`text-xs truncate ${msg.read ? 'text-gray-600' : 'text-gray-400'}`}>{msg.subject}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail pane */}
        <div>
          {selected ? (
            <div className="card sticky top-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-white">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-primary-400 hover:underline">{selected.email}</a>
                </div>
                <button onClick={() => handleDelete(selected._id)} className="btn-danger text-xs py-1.5 px-3">
                  Delete
                </button>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-800">
                <p className="text-xs text-gray-500 mb-1">Subject</p>
                <p className="text-sm text-white font-medium">{selected.subject}</p>
              </div>

              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-2">Message</p>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              <p className="text-xs text-gray-600">
                Received {new Date(selected.createdAt).toLocaleString()}
              </p>

              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="btn-primary w-full justify-center mt-4"
              >
                Reply via Email →
              </a>
            </div>
          ) : (
            <div className="card flex flex-col items-center justify-center h-64 text-center">
              <p className="text-3xl mb-3 text-gray-700">✉</p>
              <p className="text-gray-500 text-sm">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
