import { ufs } from '../professionalConstants'

export function ProfessionalModal({
  editingProfessionalId,
  errorMessage,
  fieldErrors,
  form,
  isSubmitting,
  onClose,
  onInputChange,
  onSubmit,
}) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section
        aria-labelledby="professional-modal-title"
        className="professional-modal"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <h2 id="professional-modal-title">
            {editingProfessionalId ? 'Editar Profissional' : 'Novo Profissional'}
          </h2>
          <button aria-label="Fechar cadastro" className="close-button" type="button" onClick={onClose}>
            x
          </button>
        </div>

        <form className="professional-form" onSubmit={onSubmit}>
          {errorMessage && (
            <p className="feedback-message" role="alert">
              {errorMessage}
            </p>
          )}

          <label>
            <span>Nome Completo *</span>
            <input
              autoFocus
              aria-invalid={Boolean(fieldErrors.nome)}
              name="nome"
              type="text"
              value={form.nome}
              onChange={onInputChange}
            />
            {fieldErrors.nome && <span className="field-error">{fieldErrors.nome}</span>}
          </label>

          <label>
            <span>CPF *</span>
            <input
              aria-invalid={Boolean(fieldErrors.cpf)}
              name="cpf"
              placeholder="000.000.000-00"
              type="text"
              value={form.cpf}
              onChange={onInputChange}
            />
            {fieldErrors.cpf && <span className="field-error">{fieldErrors.cpf}</span>}
          </label>

          <label>
            <span>Tipo *</span>
            <select name="tipo" value={form.tipo} onChange={onInputChange}>
              <option value="profissional">Profissional</option>
              <option value="estudante">Estudante</option>
            </select>
          </label>

          {form.tipo === 'estudante' && (
            <label>
              <span>Matrícula *</span>
              <input
                aria-invalid={Boolean(fieldErrors.matricula)}
                name="matricula"
                placeholder="Digite a matrícula..."
                type="text"
                value={form.matricula}
                onChange={onInputChange}
              />
              {fieldErrors.matricula && <span className="field-error">{fieldErrors.matricula}</span>}
            </label>
          )}

          {form.tipo === 'profissional' && (
            <>
              <label>
                <span>Registro Profissional *</span>
                <input
                  aria-invalid={Boolean(fieldErrors.registro)}
                  name="registro"
                  placeholder="Ex: CRO-12345"
                  type="text"
                  value={form.registro}
                  onChange={onInputChange}
                />
                {fieldErrors.registro && <span className="field-error">{fieldErrors.registro}</span>}
              </label>

              <div className="form-grid">
                <label>
                  <span>UF do Conselho *</span>
                  <select
                    aria-invalid={Boolean(fieldErrors.uf)}
                    name="uf"
                    value={form.uf}
                    onChange={onInputChange}
                  >
                    <option value="">UF</option>
                    {ufs.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.uf && <span className="field-error">{fieldErrors.uf}</span>}
                </label>

                <label>
                  <span>CBO - Ocupação Profissional *</span>
                  <input
                    aria-invalid={Boolean(fieldErrors.cbo)}
                    name="cbo"
                    placeholder="Digite o codigo ou nome..."
                    type="text"
                    value={form.cbo}
                    onChange={onInputChange}
                  />
                  {fieldErrors.cbo && <span className="field-error">{fieldErrors.cbo}</span>}
                </label>
              </div>
            </>
          )}

          <label>
            <span>CNS do Profissional *</span>
            <input
              aria-invalid={Boolean(fieldErrors.cns)}
              name="cns"
              placeholder="000000000000000"
              type="text"
              value={form.cns}
              onChange={onInputChange}
            />
            {fieldErrors.cns && <span className="field-error">{fieldErrors.cns}</span>}
          </label>

          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : editingProfessionalId ? 'Salvar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}