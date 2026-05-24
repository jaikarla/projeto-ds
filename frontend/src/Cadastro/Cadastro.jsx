import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserSearch, FileDown, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import logoBpa from '../Assets/logo-bpa.png'
import './Cadastro.css'

// Resumo do site 
const summaryFeatures = [
  { 
    icon: <UserSearch size={26} strokeWidth={2} />, 
    title: 'Automação e Confiabilidade', 
    desc: 'O sistema classifica automaticamente os procedimentos e realiza cálculos como idade do paciente, reduzindo erros e aumentando a precisão.' 
  },
  { 
    icon: <FileDown size={26} strokeWidth={2} />, 
    title: 'Relatórios e Prestação de Contas', 
    desc: 'Gere relatórios por período e faça o download dos dados de maneira simples, garantindo organização e agilidade nas informações.' 
  }
];

export default function Cadastro() {
  const [showSenha, setShowSenha] = useState(false)
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [cep, setCep] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')

  // Lógica de validação dos requisitos em tempo real
  const regras = {
    minCaracteres: senha.length >= 6,
    temMaiuscula: /[A-Z]/.test(senha),
    temMinuscula: /[a-z]/.test(senha),
    temSimbolo: /[^A-Za-z0-9]/.test(senha)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dados do cadastro:', { nome, email, cpf, telefone, senha, cep, numero, complemento })
  }

  return (
    <div className="cadastro-container">
      
      {/* BOTÃO VOLTAR */}
      <Link to="/" className="cadastro-back-button">
        <ArrowLeft size={24} />
      </Link>

      <div className="cadastro-container-layout">
          
        {/* COLUNA DA ESQUERDA: RESUMO DO SITE */}
        <div className="cadastro-left-side">
          <div className="cadastro-logo-area">
            <img src={logoBpa} alt="BPA Logo" className="cadastro-logo-img" />
          </div>

          <div className="cadastro-summary-list">
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

        {/* COLUNA DA DIREITA: CARD DO FORMULÁRIO COM SCROLL */}
        <div className="cadastro-right-side">
          <div className="cadastro-box">
            <h2 className="cadastro-box-title">Cadastre-se</h2>
              
            {/* FORMULÁRIO COM CONTROLE DE ROLAGEM INTERNA */}
            <form onSubmit={handleSubmit} className="cadastro-form-scrollable">
              
              <div className="cadastro-input-group">
                <label>Nome Completo *</label>
                <input 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  required 
                />
              </div>

              <div className="cadastro-input-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="cadastro-row">
                <div className="cadastro-input-group">
                  <label>CPF *</label>
                  <input 
                    type="text" 
                    placeholder="000.000.000-00" 
                    value={cpf} 
                    onChange={(e) => setCpf(e.target.value)} 
                    required 
                  />
                </div>
                <div className="cadastro-input-group">
                  <label>Telefone *</label>
                  <input 
                    type="text" 
                    placeholder="(00) 00000-0000" 
                    value={telefone} 
                    onChange={(e) => setTelefone(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="cadastro-input-group">
                <label>Senha *</label>
                <div className="cadastro-password-wrapper">
                  <input 
                    type={showSenha ? "text" : "password"} 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="cadastro-toggle-eye"
                    onClick={() => setShowSenha(!showSenha)}
                  >
                    {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* REQUISITOS DA SENHA DINÂMICOS */}
              <ul className="cadastro-password-requirements">
                <li className={regras.minCaracteres ? 'valido' : 'invalido'}>
                  {regras.minCaracteres ? '✓' : '✕'} Mínimo de 6 caracteres
                </li>
                <li className={regras.temMaiuscula ? 'valido' : 'invalido'}>
                  {regras.temMaiuscula ? '✓' : '✕'} Pelo menos 1 letra maiúscula
                </li>
                <li className={regras.temMinuscula ? 'valido' : 'invalido'}>
                  {regras.temMinuscula ? '✓' : '✕'} Pelo menos 1 letra minúscula
                </li>
                <li className={regras.temSimbolo ? 'valido' : 'invalido'}>
                  {regras.temSimbolo ? '✓' : '✕'} Pelo menos 1 símbolo
                </li>
              </ul>

              <div className="cadastro-input-group">
                <label>Confirma Senha *</label>
                <input 
                  type="password" 
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required 
                />
              </div>

              {/* SEÇÃO ENDEREÇO */}
              <div className="cadastro-address-section">
                <h4 className="cadastro-address-title">Endereço (Opcional)</h4>
                <div className="cadastro-address-row">
                  <div className="cadastro-input-group field-cep">
                    <label>CEP</label>
                    <input type="text" placeholder="00000-000" value={cep} onChange={(e) => setCep(e.target.value)} />
                  </div>
                  <div className="cadastro-input-group field-num">
                    <label>Número</label>
                    <input type="text" placeholder="Nº" value={numero} onChange={(e) => setNumero(e.target.value)} />
                  </div>
                  <div className="cadastro-input-group field-comp">
                    <label>Complemento</label>
                    <input type="text" placeholder="Bloco..." value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* ENVIAR CADASTRO */}
              <div className="cadastro-submit-area">
                <Link to="/login" style={{ width: '100%', maxWidth: '240px', display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                  <button type="button" className="cadastro-submit-btn">Cadastrar</button>
                </Link>
              </div>

              <div className="cadastro-card-footer">
                <span>Já tem conta? </span>
                <Link to="/login" className="cadastro-link font-bold">Entrar</Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}