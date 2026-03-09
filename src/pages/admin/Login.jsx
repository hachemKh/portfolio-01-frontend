import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-xl font-bold text-white rounded-xl bg-primary-600">P</div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-gray-500">Portfolio Dashboard</p>
        </div>

        <div className="card">
          {error && (
            <div className="px-4 py-3 mb-4 text-sm text-red-400 border rounded-lg bg-red-500/10 border-red-500/30">
              ❌ {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="admin@portfolio.com"
                required
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                required
                className="input"
              />
            </div>
            <button type="submit" disabled={loading} className="justify-center w-full py-3 mt-2 btn-primary">
              {loading ? (
                <><span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></span> Signing in...</>
              ) : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
