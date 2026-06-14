import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createAtendimento,
  deleteAtendimento,
  listAtendimentos,
  listPacientesOptions,
  listProcedimentosOptions,
  listProfissionaisOptions,
  updateAtendimento,
} from './atendimentosService'
import {
  atendimentoToForm,
  formToApi,
  initialAtendimentoForm,
  normalizePaciente,
  normalizeProcedimento,
  normalizeProfissional,
  procedimentoLabel,
} from './atendimentosMappers'

function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase()
}

function findProcedimentoFromForm(procedimentos, form) {
  const query = normalizeText(form.procedimentoBusca)
  const codigo = form.codigoSus || form.procedimentoBusca.split(' - ')[0]

  return procedimentos.find((procedimento) => {
    return (
      procedimento.codigo === codigo ||
      normalizeText(procedimentoLabel(procedimento)) === query
    )
  })
}

function validateForm(form, procedimento) {
  const errors = {}

  if (!form.dataAtendimento) {
    errors.dataAtendimento = 'Informe a data do atendimento.'
  } else if (new Date(`${form.dataAtendimento}T00:00:00`) > new Date()) {
    errors.dataAtendimento = 'A data nao pode ser futura.'
  }

  if (!form.profissionalId) {
    errors.profissionalId = 'Selecione um profissional.'
  }

  if (!procedimento) {
    errors.procedimentoBusca = 'Selecione um procedimento SUS valido.'
  }

  if (procedimento?.tipo === 'BPA-I' && !form.pacienteId) {
    errors.pacienteId = 'Este procedimento exige identificacao do paciente.'
  }

  if (Number(form.quantidade) < 1) {
    errors.quantidade = 'Informe uma quantidade maior que zero.'
  }

  return errors
}

export function useAtendimentos() {
  const [atendimentos, setAtendimentos] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [profissionais, setProfissionais] = useState([])
  const [procedimentos, setProcedimentos] = useState([])
  const [search, setSearch] = useState('')
  const [form, setForm] = useState(initialAtendimentoForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [editingAtendimentoId, setEditingAtendimentoId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const selectedProcedimento = useMemo(
    () => findProcedimentoFromForm(procedimentos, form),
    [form, procedimentos],
  )

  const filteredAtendimentos = useMemo(() => {
    const query = normalizeText(search)

    if (!query) {
      return atendimentos
    }

    return atendimentos.filter((atendimento) => {
      const procedimento = atendimento.procedimentos?.[0]
      const searchable = [
        atendimento.paciente_nome,
        atendimento.profissional_nome,
        atendimento.cid,
        procedimento?.codigo,
        procedimento?.nome,
        procedimento?.tipo,
      ]

      return searchable.some((value) => normalizeText(value).includes(query))
    })
  }, [atendimentos, search])

  const filteredProcedimentos = useMemo(() => {
    const query = normalizeText(form.procedimentoBusca)

    if (!query) {
      return procedimentos.slice(0, 30)
    }

    return procedimentos
      .filter((procedimento) => {
        return (
          normalizeText(procedimento.codigo).includes(query) ||
          normalizeText(procedimento.nome).includes(query) ||
          normalizeText(procedimento.tipo).includes(query)
        )
      })
      .slice(0, 30)
  }, [form.procedimentoBusca, procedimentos])

  const loadPageData = useCallback(async () => {
    try {
      setIsLoading(true)
      setErrorMessage('')
      const [atendimentosData, pacientesData, profissionaisData, procedimentosData] =
        await Promise.all([
          listAtendimentos(),
          listPacientesOptions(),
          listProfissionaisOptions(),
          listProcedimentosOptions(),
        ])

      setAtendimentos(atendimentosData)
      setPacientes(pacientesData.map(normalizePaciente))
      setProfissionais(profissionaisData.map(normalizeProfissional))
      setProcedimentos(procedimentosData.map(normalizeProcedimento))
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPageData()
  }, [loadPageData])

  useEffect(() => {
    if (!toast.message) {
      return undefined
    }

    const timeoutId = setTimeout(() => {
      setToast({ message: '', type: 'success' })
    }, 3500)

    return () => clearTimeout(timeoutId)
  }, [toast.message])

  function handleOpenModal() {
    setForm(initialAtendimentoForm)
    setFieldErrors({})
    setEditingAtendimentoId(null)
    setErrorMessage('')
    setIsModalOpen(true)
  }

  function handleEditAtendimento(atendimento) {
    setForm(atendimentoToForm(atendimento, pacientes, profissionais))
    setFieldErrors({})
    setEditingAtendimentoId(atendimento.id)
    setErrorMessage('')
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingAtendimentoId(null)
    setIsSubmitting(false)
  }

  function handleInputChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => {
      const updatedForm = { ...currentForm, [name]: value }

      if (name === 'procedimentoBusca') {
        const match = procedimentos.find((procedimento) => {
          return (
            procedimento.codigo === value ||
            procedimentoLabel(procedimento) === value
          )
        })

        updatedForm.codigoSus = match?.codigo ?? ''
      }

      return updatedForm
    })
    setFieldErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  function handleSelectProcedimento(procedimento) {
    setForm((currentForm) => ({
      ...currentForm,
      procedimentoBusca: procedimentoLabel(procedimento),
      codigoSus: procedimento.codigo,
    }))
    setFieldErrors((currentErrors) => ({ ...currentErrors, procedimentoBusca: '' }))
  }

  async function handleDeleteAtendimento(atendimentoId) {
    if (!window.confirm('Deseja remover este atendimento?')) {
      return
    }

    try {
      setErrorMessage('')
      await deleteAtendimento(atendimentoId)
      setAtendimentos((currentAtendimentos) =>
        currentAtendimentos.filter((atendimento) => atendimento.id !== atendimentoId),
      )
      setToast({ message: 'Atendimento removido com sucesso.', type: 'danger' })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const procedimento = findProcedimentoFromForm(procedimentos, form)
    const errors = validateForm(form, procedimento)

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage('')
      const payload = formToApi({
        ...form,
        codigoSus: procedimento.codigo,
      })

      if (editingAtendimentoId) {
        await updateAtendimento(editingAtendimentoId, payload)
        setToast({ message: 'Atendimento atualizado com sucesso.', type: 'success' })
      } else {
        await createAtendimento(payload)
        setToast({ message: 'Atendimento registrado com sucesso.', type: 'success' })
      }

      handleCloseModal()
      await loadPageData()
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    editingAtendimentoId,
    errorMessage,
    fieldErrors,
    filteredAtendimentos,
    filteredProcedimentos,
    form,
    handleCloseModal,
    handleDeleteAtendimento,
    handleEditAtendimento,
    handleInputChange,
    handleOpenModal,
    handleSelectProcedimento,
    handleSubmit,
    isLoading,
    isModalOpen,
    isSubmitting,
    pacientes,
    profissionais,
    search,
    selectedProcedimento,
    setSearch,
    toast,
  }
}
