import { NavLink } from 'react-router-dom'
import {
  ClipboardList,
  FileBarChart,
  LayoutDashboard,
  ListChecks,
  LogOut,
  UserPlus,
  Users,
  User,
} from 'lucide-react'
import logoBpa from '../Assets/logo-bpa.png'

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Profissionais', icon: Users, path: '/profissionais' },
  { label: 'Pacientes', icon: UserPlus, path: '/pacientes' },
  { label: 'Atendimentos', icon: ClipboardList, path: '/atendimentos' },
  { label: 'Procedimentos', icon: ListChecks, path: '/procedimentos' },
  { label: 'Relatórios', icon: FileBarChart, path: '/relatorios' },
]

function Sidebar({ session, onLogout }) {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-brand">
        <img src={logoBpa} alt="BPA Logo" />
        <div>
          <strong>BPA</strong>
          <span>Boletim Produção Ambulatorial</span>
        </div>
      </div>

      <nav className="app-sidebar-nav" aria-label="Menu principal">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              className={({ isActive }) => `app-sidebar-nav-item ${isActive ? 'active' : ''}`}
              key={item.label}
              to={item.path}
            >
              <Icon size={19} strokeWidth={1.9} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="app-sidebar-user-area">
        <span className="app-sidebar-user-email">{session?.email || 'usuario@bpa.com'}</span>
        
        <NavLink 
          to="/perfil" 
          className={({ isActive }) => `app-sidebar-nav-item ${isActive ? 'active' : ''}`}
        >
          <User size={19} strokeWidth={1.9} />
          <span>Perfil</span>
        </NavLink>

        <button 
          className="app-sidebar-nav-item" 
          type="button" 
          onClick={onLogout}
        >
          <LogOut size={19} strokeWidth={1.9} />
          <span>Sair</span>
        </button>
        
        <span className="app-sidebar-version">v1.0 - Sistema BPA</span>
      </div>
    </aside>
  )
}

export default Sidebar