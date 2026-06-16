import { Plus, Search } from 'lucide-react'
import { AtendimentoModal } from './components/AtendimentoModal'
import { AtendimentosTable } from './components/AtendimentosTable'
import { AtendimentoToast } from './components/AtendimentoToast'
import { useAtendimentos } from './useAtendimentos'
import './Atendimentos.css'

export function AtendimentosPage() {
  const atendimentos = useAtendimentos()

  return (
    <>
      <section className="atendimentos-page">
        <div className="atendimentos-header">
          <div>
            <h1>Atendimentos</h1>
            <p>Registre atendimentos odontologicos</p>
          </div>

          <button
            className="atendimento-primary-button"
            type="button"
            onClick={atendimentos.handleOpenModal}
          >
            <span>+</span> Novo Atendimento
          </button>
        </div>

        <label className="atendimento-search-field">
          <Search size={20} aria-hidden="true" />
          <input
            aria-label="Buscar atendimentos"
            type="search"
            placeholder="Buscar atendimentos..."
            value={atendimentos.search}
            onChange={(event) => atendimentos.setSearch(event.target.value)}
          />
        </label>

        {atendimentos.errorMessage && !atendimentos.isModalOpen && (
          <p className="atendimento-feedback" role="alert">
            {atendimentos.errorMessage}
          </p>
        )}

        <section className="atendimentos-list" aria-live="polite">
          <AtendimentosTable
            atendimentos={atendimentos.filteredAtendimentos}
            isLoading={atendimentos.isLoading}
            onDeleteAtendimento={atendimentos.handleDeleteAtendimento}
            onEditAtendimento={atendimentos.handleEditAtendimento}
          />
        </section>
      </section>

      {atendimentos.isModalOpen && (
        <AtendimentoModal
          editingAtendimentoId={atendimentos.editingAtendimentoId}
          errorMessage={atendimentos.errorMessage}
          fieldErrors={atendimentos.fieldErrors}
          filteredProcedimentos={atendimentos.filteredProcedimentos}
          form={atendimentos.form}
          isSubmitting={atendimentos.isSubmitting}
          onClose={atendimentos.handleCloseModal}
          onInputChange={atendimentos.handleInputChange}
          onSelectProcedimento={atendimentos.handleSelectProcedimento}
          onSubmit={atendimentos.handleSubmit}
          pacientes={atendimentos.pacientes}
          profissionais={atendimentos.profissionais}
          selectedProcedimento={atendimentos.selectedProcedimento}
        />
      )}

      <AtendimentoToast toast={atendimentos.toast} />
    </>
  )
}
