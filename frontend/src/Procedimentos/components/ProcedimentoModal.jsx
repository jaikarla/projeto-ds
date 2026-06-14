import { X } from 'lucide-react'
import { PROCEDIMENTO_TIPOS } from '../procedimentoConstants'

export function ProcedimentoModal({
  editingProcedimentoId,
  errorMessage,
  fieldErrors,
  form,
  isSubmitting,
  onClose,
  onInputChange,
  onSubmit,
}) {
  return (
    <div className="procedimentos-modal-backdrop" role="presentation">
      <section
        aria-labelledby="procedimento-modal-title"
        className="procedimentos-modal"
        role="dialog"
        aria-modal="true"
      >
        <div className="procedimentos-modal-header">
          <h2 id="procedimento-modal-title">
            {editingProcedimentoId ? 'Editar Procedimento' : 'Novo Procedimento'}
          </h2>
          <button
            aria-label="Fechar cadastro"
            className="procedimentos-close-button"
            type="button"
            onClick={onClose}
          >
            <X size={21} strokeWidth={2.2} />
          </button>
        </div>

        <form className="procedimentos-form" onSubmit={onSubmit}>
          {errorMessage && (
            <p className="procedimentos-feedback-message" role="alert">
              {errorMessage}
            </p>
          )}

          <label>
            <span>Nome do Procedimento *</span>
            <input
              autoFocus
              aria-invalid={Boolean(fieldErrors.nome)}
              name="nome"
              placeholder="Digite o nome do procedimento"
              type="text"
              value={form.nome}
              onChange={onInputChange}
            />
            {fieldErrors.nome && <span className="procedimentos-field-error">{fieldErrors.nome}</span>}
          </label>

          <label>
            <span>Código *</span>
            <input
              aria-invalid={Boolean(fieldErrors.codigo)}
              inputMode="numeric"
              maxLength={10}
              name="codigo"
              placeholder="Ex: 0101020104"
              type="text"
              value={form.codigo}
              onChange={onInputChange}
            />
            {fieldErrors.codigo && <span className="procedimentos-field-error">{fieldErrors.codigo}</span>}
          </label>

          <label>
            <span>Tipo *</span>
            <select
              aria-invalid={Boolean(fieldErrors.tipo)}
              name="tipo"
              value={form.tipo}
              onChange={onInputChange}
            >
              <option value="">Selecione o tipo</option>
              {PROCEDIMENTO_TIPOS.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
            {fieldErrors.tipo && <span className="procedimentos-field-error">{fieldErrors.tipo}</span>}
          </label>

          <div className="procedimentos-modal-actions">
            <button className="procedimentos-secondary-button" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="procedimentos-primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : editingProcedimentoId ? 'Salvar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
