import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/',         label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-mono font-semibold text-primary-400 hover:text-primary-300 transition-colors">
          {'<Portfolio />'}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors
                 ${isActive ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-400 hover:text-white">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950 px-6 py-4 space-y-1">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800">
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
