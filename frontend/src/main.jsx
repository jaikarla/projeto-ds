import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import App from './Home/App.jsx'
import Cadastro from './Cadastro/Cadastro.jsx'
import Login from './Login/Login.jsx' 
import RecuperarSenha from './Login/RecuperarSenha/RecuperarSenha.jsx';
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
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)