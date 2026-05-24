import { useCallback, useEffect, useMemo, useState } from 'react'
import { initialProfessionalForm } from './professionalConstants'
import { validateProfessionalForm } from './professionalValidation'
import {
  createProfessional,
  deleteProfessional,
  listProfessionals,
  updateProfessional,
} from './professionalService'

export function useProfessionals() {
  const [professionals, setProfessionals] = useState([])
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProfessionalId, setEditingProfessionalId] = useState(null)
  const [form, setForm] = useState(initialProfessionalForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const filteredProfessionals = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return professionals
    }

    return professionals.filter((professional) => {
      return (
        professional.nome.toLowerCase().includes(query) ||
        professional.cpf.toLowerCase().includes(query)
      )
    })
  }, [professionals, search])

  const loadProfessionals = useCallback(async () => {
    try {
      setIsLoading(true)
      setErrorMessage('')
      setProfessionals(await listProfessionals())
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProfessionals()
  }, [loadProfessionals])

  useEffect(() => {
    if (!toast.message) {
      return undefined
    }

    const timeoutId = setTimeout(() => {
      setToast({ message: '', type: 'success' })
    }, 3500)

    return () => clearTimeout(timeoutId)
  }, [toast.message])

  function handleInputChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setFieldErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  function handleOpenModal() {
    setForm(initialProfessionalForm)
    setEditingProfessionalId(null)
    setErrorMessage('')
    setFieldErrors({})
    setIsModalOpen(true)
  }

  function handleEditProfessional(professional) {
    setForm({
      nome: professional.nome,
      cpf: professional.cpf,
      registro: professional.registro,
      uf: professional.uf,
      cbo: professional.cbo,
      cns: professional.cns,
    })
    setEditingProfessionalId(professional.id)
    setErrorMessage('')
    setFieldErrors({})
    setIsModalOpen(true)
  }

  async function handleDeleteProfessional(professionalId) {
    try {
      setErrorMessage('')
      await deleteProfessional(professionalId)
      setProfessionals((currentProfessionals) =>
        currentProfessionals.filter((professional) => professional.id !== professionalId),
      )
      setToast({ message: 'Profissional excluído com sucesso.', type: 'danger' })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingProfessionalId(null)
    setIsSubmitting(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const errors = validateProfessionalForm(form)

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage('')

      if (editingProfessionalId) {
        const updatedProfessional = await updateProfessional(editingProfessionalId, form)

        setProfessionals((currentProfessionals) =>
          currentProfessionals.map((professional) =>
            professional.id === editingProfessionalId ? updatedProfessional : professional,
          ),
        )
        handleCloseModal()
        setToast({ message: 'Profissional atualizado com sucesso.', type: 'success' })
        return
      }

      const newProfessional = await createProfessional(form)

      setProfessionals((currentProfessionals) => [
        ...currentProfessionals,
        newProfessional,
      ])
      setSearch('')
      handleCloseModal()
      setToast({ message: 'Profissional cadastrado com sucesso!', type: 'success' })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    editingProfessionalId,
    errorMessage,
    fieldErrors,
    filteredProfessionals,
    form,
    handleCloseModal,
    handleDeleteProfessional,
    handleEditProfessional,
    handleInputChange,
    handleOpenModal,
    handleSubmit,
    isLoading,
    isModalOpen,
    isSubmitting,
    search,
    setSearch,
    toast,
  }
}
