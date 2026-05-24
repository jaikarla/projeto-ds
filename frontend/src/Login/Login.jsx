//jsx Login
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileCheck, TrendingUp, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import logoBpa from '../Assents/logo-bpa.png'
import './Login.css'

const SESSION_STORAGE_KEY = 'bpaAuthSession'

// Resumo do site (Apenas os dois itens que aparecem na imagem da esquerda)
const summaryFeatures = [
  { 
    icon: <FileCheck size={26} strokeWidth={2} />, 
    title: 'Registro de Atendimentos', 
    desc: 'Registre procedimentos, dados do paciente e do profissional de forma rápida e segura, garantindo a identificação correta de cada atendimento.' 
  },
  { 
    icon: <TrendingUp size={26} strokeWidth={2} />, 
    title: 'Gestão e Eficiência', 
    desc: 'Encontre e acompanhe informações com filtros e seleções inteligentes, otimizando o tempo e facilitando o trabalho da equipe.' 
  }
];

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const authSession = {
      email,
      nome: email.split('@')[0] || 'Usuario BPA',
      autenticacao: 'mock',
      loggedAt: new Date().toISOString(),
    }

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authSession))

    navigate('/dashboard')
  };

  return (
    <div className="login-screen-wrapper">
      
        {/* BOTÃO VOLTAR */}
        <Link to="/" className="login-back-button">
        <ArrowLeft size={24} />
        </Link>

        <div className="login-container-layout">
            
            {/* COLUNA DA ESQUERDA: RESUMO DO SITE */}
            <div className="login-left-column">
            <div className="login-logo-area">
                <img src={logoBpa} alt="BPA Logo" className="logo-bpa-img" />
            </div>

            <div className="login-summary-list">
                {summaryFeatures.map((feature, index) => (
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
            </div>

            {/* COLUNA DA DIREITA: CARD DO FORMULÁRIO */}
            <div className="login-right-column">
            <div className="login-glass-card">
                <h2>Login</h2>

                <form onSubmit={handleSubmit} className="login-form">
                
                {/* CAMPO EMAIL */}
                <div className="login-input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>

                {/* CAMPO SENHA */}
                <div className="login-input-group">
                    <label htmlFor="senha">Senha</label>
                    <div className="login-password-wrapper">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <button 
                        type="button" 
                        className="login-toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    </div>
                </div>

                {/* RECUPERAR SENHA */}
                <div className="login-forgot-password-area">
                    <a href="#recuperar" className="login-link">Recuperar Senha</a>
                </div>

                {/* BOTÃO LOGIN */}
                <div className="login-submit-area">
                    <button type="submit" className="home-btn login-btn-submit">Login</button>
                </div>
                </form>

                {/* FOOTER DO CARD */}
                <div className="login-card-footer">
                <span>Não tem conta? </span>
                <a href="#cadastro" className="login-link font-bold">Criar conta</a>
                </div>

            </div>
            </div>

        </div>
    </div>
  );
}

export default Login;
