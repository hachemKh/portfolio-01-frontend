import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Public pages
import Home          from './pages/public/Home'
import Projects      from './pages/public/Projects'
import ProjectDetail from './pages/public/ProjectDetail'
import Contact       from './pages/public/Contact'

// Admin pages
import Login         from './pages/admin/Login'
import Dashboard     from './pages/admin/Dashboard'
import ProjectsAdmin from './pages/admin/ProjectsAdmin'
import Messages      from './pages/admin/Messages'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"            element={<Home />} />
      <Route path="/projects"    element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/contact"     element={<Contact />} />
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin"           element={<Dashboard />} />
        <Route path="/admin/projects"  element={<ProjectsAdmin />} />
        <Route path="/admin/messages"  element={<Messages />} />
      </Route>
    </Routes>
  )
}
