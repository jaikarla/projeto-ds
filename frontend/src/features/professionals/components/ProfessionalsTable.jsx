import { displayRegistro } from '../professionalMappers'

export function ProfessionalsTable({
  isLoading,
  professionals,
  onDeleteProfessional,
  onEditProfessional,
}) {
  if (isLoading) {
    return <p className="empty-state">Carregando profissionais...</p>
  }

  if (professionals.length === 0) {
    return <p className="empty-state">Nenhum profissional cadastrado.</p>
  }

  return (
    <div className="professional-table" role="table" aria-label="Profissionais cadastrados">
      <div className="professional-row professional-row--heading" role="row">
        <span role="columnheader">Nome</span>
        <span role="columnheader">CPF</span>
        <span role="columnheader">Registro</span>
        <span role="columnheader">CBO</span>
        <span role="columnheader">Ações</span>
      </div>

      {professionals.map((professional) => (
        <div className="professional-row" role="row" key={professional.id}>
          <span role="cell">{professional.nome}</span>
          <span role="cell">{professional.cpf}</span>
          <span role="cell">
            {displayRegistro(professional.registro)} ({professional.uf})
          </span>
          <span role="cell">{professional.cbo}</span>
          <span className="row-actions" role="cell">
            <button
              aria-label={`Editar ${professional.nome}`}
              className="icon-button"
              type="button"
              onClick={() => onEditProfessional(professional)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
            <button
              aria-label={`Excluir ${professional.nome}`}
              className="icon-button icon-button--danger"
              type="button"
              onClick={() => onDeleteProfessional(professional.id)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
            </button>
          </span>
        </div>
      ))}
    </div>
  )
}
