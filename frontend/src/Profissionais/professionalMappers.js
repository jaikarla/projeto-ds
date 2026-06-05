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
    tipo: professional.tipo ?? 'profissional',
    matricula: professional.matricula ?? '',
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
  
  const dadosBase = {
    nomeCompleto: form.nome ? form.nome.trim() : '',
    cpf: onlyDigits(form.cpf || ''),
    cns: onlyDigits(form.cns || ''),
    tipo: form.tipo || 'profissional',
  }

  // Se for ESTUDANTE, ignora completamente CBO, Registro e UF
  if (form.tipo === 'estudante') {
    return {
      ...dadosBase,
      matricula: form.matricula ? form.matricula.trim() : '',
      cro: '',
      ufConselho: '',
      especialidade: '',
    }
  }

  // Se for PROFISSIONAL, ignora completamente a matrícula
  return {
    ...dadosBase,
    matricula: '',
    cro: form.registro ? normalizeRegistro(form.registro) : '',
    ufConselho: form.uf || '',
  
    especialidade: form.cbo ? form.cbo.trim() : '', 
  }
}
