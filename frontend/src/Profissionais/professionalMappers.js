export function onlyDigits(value) {
  return value.replace(/\D/g, '')
}

export function normalizeRegistro(value) {
  const trimmedValue = value.trim().toUpperCase()
  const digits = onlyDigits(trimmedValue)

  if (/^\d{5}$/.test(trimmedValue)) {
    return `CRO-${trimmedValue}`
  }

  if (/^[A-Z]{3}\d{4,10}$/.test(trimmedValue)) {
    return `${trimmedValue.slice(0, 3)}-${trimmedValue.slice(3)}`
  }

  if (digits.length >= 4 && digits.length <= 10 && !trimmedValue.includes('-')) {
    return `CRO-${digits}`
  }

  return trimmedValue
}

export function displayRegistro(value) {
  return value?.replace(/^[A-Z]{3}-/, '') ?? ''
}

export function apiToForm(professional) {
  return {
    nome: professional.nomeCompleto ?? professional.nome ?? '',
    cpf: professional.cpf ?? '',
    registro: professional.cro ?? professional.registro ?? '',
    uf: professional.ufConselho ?? professional.uf ?? '',
    cbo: professional.especialidade ?? professional.cbo ?? '',
    cns: professional.cns ?? '',
  }
}

export function apiToProfessional(professional) {
  return {
    id: professional.id,
    ...apiToForm(professional),
  }
}

export function formToApi(form) {
  return {
    nomeCompleto: form.nome.trim(),
    cpf: onlyDigits(form.cpf),
    cro: normalizeRegistro(form.registro),
    ufConselho: form.uf,
    especialidade: form.cbo.trim(),
    cns: onlyDigits(form.cns),
  }
}
