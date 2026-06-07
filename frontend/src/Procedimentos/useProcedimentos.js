import { useCallback, useEffect, useMemo, useState } from 'react'
import { initialProcedimentoForm } from './procedimentoConstants'
import { normalizeCodigo } from './procedimentoMappers'
import {
  createProcedimento,
  deleteProcedimento,
  listProcedimentos,
  updateProcedimento,
} from './procedimentoService'
import { validateProcedimentoForm } from './procedimentoValidation'

function sortProcedimentos(procedimentos) {
  return [...procedimentos].sort((a, b) => a.codigo.localeCompare(b.codigo))
}

export function useProcedimentos() {
  const [procedimentos, setProcedimentos] = useState([])
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProcedimentoId, setEditingProcedimentoId] = useState(null)
  const [form, setForm] = useState(initialProcedimentoForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const filteredProcedimentos = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return procedimentos
    }

    return procedimentos.filter((procedimento) => {
      return (
        procedimento.nome.toLowerCase().includes(query) ||
        procedimento.codigo.toLowerCase().includes(query) ||
        procedimento.tipo.toLowerCase().includes(query)
      )
    })
  }, [procedimentos, search])

  const loadProcedimentos = useCallback(async () => {
    try {
      setIsLoading(true)
      setErrorMessage('')
      setProcedimentos(sortProcedimentos(await listProcedimentos()))
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProcedimentos()
  }, [loadProcedimentos])

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
    const nextValue = name === 'codigo' ? normalizeCodigo(value) : value

    setForm((currentForm) => ({ ...currentForm, [name]: nextValue }))
    setFieldErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  function handleOpenModal() {
    setForm(initialProcedimentoForm)
    setEditingProcedimentoId(null)
    setErrorMessage('')
    setFieldErrors({})
    setIsModalOpen(true)
  }

  function handleEditProcedimento(procedimento) {
    setForm({
      nome: procedimento.nome,
      codigo: procedimento.codigo,
      tipo: procedimento.tipo,
    })
    setEditingProcedimentoId(procedimento.id)
    setErrorMessage('')
    setFieldErrors({})
    setIsModalOpen(true)
  }

  async function handleDeleteProcedimento(procedimento) {
    const confirmed = window.confirm(`Deseja excluir o procedimento "${procedimento.nome}"?`)

    if (!confirmed) {
      return
    }

    try {
      setErrorMessage('')
      await deleteProcedimento(procedimento.id)
      setProcedimentos((currentProcedimentos) =>
        currentProcedimentos.filter((item) => item.id !== procedimento.id),
      )
      setToast({ message: 'Procedimento excluido com sucesso.', type: 'danger' })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingProcedimentoId(null)
    setIsSubmitting(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const errors = validateProcedimentoForm(form, procedimentos, editingProcedimentoId)

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage('')

      if (editingProcedimentoId) {
        const updatedProcedimento = await updateProcedimento(editingProcedimentoId, form)

        setProcedimentos((currentProcedimentos) =>
          sortProcedimentos(
            currentProcedimentos.map((procedimento) =>
              procedimento.id === editingProcedimentoId ? updatedProcedimento : procedimento,
            ),
          ),
        )
        handleCloseModal()
        setToast({ message: 'Procedimento atualizado com sucesso.', type: 'success' })
        return
      }

      const newProcedimento = await createProcedimento(form)

      setProcedimentos((currentProcedimentos) =>
        sortProcedimentos([...currentProcedimentos, newProcedimento]),
      )
      setSearch('')
      handleCloseModal()
      setToast({ message: 'Procedimento cadastrado com sucesso.', type: 'success' })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    editingProcedimentoId,
    errorMessage,
    fieldErrors,
    filteredProcedimentos,
    form,
    handleCloseModal,
    handleDeleteProcedimento,
    handleEditProcedimento,
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
