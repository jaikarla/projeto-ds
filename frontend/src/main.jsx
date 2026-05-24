import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Importa o sistema de rotas
import App from './Home/App.jsx'
import Login from './Login/Login.jsx' 
import './Global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rota da página Home */}
        <Route path="/" element={<App />} />
        
        {/* Rota da página de Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)