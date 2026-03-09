import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          containerStyle={{ top: 80 }}
          toastOptions={{
            duration: 5000,
            style: { background: '#1f2937', color: '#f3f4f6', border: '1px solid #374151' },
            success: { iconTheme: { primary: '#7c6aff', secondary: '#fff' } },
            error: { duration: 5000 },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
