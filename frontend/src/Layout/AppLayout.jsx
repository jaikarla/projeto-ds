import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AppHeader from './AppHeader.jsx'
import Sidebar from './Sidebar.jsx'
import './AppLayout.css'

const SESSION_STORAGE_KEY = 'bpaAuthSession'

function getStoredSession() {
  const storedSession = localStorage.getItem(SESSION_STORAGE_KEY)

  if (!storedSession) {
    return null
  }

  try {
    return JSON.parse(storedSession)
  } catch {
    localStorage.removeItem(SESSION_STORAGE_KEY)
    return null
  }
}

function AppLayout() {
  const navigate = useNavigate()
  const [session] = useState(getStoredSession)

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!session) {
      navigate('/login')
    }
  }, [navigate, session])

  const handleLogout = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY)
    navigate('/login')
  }

  if (!session) {
    return null
  }

  return (
    <div className="app-layout">
      <Sidebar session={session} onLogout={handleLogout} />
      <main className="app-layout-main">
        <AppHeader />
        <section className="app-layout-content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default AppLayout
