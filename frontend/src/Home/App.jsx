import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileCheck, UserSearch, TrendingUp, FileDown, ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react'

import logoBpa from '../Assets/logo-bpa.png'
import telaD from '../Assets/telaD.png' 
import telaP from '../Assets/telaP.png'
import telaA from '../Assets/telaA.png'
import telaR from '../Assets/telaR.png'

import './App.css'

const slides = [
  {
    icon: <FileDown size={44} className="slide-icon-svg" />,
    image: telaR, // Imagem da tela de Relatórios
    title: 'Relatórios BPA',
    subtitle: 'Exportação simples e padronizada',
    infoTitle: 'Relatórios prontos para envio',
    infoDesc: 'Gere arquivos BPA-C e BPA-I no padrão exigido e exporte por período com poucos cliques, garantindo conformidade.',
    bgClass: 'slide-bg-relatorios',
  },
  {
    icon: <FileCheck size={44} className="slide-icon-svg" />,
    image: telaA, // Imagem da tela de Atendimentos
    title: 'Atendimentos',
    subtitle: 'Registro rápido, seguro e organizado',
    infoTitle: 'Registro de atendimentos sem fricção',
    infoDesc: 'Cadastre procedimentos, pacientes e profissionais em poucos cliques, com validações automáticas que evitam retrabalho.',
    bgClass: 'slide-bg-atendimentos',
  },
  {
    icon: <Stethoscope size={44} className="slide-icon-svg" />,
    image: telaD, // Imagem do Dashboard/Sistema
    title: 'Sistema BPA',
    subtitle: 'Gestão odontológica completa para CEO',
    infoTitle: 'Plataforma completa para CEO',
    infoDesc: 'Centralize a operação do Centro de Especialidades Odontológicas em um único sistema, com fluxos pensados para a rotina da equipe.',
    bgClass: 'slide-bg-sistema',
  },
  {
    icon: <TrendingUp size={44} className="slide-icon-svg" />,
    image: telaP, // Imagem de Eficiência/Pacientes
    title: 'Eficiência',
    subtitle: 'Mais agilidade no dia a dia da equipe',
    infoTitle: 'Eficiência operacional',
    infoDesc: 'Filtros inteligentes, classificações automáticas e atalhos pensados para reduzir o tempo gasto em tarefas repetitivas.',
    bgClass: 'slide-bg-eficiencia',
  }
];

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
    desc: 'Gere relatórios por período e faça o download dos dados de maneira simples, garantindo organization e agilidade nas informações.'
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      triggerSlideChange((currentSlide === slides.length - 1) ? 0 : currentSlide + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, animating]);

  const triggerSlideChange = (nextIndex) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide(nextIndex);
      setAnimating(false);
    }, 300);
  };

  const nextSlide = () => {
    if (animating) return;
    triggerSlideChange(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    if (animating) return;
    triggerSlideChange(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <div className="home-screen-wrapper">
      
      {/* BARRA DE NAVEGAÇÃO */}
      <nav className="navbar-top">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={logoBpa} alt="BPA Logo Navbar" className="nav-logo-img" />
          </div>
          <div className="navbar-actions">
            <Link to="/login" className="nav-btn nav-btn-login">Login</Link>
            <Link to="/cadastro" className="nav-btn nav-btn-cadastro">Cadastro</Link>
          </div>
        </div>
      </nav>

      <div className="navbar-spacer"></div>

      {/* SEGUNDA LOGO */}
      <div className="top-logo-area">
        <img src={logoBpa} alt="BPA Logo Main" className="logo-bpa-img" />
      </div>

      {/* CONTAINER DO CARROSSEL */}
      <div className="center-home-container">
        
        <div className={`carousel-main-box ${slides[currentSlide].bgClass}`}>
          <button className="carousel-nav-btn btn-prev" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          
          <div className={`carousel-display-content ${animating ? 'slide-exit' : 'slide-enter'}`}>
            <div className="slide-split-layout">
              
              {/* Lado Esquerdo: Textos e Ícones */}
              <div className="slide-text-side">
                <div className="slide-icon-wrapper">
                  {slides[currentSlide].icon}
                </div>
                <h2>{slides[currentSlide].title}</h2>
                <p>{slides[currentSlide].subtitle}</p>
              </div>

              {/* Lado Direito: Preview da Imagem com Moldura Glass */}
              {slides[currentSlide].image && (
                <div className="slide-image-side">
                  <div className="window-mockup-frame">
                    <div className="window-mockup-header">
                      <span className="mockup-dot red"></span>
                      <span className="mockup-dot yellow"></span>
                      <span className="mockup-dot green"></span>
                    </div>
                    <img 
                      src={slides[currentSlide].image} 
                      alt={slides[currentSlide].title} 
                      className="slide-imported-image" 
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          <button className="carousel-nav-btn btn-next" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>

          <div className="carousel-dots">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => !animating && triggerSlideChange(idx)}
              />
            ))}
          </div>
        </div>

        {/* TEXTO ACOPLADO DO CARROSSEL */}
        <div className="carousel-bottom-info-card">
          <div className={`info-content-wrapper ${animating ? 'slide-exit' : 'slide-enter'}`}>
            <h4>{slides[currentSlide].infoTitle}</h4>
            <p>{slides[currentSlide].infoDesc}</p>
          </div>
        </div>

      </div>

      {/* CARD DE VIDRO INFORMATIVO INFERIOR */}
      <div className="main-glass-card">
        
        <div className="home-features-grid">
          {features.map((feature, index) => (
            <div className="home-feature-item" key={index}>
              <div className="home-icon-circle">
                {feature.icon}
              </div>
              <div className="home-feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="home-action-buttons">
          <Link to="/login" className="home-btn">Login</Link>
          <Link to="/cadastro" className="home-btn">Cadastro</Link>
        </div>

      </div>

    </div>
  )
}

export default App;