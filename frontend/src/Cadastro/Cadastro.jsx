import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { UserSearch, FileDown, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { register } from '../auth/authService.js'
import logoBpa from '../Assets/logo-bpa.png'
import './Cadastro.css'
import axios from 'axios'

const SESSION_STORAGE_KEY = 'bpaAuthSession'

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
  const navigate = useNavigate()
  const [erroApi, setErroApi] = useState('')
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const regras = {
    minCaracteres: senha.length >= 6,
    temMaiuscula: /[A-Z]/.test(senha),
    temMinuscula: /[a-z]/.test(senha),
    temSimbolo: /[^A-Za-z0-9]/.test(senha)
  }

  const handleSubmit = async (e) => {
    e.preventDefault() 
    setErroApi('') 

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem!')
      return
    }

    if (!regras.minCaracteres || !regras.temMaiuscula || !regras.temMinuscula || !regras.temSimbolo) {
      setError('A senha não cumpre todos os requisitos de segurança!')
      return
    }

    try {
      await axios.post('http://localhost:3000/api/auth/register', { 
        nome, 
        email, 
        cpf, 
        telefone, 
        senha, 
        cep, 
        numero, 
        complemento 
      })
      
      navigate('/login')

    } catch (error) {
      const mensagemErro = error.response?.data?.message || error.response?.data || error.message || "";
      const textoDoErro = typeof mensagemErro === 'object' ? JSON.stringify(mensagemErro) : String(mensagemErro);

      if (
        textoDoErro.includes("faturistas_cpf_key") || 
        textoDoErro.includes("duplicate key value violates unique constraint \"faturistas_cpf_key\"")
      ) {
        setErroApi("Este CPF já foi cadastrado.");
      } else if (
        textoDoErro.includes("faturistas_email_key") || 
        textoDoErro.includes("duplicate key value violates unique constraint \"faturistas_email_key\"")
      ) {
        setErroApi("Este e-mail já foi cadastrado.");
      } else if (
        textoDoErro.toLowerCase().includes("email inválido") || 
        textoDoErro.toLowerCase().includes("invalid email") ||
        textoDoErro.toLowerCase().includes("format")
      ) {
        setErroApi("O e-mail adicionado não é válido. Verifique o formato correto: seuemail@email.com");
      } else if (textoDoErro.includes("11 dígitos") || textoDoErro.includes("CPF inválido")) {
        setErroApi("CPF inválido. Deve conter 11 dígitos.");
      } else {

        if (!email.includes(".") || email.split("@")[1]?.length < 3) {
          setErroApi("O e-mail adicionado não é válido. Verifique o formato correto: seuemail@email.com");
        } else {
          setErroApi("Ocorreu um erro ao realizar o cadastro. Tente novamente.");
        }
      }
    }
  }

  return (
    <div className="cadastro-container">
      
      {/* BOTÃO VOLTAR */}
      <Link to="/" className="cadastro-back-button">
        <ArrowLeft size={24} />
      </Link>

      <div className="cadastro-container-layout">
          
        {/* COLUNA DA ESQUERDA */}
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

        {/* COLUNA DA DIREITA */}
        <div className="cadastro-right-side">
          <div className="cadastro-box">
            <h2 className="cadastro-box-title">Cadastre-se</h2>
              
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErroApi('');
                  }} 
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
                    onChange={(e) => {
                      setCpf(e.target.value);
                      setErroApi('');
                    }}
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
                    {/* LÓGICA CORRIGIDA: Olho aberto mostra a senha, olho fechado esconde */}
                    {showSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
            </div>

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

              <div className="cadastro-submit-area">
                <button type="submit" className="cadastro-submit-btn" disabled={loading}>
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </div>

              {erroApi && <p className="cadastro-error-message">{erroApi}</p>}
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