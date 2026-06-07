import { X } from 'lucide-react'
import { procedimentoLabel } from '../atendimentosMappers'

export function AtendimentoModal({
  editingAtendimentoId,
  errorMessage,
  fieldErrors,
  filteredProcedimentos,
  form,
  isSubmitting,
  onClose,
  onInputChange,
  onSelectProcedimento,
  onSubmit,
  pacientes,
  profissionais,
  selectedProcedimento,
}) {
  const selectedLabel = selectedProcedimento ? procedimentoLabel(selectedProcedimento) : ''
  const shouldShowProcedimentos =
    form.procedimentoBusca &&
    filteredProcedimentos.length > 0 &&
    form.procedimentoBusca !== selectedLabel

  return (
    <div className="atendimento-modal-backdrop">
      <section className="atendimento-modal" role="dialog" aria-modal="true">
        <div className="atendimento-modal-header">
          <h2>{editingAtendimentoId ? 'Editar Atendimento' : 'Novo Atendimento'}</h2>
          <button
            aria-label="Fechar modal"
            className="atendimento-close-button"
            type="button"
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form className="atendimento-form" onSubmit={onSubmit}>
          {errorMessage && (
            <p className="atendimento-feedback" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="atendimento-form-grid">
            <label>
              Paciente {selectedProcedimento?.tipo === 'BPA-I' ? '*' : ''}
              <select
                aria-invalid={Boolean(fieldErrors.pacienteId)}
                name="pacienteId"
                value={form.pacienteId}
                onChange={onInputChange}
              >
                <option value="">Selecione</option>
                {pacientes.map((paciente) => (
                  <option value={paciente.id} key={paciente.id}>
                    {paciente.nome}
                  </option>
                ))}
              </select>
              {fieldErrors.pacienteId && (
                <span className="atendimento-field-error">{fieldErrors.pacienteId}</span>
              )}
            </label>

            <label>
              Profissional *
              <select
                aria-invalid={Boolean(fieldErrors.profissionalId)}
                name="profissionalId"
                value={form.profissionalId}
                onChange={onInputChange}
              >
                <option value="">Selecione</option>
                {profissionais.map((profissional) => (
                  <option value={profissional.id} key={profissional.id}>
                    {profissional.nome}
                  </option>
                ))}
              </select>
              {fieldErrors.profissionalId && (
                <span className="atendimento-field-error">{fieldErrors.profissionalId}</span>
              )}
            </label>
          </div>

          <label>
            Data do Atendimento *
            <input
              aria-invalid={Boolean(fieldErrors.dataAtendimento)}
              max={new Date().toISOString().slice(0, 10)}
              name="dataAtendimento"
              type="date"
              value={form.dataAtendimento}
              onChange={onInputChange}
            />
            {fieldErrors.dataAtendimento && (
              <span className="atendimento-field-error">{fieldErrors.dataAtendimento}</span>
            )}
          </label>

          <label className="atendimento-procedimento-field">
            Procedimentos SUS *
            <input
              aria-invalid={Boolean(fieldErrors.procedimentoBusca)}
              autoComplete="off"
              name="procedimentoBusca"
              placeholder="Buscar por codigo ou descricao..."
              type="search"
              value={form.procedimentoBusca}
              onChange={onInputChange}
            />
            {shouldShowProcedimentos && (
              <div className="atendimento-procedimento-options">
                {filteredProcedimentos.map((procedimento) => (
                  <button
                    type="button"
                    key={procedimento.codigo}
                    onClick={() => onSelectProcedimento(procedimento)}
                  >
                    <span>{procedimento.codigo}</span>
                    <strong>{procedimento.nome}</strong>
                    <mark>{procedimento.tipo}</mark>
                  </button>
                ))}
              </div>
            )}
            {fieldErrors.procedimentoBusca && (
              <span className="atendimento-field-error">
                {fieldErrors.procedimentoBusca}
              </span>
            )}
          </label>

          {selectedProcedimento && (
            <div className="atendimento-procedimento-summary">
              <span>{procedimentoLabel(selectedProcedimento)}</span>
              <mark>{selectedProcedimento.tipo}</mark>
            </div>
          )}

          <div className="atendimento-form-grid atendimento-form-grid--compact">
            <label>
              Quantidade *
              <input
                aria-invalid={Boolean(fieldErrors.quantidade)}
                min="1"
                name="quantidade"
                type="number"
                value={form.quantidade}
                onChange={onInputChange}
              />
              {fieldErrors.quantidade && (
                <span className="atendimento-field-error">{fieldErrors.quantidade}</span>
              )}
            </label>

            <label>
              CID
              <input
                maxLength="10"
                name="cid"
                placeholder="Opcional"
                value={form.cid}
                onChange={onInputChange}
              />
            </label>
          </div>

          <div className="atendimento-modal-actions">
            <button
              className="atendimento-secondary-button"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="atendimento-primary-button"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting
                ? 'Salvando...'
                : editingAtendimentoId
                  ? 'Atualizar Atendimento'
                  : 'Registrar Atendimento'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
