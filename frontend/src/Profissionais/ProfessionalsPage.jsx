import { ProfessionalModal } from './components/ProfessionalModal'
import { ProfessionalsTable } from './components/ProfessionalsTable'
import { ToastMessage } from './components/ToastMessage'
import { useProfessionals } from './useProfessionals'
import './Professionals.css'

export function ProfessionalsPage() {
  const professionals = useProfessionals()

  return (
    <>
      <section className="professionals-page">
        <div className="page-header">
          <div>
            <h1>Profissionais</h1>
            <p>Gerencie os profissionais de saúde</p>
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={professionals.handleOpenModal}
          >
            <span aria-hidden="true">+</span>
            Novo Profissional
          </button>
        </div>

        <label className="search-field">
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </span>
          <input
            aria-label="Buscar profissional por nome ou CPF"
            type="search"
            placeholder="Buscar por nome ou CPF..."
            value={professionals.search}
            onChange={(event) => professionals.setSearch(event.target.value)}
          />
        </label>

        {professionals.errorMessage && !professionals.isModalOpen && (
          <p className="feedback-message" role="alert">
            {professionals.errorMessage}
          </p>
        )}

        <section className="professionals-list" aria-live="polite">
          <ProfessionalsTable
            isLoading={professionals.isLoading}
            professionals={professionals.filteredProfessionals}
            onDeleteProfessional={professionals.handleDeleteProfessional}
            onEditProfessional={professionals.handleEditProfessional}
          />
        </section>
      </section>

      {professionals.isModalOpen && (
        <ProfessionalModal
          editingProfessionalId={professionals.editingProfessionalId}
          errorMessage={professionals.errorMessage}
          fieldErrors={professionals.fieldErrors}
          form={professionals.form}
          isSubmitting={professionals.isSubmitting}
          onClose={professionals.handleCloseModal}
          onInputChange={professionals.handleInputChange}
          onSubmit={professionals.handleSubmit}
        />
      )}

      <ToastMessage toast={professionals.toast} />
    </>
  )
}
