export const initialAtendimentoForm = {
  pacienteId: '',
  profissionalId: '',
  dataAtendimento: new Date().toISOString().slice(0, 10),
  procedimentoBusca: '',
  codigoSus: '',
  quantidade: '1',
  cid: '',
}

function toDateInputValue(value) {
  if (!value) {
    return ''
  }

  return String(value).slice(0, 10)
}

export function formatDate(value) {
  const dateValue = toDateInputValue(value)

  if (!dateValue) {
    return '-'
  }

  const [year, month, day] = dateValue.split('-')
  return `${day}/${month}/${year}`
}

export function normalizePaciente(paciente) {
  return {
    id: paciente.id,
    nome: paciente.nomeCompleto ?? paciente.nome ?? '',
    cns: paciente.cns ?? '',
    cpf: paciente.cpf ?? '',
  }
}

export function normalizeProfissional(profissional) {
  return {
    id: profissional.id,
    nome: profissional.nomeCompleto ?? profissional.nome ?? '',
    cbo: profissional.especialidade ?? profissional.cbo ?? '',
    tipo: profissional.tipo ?? 'profissional',
  }
}

export function normalizeProcedimento(procedimento) {
  return {
    id: procedimento.id,
    codigo: procedimento.codigo ?? '',
    nome: procedimento.nome ?? '',
    tipo: procedimento.tipo ?? '',
  }
}

export function procedimentoLabel(procedimento) {
  if (!procedimento) {
    return ''
  }

  return `${procedimento.codigo} - ${procedimento.nome}`
}

export function getFirstProcedimento(atendimento) {
  return atendimento?.procedimentos?.[0] ?? null
}

export function atendimentoToForm(atendimento, pacientes, profissionais) {
  const procedimento = getFirstProcedimento(atendimento)
  const paciente = pacientes.find((item) => {
    return (
      (atendimento.paciente_cns && item.cns === atendimento.paciente_cns) ||
      (atendimento.paciente_nome && item.nome === atendimento.paciente_nome)
    )
  })
  const profissional = profissionais.find((item) => {
    return (
      item.nome === atendimento.profissional_nome &&
      (!atendimento.profissional_cbo || item.cbo === atendimento.profissional_cbo)
    )
  })

  return {
    pacienteId: paciente?.id ? String(paciente.id) : '',
    profissionalId: profissional?.id ? String(profissional.id) : '',
    dataAtendimento: toDateInputValue(atendimento.data_atendimento),
    procedimentoBusca: procedimento ? procedimentoLabel(procedimento) : '',
    codigoSus: procedimento?.codigo ?? '',
    quantidade: String(procedimento?.quantidade ?? 1),
    cid: atendimento.cid ?? '',
  }
}

export function formToApi(form) {
  const payload = {
    data_atendimento: form.dataAtendimento,
    codigo_sus: form.codigoSus,
    profissional_id: Number(form.profissionalId),
    quantidade: Number(form.quantidade) || 1,
  }

  if (form.pacienteId) {
    payload.paciente_id = Number(form.pacienteId)
  }

  if (form.cid.trim()) {
    payload.cid = form.cid.trim().toUpperCase()
  }

  return payload
}
