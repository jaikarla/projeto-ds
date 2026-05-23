// src/App.jsx
import { FileCheck, UserSearch, TrendingUp, FileDown } from 'lucide-react'
import logoBpa from './Assents/logo-bpa.png'
import './App.css'

// Conteúdo do card
const features = [
  { 
    icon: <FileCheck size={26} strokeWidth={2} />, 
    title: 'Registro de Atendimentos', 
    desc: 'Registre procedimentos, dados do paciente e do profissional de forma rápida e segura, garantindo a identificação correta de cada atendimento.' 
  },
  { 
    icon: <UserSearch size={26} strokeWidth={2} />, 
    title: 'Automação e Confiabilidade', 
    desc: 'O sistema classifica automaticamente os procedimentos e realiza cálculos como idade do paciente, reduzindo erros e aumentando a precisão.' 
  },
  { 
    icon: <TrendingUp size={26} strokeWidth={2} />, 
    title: 'Gestão e Eficiência', 
    desc: 'Encontre e acompanhe informações com filtros e seleções inteligentes, otimizando o tempo e facilitando o trabalho da equipe.' 
  },
  { 
    icon: <FileDown size={26} strokeWidth={2} />, 
    title: 'Relatórios e Prestação de Contas', 
    desc: 'Gere relatórios por período e faça o download dos dados de maneira simples, garantindo organização e agilidade nas informações.' 
  }
];

//logo
function App() {
  return (
    <div className="home-screen-wrapper">
      
      {/* 1. LOGO BPA */}
      <div className="top-logo-area">
        <img src={logoBpa} alt="BPA Logo" className="logo-bpa-img" />
      </div>

      {/* 2. CARD DE VIDRO */}
      <div className="main-glass-card">
        
        {/* Grade de Funcionalidades */}
        <div className="home-features-grid">
          {features.map((feature, index) => (
            <div className="home-feature-item" key={index}>
              <div className="home-icon-circle">
                {/* Aqui renderiza o ícone do Lucide diretamente */}
                {feature.icon}
              </div>
              <div className="home-feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. BOTÕES INFERIORES */}
        <div className="home-action-buttons">
          <button className="home-btn home-btn-login">Login</button>
          <button className="home-btn home-btn-cadastro">Cadastro</button>
        </div>

      </div>
    </div>
  )
}

export default App