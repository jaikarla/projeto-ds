import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../auth/authService.js';

export default function DefinirNovaSenha() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';
  const credencialRecuperacao = token || email;

  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!credencialRecuperacao) {
      setErro('Link de recuperação inválido. Solicite um novo e-mail de recuperação.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);

    try {
      await resetPassword({
        email,
        token,
        novaSenha: senha
      });

      setSucesso('Senha redefinida com sucesso! Redirecionando para o login...');
      
      // Aguarda 3 segundos para o usuário ler a mensagem e joga para o login
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      setErro(error.message || 'Erro ao redefinir a senha. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Redefinir Senha</h2>
        <p style={styles.subtitle}>
          Defina a nova credencial de acesso para a conta: <br />
          <strong>{email || 'Link de recuperação identificado'}</strong>
        </p>

        {erro && <div style={styles.errorAlert}>{erro}</div>}
        {sucesso && <div style={styles.successAlert}>{sucesso}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nova Senha</label>
            <input
              type="password"
              placeholder="Digite sua nova senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              disabled={carregando || !credencialRecuperacao}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirmar Nova Senha</label>
            <input
              type="password"
              placeholder="Repita a nova senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              disabled={carregando || !credencialRecuperacao}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={carregando || !credencialRecuperacao}
            style={{
              ...styles.button,
              backgroundColor: carregando || !credencialRecuperacao ? '#a5b4fc' : '#4f46e5'
            }}
          >
            {carregando ? 'Salvando...' : 'Atualizar Senha'}
          </button>
        </form>
      </div>
    </div>
  );
}


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    fontFamily: 'sans-serif',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    margin: '0 0 10px 0',
    color: '#111827',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    margin: '0 0 24px 0',
    color: '#6b7280',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    color: '#ffffff',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '10px',
  },
  errorAlert: {
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '15px',
    textAlign: 'center',
    border: '1px solid #fee2e2',
  },
  successAlert: {
    backgroundColor: '#f0fdf4',
    color: '#166534',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '15px',
    textAlign: 'center',
    border: '1px solid #dcfce7',
  }
};
