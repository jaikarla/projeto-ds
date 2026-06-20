import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { recoverPassword } from '../../auth/authService.js';
import logoBpa from '../../Assets/logo-bpa.png';
import './RecuperarSenha.css';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await recoverPassword(email);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setError(err.message || 'Erro ao enviar o link de recuperacao.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recuperar-screen-wrapper">
      <Link to="/login" className="recuperar-back-button" aria-label="Voltar para o login">
        <ArrowLeft size={24} />
      </Link>

      <div className="recuperar-glass-card">
        <div className="recuperar-logo-area">
          <img src={logoBpa} alt="BPA Logo" className="recuperar-logo-img" />
        </div>

        <h2>Recuperar Senha</h2>

        <form onSubmit={handleSubmit} className="recuperar-form">
          <div className="recuperar-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSuccess(false);
              }}
              required
            />
          </div>

          <div className="recuperar-submit-area">
            <button type="submit" className="recuperar-btn-submit" disabled={loading}>
              {loading ? 'Enviando...' : success ? 'Reenviar e-mail' : 'Enviar link'}
            </button>
          </div>

          {success && (
            <p className="recuperar-success-message">
              Se o e-mail estiver cadastrado, enviamos um link de redefinicao. Verifique a caixa de entrada e a pasta de spam.
            </p>
          )}

          {error && <p className="recuperar-error-message">{error}</p>}
        </form>

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
