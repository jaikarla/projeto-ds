import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './Home/App.jsx'
import Login from './Login/Login.jsx' 
import Dashboard from './Dashboard/Dashboard.jsx'
import AppLayout from './Layout/AppLayout.jsx'
import Atendimentos from './Atendimentos/Atendimentos.jsx'
import Pacientes from './Pacientes/Pacientes.jsx'
import Profissionais from './Profissionais/Profissionais.jsx'
import Relatorios from './Relatorios/Relatorios.jsx'
import './Global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rota da página Home */}
        <Route path="/" element={<App />} />
        
        {/* Rota da página de Login */}
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profissionais" element={<Profissionais />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/atendimentos" element={<Atendimentos />} />
          <Route path="/relatorios" element={<Relatorios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
