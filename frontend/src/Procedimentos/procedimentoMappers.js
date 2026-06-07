export function onlyDigits(value) {
  return value.replace(/\D/g, '')
}

export function normalizeCodigo(value) {
  return onlyDigits(value || '').slice(0, 10)
}

export function apiToProcedimento(procedimento) {
  return {
    id: procedimento.id,
    nome: procedimento.nome ?? '',
    codigo: procedimento.codigo ?? '',
    tipo: procedimento.tipo ?? '',
  }
}

export function formToApi(form) {
  return {
    nome: form.nome.trim(),
    codigo: normalizeCodigo(form.codigo),
    tipo: form.tipo,
  }
}
