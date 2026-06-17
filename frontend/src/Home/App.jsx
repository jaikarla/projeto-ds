import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileCheck, UserSearch, TrendingUp, FileDown, ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react'
import logoBpa from '../Assets/logo-bpa.png'
import './App.css'

/* IMPORTAR AS FOTOS FUTURAMENTE:
import fotoRelatorios from '../Assets/print-relatorios.png'
import fotoAtendimentos from '../Assets/print-atendimentos.png'
import fotoSistema from '../Assets/print-sistema.png'
import fotoEficiencia from '../Assets/print-eficiencia.png'
*/

// Dados dos Recursos do Sistema (Coluna Direita)
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

// Dados do Carrossel Dinâmico (Coluna Esquerda)
const slides = [
  {
    icon: <FileDown size={40} className="slide-icon-svg" />,
    title: 'Relatórios BPA',
    subtitle: 'Exportação simples e padronizada',
    infoTitle: 'Relatórios prontos para envio',
    infoDesc: 'Gere arquivos BPA-C e BPA-I no padrão exigido e exporte por período com poucos cliques, garantindo conformidade.',
    bgClass: 'slide-bg-relatorios',
    // image: fotoRelatorios // Quando colocar as imagens, descomentar essa linha
  },
  {
    icon: <FileCheck size={40} className="slide-icon-svg" />,
    title: 'Atendimentos',
    subtitle: 'Registro rápido, seguro e organizado',
    infoTitle: 'Registro de atendimentos sem fricção',
    infoDesc: 'Cadastre procedimentos, pacientes e profissionais em poucos cliques, com validações automáticas que evitam retrabalho.',
    bgClass: 'slide-bg-atendimentos',
    // image: fotoAtendimentos
  },
  {
    icon: <Stethoscope size={40} className="slide-icon-svg" />,
    title: 'Sistema BPA',
    subtitle: 'Gestão odontológica completa para CEO',
    infoTitle: 'Plataforma completa para CEO',
    infoDesc: 'Centralize a operação do Centro de Especialidades Odontológicas em um único sistema, com fluxos pensados para a rotina da equipe.',
    bgClass: 'slide-bg-sistema',
    // image: fotoSistema
  },
  {
    icon: <TrendingUp size={40} className="slide-icon-svg" />,
    title: 'Eficiência',
    subtitle: 'Mais agilidade no dia a dia da equipe',
    infoTitle: 'Eficiência operacional',
    infoDesc: 'Filtros inteligentes, classifications automáticas e atalhos pensados para reduzir o tempo gasto em tarefas repetitivas.',
    bgClass: 'slide-bg-eficiencia',
    // image: fotoEficiencia
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
  }, [currentSlide]);

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
      
      {/* 1. LOGO BPA */}
      <div className="top-logo-area">
        <img src={logoBpa} alt="BPA Logo" className="logo-bpa-img" />
      </div>

      {/* 2. CONTAINER DUAS COLUNAS */}
      <div className="split-home-container">
        
        {/* COLUNA DA ESQUERDA: CARROSSEL */}
        <div className="home-left-card">
          <div className={`carousel-image-box ${slides[currentSlide].bgClass}`}>
            
            <button className="carousel-nav-btn btn-prev" onClick={prevSlide}>
              <ChevronLeft size={20} />
            </button>
            
            {/* Elemento com classe de animação */}
            <div className={`carousel-display-content ${animating ? 'slide-exit' : 'slide-enter'}`}>
              
              {/* RENDERIZADOR INTELIGENTE (Se tiver imagem usa a tag img, senão usa o esqueleto de ícones) */}
              {slides[currentSlide].image ? (
                <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="slide-imported-image" />
              ) : (
                <>
                  <div className="slide-icon-wrapper">
                    {slides[currentSlide].icon}
                  </div>
                  <h2>{slides[currentSlide].title}</h2>
                  <p>{slides[currentSlide].subtitle}</p>
                </>
              )}
              
            </div>

            <button className="carousel-nav-btn btn-next" onClick={nextSlide}>
              <ChevronRight size={20} />
            </button>

            {/* DOTS INDICADORES */}
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

          {/* BOX INFERIOR COM INFORMAÇÕES */}
          <div className="carousel-info-box">
            <div className={`info-box-transition ${animating ? 'slide-exit' : 'slide-enter'}`}>
              <h4>{slides[currentSlide].infoTitle}</h4>
              <p>{slides[currentSlide].infoDesc}</p>
            </div>
          </div>
        </div>

        {/* COLUNA DA DIREITA: CONTEÚDO E BOTÕES  */}
        <div className="home-right-card">
          <div className="right-card-vertical-center">
            
            {/* Grade de Funcionalidades */}
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

            {/* BOTÕES DE LOGIN / CADASTRO */}
            <div className="home-action-buttons">
              <Link to="/login" className="home-btn home-btn-login">
                Login
              </Link>
              <Link to="/cadastro" className="home-btn home-btn-cadastro">
                Cadastro
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default App