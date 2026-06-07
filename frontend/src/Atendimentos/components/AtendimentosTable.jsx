import { Pencil, Trash2 } from 'lucide-react'
import { formatDate, getFirstProcedimento } from '../atendimentosMappers'

export function AtendimentosTable({
  atendimentos,
  isLoading,
  onDeleteAtendimento,
  onEditAtendimento,
}) {
  if (isLoading) {
    return <p className="atendimento-empty-state">Carregando atendimentos...</p>
  }

  if (atendimentos.length === 0) {
    return <p className="atendimento-empty-state">Nenhum atendimento registrado.</p>
  }

  return (
    <div className="atendimento-table" role="table" aria-label="Atendimentos registrados">
      <div className="atendimento-row atendimento-row--heading" role="row">
        <span role="columnheader">Data</span>
        <span role="columnheader">Paciente</span>
        <span role="columnheader">Profissional</span>
        <span role="columnheader">Procedimento SUS</span>
        <span role="columnheader">Tipo</span>
        <span role="columnheader">Qtd.</span>
        <span role="columnheader">Ações</span>
      </div>

      {atendimentos.map((atendimento) => {
        const procedimento = getFirstProcedimento(atendimento)

        return (
          <div className="atendimento-row" role="row" key={atendimento.id}>
            <span role="cell">{formatDate(atendimento.data_atendimento)}</span>
            <span role="cell">{atendimento.paciente_nome || 'Nao identificado'}</span>
            <span role="cell">{atendimento.profissional_nome}</span>
            <span className="atendimento-procedimento-cell" role="cell">
              <strong>{procedimento?.codigo}</strong>
              <small>{procedimento?.nome}</small>
            </span>
            <span role="cell">
              <mark className={`atendimento-badge atendimento-badge--${procedimento?.tipo}`}>
                {procedimento?.tipo || '-'}
              </mark>
            </span>
            <span role="cell">{procedimento?.quantidade ?? 1}</span>
            <span className="atendimento-row-actions" role="cell">
              <button
                aria-label="Editar atendimento"
                className="atendimento-icon-button"
                type="button"
                onClick={() => onEditAtendimento(atendimento)}
              >
                <Pencil aria-hidden="true" />
              </button>
              <button
                aria-label="Excluir atendimento"
                className="atendimento-icon-button atendimento-icon-button--danger"
                type="button"
                onClick={() => onDeleteAtendimento(atendimento.id)}
              >
                <Trash2 aria-hidden="true" />
              </button>
            </span>
          </div>
        )
      })}
    </div>
  )
}
