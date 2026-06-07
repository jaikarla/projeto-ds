import { Plus, Search } from 'lucide-react'
import { ToastMessage } from '../Profissionais/components/ToastMessage'
import { ProcedimentoModal } from './components/ProcedimentoModal'
import { ProcedimentosTable } from './components/ProcedimentosTable'
import { useProcedimentos } from './useProcedimentos'
import './Procedimentos.css'

export function ProcedimentosPage() {
  const procedimentos = useProcedimentos()

  return (
    <>
      <section className="procedimentos-page">
        <div className="procedimentos-page-header">
          <div>
            <h1>Procedimentos</h1>
            <p>Gerencie os procedimentos disponibilizados pela clinica</p>
          </div>

          <button
            className="procedimentos-primary-button"
            type="button"
            onClick={procedimentos.handleOpenModal}
          >
            <Plus size={19} strokeWidth={2.2} />
            Novo Procedimento
          </button>
        </div>

        <div className="procedimentos-toolbar">
          <label className="procedimentos-search-field">
            <Search size={20} strokeWidth={2} aria-hidden="true" />
            <input
              aria-label="Buscar procedimento por nome, código ou tipo"
              type="search"
              placeholder="Buscar por nome, código ou tipo..."
              value={procedimentos.search}
              onChange={(event) => procedimentos.setSearch(event.target.value)}
            />
          </label>

          <span className="procedimentos-count" aria-live="polite">
            {procedimentos.filteredProcedimentos.length} procedimentos
          </span>
        </div>

        {procedimentos.errorMessage && !procedimentos.isModalOpen && (
          <p className="procedimentos-feedback-message" role="alert">
            {procedimentos.errorMessage}
          </p>
        )}

        <section className="procedimentos-list" aria-live="polite">
          <ProcedimentosTable
            isLoading={procedimentos.isLoading}
            procedimentos={procedimentos.filteredProcedimentos}
            onDeleteProcedimento={procedimentos.handleDeleteProcedimento}
            onEditProcedimento={procedimentos.handleEditProcedimento}
          />
        </section>
      </section>

      {procedimentos.isModalOpen && (
        <ProcedimentoModal
          editingProcedimentoId={procedimentos.editingProcedimentoId}
          errorMessage={procedimentos.errorMessage}
          fieldErrors={procedimentos.fieldErrors}
          form={procedimentos.form}
          isSubmitting={procedimentos.isSubmitting}
          onClose={procedimentos.handleCloseModal}
          onInputChange={procedimentos.handleInputChange}
          onSubmit={procedimentos.handleSubmit}
        />
      )}

      <ToastMessage toast={procedimentos.toast} />
    </>
  )
}
