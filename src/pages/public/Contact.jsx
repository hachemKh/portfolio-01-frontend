import { useState } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer'
import api from '../../api/axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      toast.success('Message sent! I\'ll get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary-400 font-mono text-sm mb-2">// contact</p>
            <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
            <p className="text-gray-400">
              Have a question or want to work together? Drop me a message.
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Name</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="Your name" required className="input" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com" required className="input" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange}
                  placeholder="What's this about?" required className="input" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell me more..." required rows={6} className="input resize-none" />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
                {loading ? (
                  <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span> Sending...</>
                ) : 'Send Message →'}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: '📧', label: 'Email', value: 'you@email.com' },
              { icon: '💼', label: 'LinkedIn', value: '/in/yourname' },
              { icon: '🐙', label: 'GitHub', value: '/yourhandle' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="card text-center">
                <span className="text-2xl mb-2 block">{icon}</span>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-sm text-gray-300 font-mono truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
