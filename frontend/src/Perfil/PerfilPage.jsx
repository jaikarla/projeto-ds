import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePerfil } from './usePerfil';
import { UserRoundPen, LogOut, Trash2, KeyRound } from 'lucide-react';
import './Perfil.css';

function PerfilPage() {
    const navigate = useNavigate();
    const [senhaModalAberto, setSenhaModalAberto] = useState(false);
    const [senhaData, setSenhaData] = useState({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
    const [senhaErro, setSenhaErro] = useState('');

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

    const submeterNovaSenha = async (e) => {
        e.preventDefault();
        if (!senhaData.senhaAtual || !senhaData.novaSenha || !senhaData.confirmarSenha) {
        setSenhaErro('Todos os campos são obrigatórios.');
        return;
        }
        if (senhaData.novaSenha !== senhaData.confirmarSenha) {
        setSenhaErro('A nova senha e a confirmação não conferem.');
        return;
        }
        
        const sucesso = await handleAlterarSenha(senhaData);
        if (sucesso) {
        setSenhaData({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
        setSenhaErro('');
        setSenhaModalAberto(false);
        } else {
        setSenhaErro('Erro ao atualizar a senha no servidor.');
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

          <div className="form-section-divisor" style={{ margin: '10px 0 10px 0' }}>
            <h3 className="section-title">Endereço (Opcional)</h3>
          </div>

          <div className="form-grid-3">
            <div>
              <label>CEP</label>
              <input 
                type="text" 
                maxLength="9"
                value={formData.cep || ''}
                onChange={(e) => handleChange('cep', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'input-disabled' : ''}
                placeholder="00000-000"
              />
            </div>

            <div>
              <label>Número</label>
              <input 
                type="text" 
                value={formData.numero || ''}
                onChange={(e) => handleChange('numero', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'input-disabled' : ''}
                placeholder="Nº"
              />
            </div>

            <div>
              <label>Complemento</label>
              <input 
                type="text" 
                value={formData.complemento || ''}
                onChange={(e) => handleChange('complemento', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'input-disabled' : ''}
                placeholder="Apto, Bloco, etc."
              />
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
            <button type="button" className="btn-cancelar btn-logout" onClick={() => setSenhaModalAberto(true)}>
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
              <button type="button" className="paciente-modal-close" onClick={() => { setSenhaModalAberto(false); setSenhaErro(''); }}>&times;</button>
            </div>
            <form onSubmit={submeterNovaSenha} className="paciente-modal-form" style={{ padding: '10px 30px 30px' }}>
              <div>
                <label>Senha atual</label>
                <input 
                  type="password" 
                  value={senhaData.senhaAtual} 
                  onChange={e => setSenhaData(p => ({ ...p, senhaAtual: e.target.value }))}
                />
              </div>
              <div>
                <label>Nova senha</label>
                <input 
                  type="password" 
                  value={senhaData.novaSenha} 
                  onChange={e => setSenhaData(p => ({ ...p, novaSenha: e.target.value }))}
                />
              </div>
              <div>
                <label>Confirmar nova senha</label>
                <input 
                  type="password" 
                  value={senhaData.confirmarSenha} 
                  onChange={e => setSenhaData(p => ({ ...p, confirmarSenha: e.target.value }))}
                />
              </div>
              
              {senhaErro && <span className="field-error" style={{ display: 'block', marginTop: '10px' }}>{senhaErro}</span>}

              <div className="paciente-modal-footer" style={{ marginTop: '20px', padding: 0 }}>
                <button type="button" className="btn-cancelar" onClick={() => { setSenhaModalAberto(false); setSenhaErro(''); }}>
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