import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePerfil } from './usePerfil';
import { UserRoundPen, LogOut, Trash2, KeyRound, Eye, EyeOff } from 'lucide-react';
import './Perfil.css';

const senhaInicial = { senhaAtual: '', novaSenha: '', confirmarSenha: '' };
const senhaVisivelInicial = { senhaAtual: false, novaSenha: false, confirmarSenha: false };

function PerfilPage() {
    const navigate = useNavigate();
    const [senhaModalAberto, setSenhaModalAberto] = useState(false);
    const [senhaData, setSenhaData] = useState(senhaInicial);
    const [senhaErros, setSenhaErros] = useState({});
    const [senhaVisivel, setSenhaVisivel] = useState(senhaVisivelInicial);

    const limparSessaoEDeslogar = () => {
        localStorage.removeItem('bpaAuthSession');
        navigate('/login');
    };

    const {
        formData,
        isEditing,
        showToast,
        showDeleteModal,
        errors,
        setShowDeleteModal,
        handleChange,
        handleEditar,
        handleCancelar,
        handleSalvar,
        handleConfirmarExclusao,
        handleAlterarSenha
    } = usePerfil(limparSessaoEDeslogar);

    const abrirModalSenha = () => {
        setSenhaData(senhaInicial);
        setSenhaErros({});
        setSenhaVisivel(senhaVisivelInicial);
        setSenhaModalAberto(true);
    };

    const fecharModalSenha = () => {
        setSenhaModalAberto(false);
        setSenhaErros({});
        setSenhaVisivel(senhaVisivelInicial);
    };

    const alterarCampoSenha = (campo, valor) => {
        setSenhaData(prev => ({ ...prev, [campo]: valor }));
        setSenhaErros(prev => {
            const novosErros = { ...prev };
            delete novosErros[campo];
            delete novosErros.geral;
            return novosErros;
        });
    };

    const alternarSenhaVisivel = (campo) => {
        setSenhaVisivel(prev => ({ ...prev, [campo]: !prev[campo] }));
    };

    const validarSenha = () => {
        const novosErros = {};

        if (!senhaData.senhaAtual.trim()) novosErros.senhaAtual = 'Informe a senha atual.';
        if (!senhaData.novaSenha.trim()) novosErros.novaSenha = 'Informe a nova senha.';
        if (!senhaData.confirmarSenha.trim()) novosErros.confirmarSenha = 'Confirme a nova senha.';

        if (senhaData.novaSenha && senhaData.confirmarSenha && senhaData.novaSenha !== senhaData.confirmarSenha) {
            novosErros.confirmarSenha = 'A nova senha e a confirmação não conferem.';
        }

        setSenhaErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const submeterNovaSenha = async (e) => {
        e.preventDefault();

        if (!validarSenha()) return;
        
        const resultado = await handleAlterarSenha(senhaData);
        if (resultado.sucesso) {
            setSenhaData(senhaInicial);
            setSenhaErros({});
            setSenhaModalAberto(false);
        } else {
            setSenhaErros({ geral: resultado.mensagem });
        }
    };

  return (
    <div className="pacientes-container">
        
      {showToast && (
        <div className="paciente-alert">
          Alterações salvas com sucesso!
        </div>
      )}

      {/* Cabeçalho Principal da Página */}
      <div className="pacientes-header">
        <div>
          <h1>Perfil</h1>
          <p>Gerencie seus dados e segurança da conta</p>
        </div>
        
        {!isEditing && (
          <button type="button" className="perfil-btn-edit-top" onClick={handleEditar}>
            <UserRoundPen size={14} style={{ marginRight: '6px' }} />
            Editar Perfil
          </button>
        )}
      </div>

      {/* Formulário Principal */}
      <div className="pacientes-table-wrapper" style={{ padding: '30px' }}>
        <form onSubmit={handleSalvar} className="paciente-modal-form" style={{ padding: 0 }} noValidate>
          
          <div className="form-section-divisor" style={{ margin: '0 0 10px 0' }}>
            <h3 className="section-title">Informações do usuário</h3>
          </div>

          {errors.geral && <span className="field-error" style={{ display: 'block', marginBottom: '12px' }}>{errors.geral}</span>}

          <div className="form-grid-2">
            <div>
              <label>Nome completo *</label>
              <input 
                type="text" 
                value={formData.nome || ''}
                onChange={(e) => handleChange('nome', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'input-disabled' : ''}
                aria-invalid={errors.nome ? "true" : "false"}
              />
              {errors.nome && <span className="field-error">{errors.nome}</span>}
            </div>

            <div>
              <label>E-mail</label>
              <input 
                type="email" 
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'input-disabled' : ''}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-grid-2">
            <div>
              <label>CPF *</label>
              <input 
                type="text" 
                maxLength="14"
                value={formData.cpf || ''}
                onChange={(e) => handleChange('cpf', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'input-disabled' : ''}
                placeholder="000.000.000-00"
                aria-invalid={errors.cpf ? "true" : "false"}
              />
              {errors.cpf && <span className="field-error">{errors.cpf}</span>}
            </div>

            <div>
              <label>Telefone *</label>
              <input 
                type="text" 
                maxLength="15"
                value={formData.telefone || ''}
                onChange={(e) => handleChange('telefone', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'input-disabled' : ''}
                placeholder="(00) 00000-0000"
                aria-invalid={errors.telefone ? "true" : "false"}
              />
              {errors.telefone && <span className="field-error">{errors.telefone}</span>}
            </div>
          </div>

          {isEditing && (
            <div className="paciente-modal-footer" style={{ borderTop: '1px solid #edf1f5', paddingTop: '20px', marginTop: '10px' }}>
              <button type="button" className="btn-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>
              <button type="submit" className="btn-salvar">
                Salvar alterações
              </button>
            </div>
          )}
        </form>
      </div>

      {/* CARD DE SEGURANÇA E ALTERAÇÃO DE SENHA */}
      <div className="pacientes-table-wrapper" style={{ padding: '30px', marginTop: '24px' }}>
        <div className="form-section-divisor" style={{ margin: '0 0 20px 0' }}>
          <h3 className="section-title">Segurança e Autenticação</h3>
          <p className="section-subtitle">Gerencie suas credenciais de acesso e segurança da conta</p>
        </div>

        <div className="seguranca-row">
          <div className="sessao-info">
            <span className="sessao-titulo">Sessão atual</span>
            <span className="sessao-email">{formData.email || 'raianalaispd@gmail.com'}</span>
          </div>

          <div className="seguranca-actions">
            <button type="button" className="btn-cancelar btn-logout" onClick={abrirModalSenha}>
              <KeyRound size={16} style={{ marginRight: '6px' }} />
              Alterar senha
            </button>

            <button type="button" className="btn-cancelar btn-logout" onClick={limparSessaoEDeslogar}>
              <LogOut size={16} strokeWidth={2.5} style={{ marginRight: '6px' }} />
              Sair da conta
            </button>

            <button type="button" className="btn-action-delete" onClick={() => setShowDeleteModal(true)}>
              <Trash2 size={16} strokeWidth={2.5} style={{ marginRight: '6px' }} />
              Excluir conta
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Mudança de Senha */}
      {senhaModalAberto && (
        <div className="paciente-modal-overlay">
          <div className="paciente-modal-box" style={{ width: '440px' }}>
            <div className="paciente-modal-header">
              <h2>Alterar Senha de Acesso</h2>
              <button type="button" className="paciente-modal-close" onClick={fecharModalSenha}>&times;</button>
            </div>
            <form onSubmit={submeterNovaSenha} className="paciente-modal-form" style={{ padding: '10px 30px 30px' }}>
              <div>
                <label>Senha atual</label>
                <div className="perfil-password-wrapper">
                  <input 
                    type={senhaVisivel.senhaAtual ? 'text' : 'password'} 
                    value={senhaData.senhaAtual} 
                    onChange={e => alterarCampoSenha('senhaAtual', e.target.value)}
                    aria-invalid={senhaErros.senhaAtual ? "true" : "false"}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="perfil-toggle-password"
                    onClick={() => alternarSenhaVisivel('senhaAtual')}
                    aria-label={senhaVisivel.senhaAtual ? 'Ocultar senha atual' : 'Mostrar senha atual'}
                  >
                    {senhaVisivel.senhaAtual ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {senhaErros.senhaAtual && <span className="field-error">{senhaErros.senhaAtual}</span>}
              </div>
              <div>
                <label>Nova senha</label>
                <div className="perfil-password-wrapper">
                  <input 
                    type={senhaVisivel.novaSenha ? 'text' : 'password'} 
                    value={senhaData.novaSenha} 
                    onChange={e => alterarCampoSenha('novaSenha', e.target.value)}
                    aria-invalid={senhaErros.novaSenha ? "true" : "false"}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="perfil-toggle-password"
                    onClick={() => alternarSenhaVisivel('novaSenha')}
                    aria-label={senhaVisivel.novaSenha ? 'Ocultar nova senha' : 'Mostrar nova senha'}
                  >
                    {senhaVisivel.novaSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {senhaErros.novaSenha && <span className="field-error">{senhaErros.novaSenha}</span>}
              </div>
              <div>
                <label>Confirmar nova senha</label>
                <div className="perfil-password-wrapper">
                  <input 
                    type={senhaVisivel.confirmarSenha ? 'text' : 'password'} 
                    value={senhaData.confirmarSenha} 
                    onChange={e => alterarCampoSenha('confirmarSenha', e.target.value)}
                    aria-invalid={senhaErros.confirmarSenha ? "true" : "false"}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="perfil-toggle-password"
                    onClick={() => alternarSenhaVisivel('confirmarSenha')}
                    aria-label={senhaVisivel.confirmarSenha ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'}
                  >
                    {senhaVisivel.confirmarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {senhaErros.confirmarSenha && <span className="field-error">{senhaErros.confirmarSenha}</span>}
              </div>
              
              {senhaErros.geral && <span className="perfil-password-error">{senhaErros.geral}</span>}

              <div className="paciente-modal-footer" style={{ marginTop: '20px', padding: 0 }}>
                <button type="button" className="btn-cancelar" onClick={fecharModalSenha}>
                  Cancelar
                </button>
                <button type="submit" className="btn-salvar">
                  Atualizar senha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de exclusão */}
      {showDeleteModal && (
        <div className="paciente-modal-overlay">
          <div className="paciente-modal-box" style={{ width: '480px' }}>
            <div className="paciente-modal-header">
              <h2 style={{ color: '#ff1f2d' }}>Excluir Conta Permanentemente?</h2>
              <button type="button" className="paciente-modal-close" onClick={() => setShowDeleteModal(false)}>&times;</button>
            </div>
            <div style={{ padding: '10px 30px 30px' }}>
              <p style={{ color: '#4f6072', fontSize: '15px', lineHeight: '1.5', margin: '0 0 24px 0' }}>
                Atenção: Esta ação é irreversível. Todos os seus dados de faturista serão removidos da base do BPA e você perderá o acesso imediatamente.
              </p>
              {errors.geral && <span className="field-error" style={{ display: 'block', marginBottom: '12px' }}>{errors.geral}</span>}
              <div className="paciente-modal-footer" style={{ padding: 0 }}>
                <button type="button" className="btn-cancelar" onClick={() => setShowDeleteModal(false)}>
                  Voltar atrás
                </button>
                <button type="button" className="btn-salvar" style={{ background: '#ff1f2d', boxShadow: 'none' }} onClick={handleConfirmarExclusao}>
                  Sim, excluir conta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilPage;
