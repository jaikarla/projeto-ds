//RecuperarSenha.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { recoverPassword } from '../../auth/authService.js';
import logoBpa from '../../Assets/logo-bpa.png';
import './RecuperarSenha.css';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await recoverPassword(email);
      alert('Verifique seu e-mail. Enviamos as instruções de recuperação.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Erro ao enviar o link de recuperação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recuperar-screen-wrapper">
      
      {/* BOTÃO VOLTAR NO CANTO SUPERIOR ESQUERDO */}
      <Link to="/login" className="recuperar-back-button">
        <ArrowLeft size={24} />
      </Link>

      {/* CARD CENTRALIZADO */}
      <div className="recuperar-glass-card">
        
        {/* ÁREA DA LOGO */}
        <div className="recuperar-logo-area">
          <img src={logoBpa} alt="BPA Logo" className="recuperar-logo-img" />
        </div>

        <h2>Recuperar Senha</h2>

        <form onSubmit={handleSubmit} className="recuperar-form">
          
          {/* CAMPO EMAIL */}
          <div className="recuperar-input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* BOTÃO ENVIAR LINK */}
          <div className="recuperar-submit-area">
            <button type="submit" className="recuperar-btn-submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar link'}
            </button>
          </div>

          {error && <p className="recuperar-error-message">{error}</p>}
        </form>

        {/* FOOTER DO CARD */}
        <div className="recuperar-card-footer">
          <span>Lembrou a senha? </span>
          <Link to="/login" className="recuperar-link font-bold">
            Voltar ao login
          </Link>
        </div>

      </div>
    </div>
  );
}