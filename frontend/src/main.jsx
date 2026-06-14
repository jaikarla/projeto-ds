import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import App from './Home/App.jsx'
import Cadastro from './Cadastro/Cadastro.jsx'
import Login from './Login/Login.jsx' 
import RecuperarSenha from './Login/RecuperarSenha/RecuperarSenha.jsx';
import AppLayout from './Layout/AppLayout.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import Atendimentos from './Atendimentos/Atendimentos.jsx'
import PacientesPage from './Pacientes/PacientesPage.jsx';
import Profissionais from './Profissionais/Profissionais.jsx'
import Procedimentos from './Procedimentos/Procedimentos.jsx'
import Relatorios from "./Relatorios/RelatoriosPage.jsx";
import PerfilPage from './Perfil/PerfilPage.jsx'
import './Global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rota da página Home */}
        <Route path="/" element={<App />} />
        
        {/* Rota da página de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rota da página de Cadastro*/}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rota da página de Recuperação de Senha */}
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />

        {/* Rotas do restante do sistema */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profissionais" element={<Profissionais />} />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/atendimentos" element={<Atendimentos />} />
          <Route path="/procedimentos" element={<Procedimentos />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/perfil" element={<PerfilPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
