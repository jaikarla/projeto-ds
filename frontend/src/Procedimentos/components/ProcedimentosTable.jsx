import { Pencil, Trash2 } from 'lucide-react'

export function ProcedimentosTable({
  isLoading,
  procedimentos,
  onDeleteProcedimento,
  onEditProcedimento,
}) {
  if (isLoading) {
    return <p className="procedimentos-empty-state">Carregando procedimentos...</p>
  }

  if (procedimentos.length === 0) {
    return <p className="procedimentos-empty-state">Nenhum procedimento cadastrado.</p>
  }

  return (
    <div className="procedimentos-table" role="table" aria-label="Procedimentos cadastrados">
      <div className="procedimentos-row procedimentos-row--heading" role="row">
        <span role="columnheader">Nome</span>
        <span role="columnheader">Código</span>
        <span role="columnheader">Tipo</span>
        <span role="columnheader">Ações</span>
      </div>

      {procedimentos.map((procedimento) => (
        <div className="procedimentos-row" role="row" key={procedimento.id}>
          <span className="procedimentos-name" role="cell">{procedimento.nome}</span>
          <span role="cell">{procedimento.codigo}</span>
          <span role="cell">
            <span className={`procedimentos-badge procedimentos-badge--${procedimento.tipo.toLowerCase()}`}>
              {procedimento.tipo}
            </span>
          </span>
          <span className="procedimentos-row-actions" role="cell">
            <button
              aria-label={`Editar ${procedimento.nome}`}
              className="procedimentos-icon-button"
              type="button"
              onClick={() => onEditProcedimento(procedimento)}
            >
              <Pencil size={19} strokeWidth={2} />
            </button>
            <button
              aria-label={`Excluir ${procedimento.nome}`}
              className="procedimentos-icon-button procedimentos-icon-button--danger"
              type="button"
              onClick={() => onDeleteProcedimento(procedimento)}
            >
              <Trash2 size={19} strokeWidth={2} />
            </button>
          </span>
        </div>
      ))}
    </div>
  )
}
