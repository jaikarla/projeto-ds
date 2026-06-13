import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePerfil } from './usePerfil';
import { UserRoundPen, LogOut, Trash2, Check } from 'lucide-react';
import './Perfil.css';

function PerfilPage() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownAberto, setDropdownAberto] = useState(false);

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
    handleConfirmarExclusao
  } = usePerfil(limparSessaoEDeslogar);

  const ufs = [
    "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", 
    "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"
  ];

  // Fecha o dropdown de UF se clicar fora dele
  useEffect(() => {
    function clicarFora(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAberto(false);
      }
    }
    document.addEventListener("mousedown", clicarFora);
    return () => document.removeEventListener("mousedown", clicarFora);
  }, []);

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

          <div className="form-grid-3">
            <div>
              <label>Cargo / Função</label>
              <input 
                type="text" 
                value={formData.cargo || ''}
                onChange={(e) => handleChange('cargo', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'input-disabled' : ''}
                placeholder="Ex.: Faturista"
              />
            </div>

            <div>
              <label>CPF</label>
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
              <label>Registro profissional</label>
              <input 
                type="text" 
                value={formData.registro || ''}
                onChange={(e) => handleChange('registro', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'input-disabled' : ''}
                aria-invalid={errors.registro ? "true" : "false"}
              />
              {errors.registro && <span className="field-error">{errors.registro}</span>}
            </div>
          </div>

          <div className="form-grid-3">
            <div ref={dropdownRef} className="custom-uf-wrapper">
              <label>UF do conselho</label>
              <div 
                className={`custom-uf-select ${dropdownAberto ? 'ativo' : ''} ${!isEditing ? 'input-disabled' : ''}`}
                onClick={() => { if (isEditing) setDropdownAberto(!dropdownAberto); }}
                aria-invalid={errors.uf ? "true" : "false"}
              >
                {formData.uf || '--'}
              </div>
              
              {dropdownAberto && isEditing && (
                <div className="custom-uf-options" style={{ bottom: 'auto', top: '100%' }}>
                  <div className="custom-uf-option" onClick={() => { handleChange('uf', ''); setDropdownAberto(false); }}>--</div>
                  {ufs.map(uf => (
                    <div 
                      key={uf} 
                      className={`custom-uf-option ${formData.uf === uf ? 'selecionado' : ''}`}
                      onClick={() => {
                        handleChange('uf', uf);
                        setDropdownAberto(false);
                      }}
                    >
                      {uf}
                    </div>
                  ))}
                </div>
              )}
              {errors.uf && <span className="field-error">{errors.uf}</span>}
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

      {/* CARD DE SEGURANÇA DA CONTA */}
      <div className="pacientes-table-wrapper" style={{ padding: '30px', marginTop: '24px' }}>
        <div className="form-section-divisor" style={{ margin: '0 0 20px 0' }}>
          <h3 className="section-title">Segurança da conta</h3>
          <p className="section-subtitle">Sair da sessão ativa ou remover seu acesso ao sistema</p>
        </div>

        <div className="seguranca-row">
          <div className="sessao-info">
            <span className="sessao-titulo">Sessão atual</span>
            <span className="sessao-email">{formData.email || 'raianalaispd@gmail.com'}</span>
          </div>

          <div className="seguranca-actions">
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