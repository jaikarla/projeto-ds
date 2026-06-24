const ATENDIMENTOS_URL = '/bpa/api/atendimentos'
const PACIENTES_URL = '/bpa/api/pacientes'
const PROFISSIONAIS_URL = '/bpa/api/profissionais'
const PROCEDIMENTOS_URL = '/bpa/api/procedimentos'

async function requestJson(url, options) {
  const response = await fetch(url, options)
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || 'Nao foi possivel concluir a operacao.')
  }

  return payload
}

function unwrapList(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload.data ?? []
}

export async function listAtendimentos() {
  return unwrapList(await requestJson(ATENDIMENTOS_URL))
}

export async function createAtendimento(payload) {
  return requestJson(ATENDIMENTOS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export async function updateAtendimento(atendimentoId, payload) {
  return requestJson(`${ATENDIMENTOS_URL}/${atendimentoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export async function deleteAtendimento(atendimentoId) {
  return requestJson(`${ATENDIMENTOS_URL}/${atendimentoId}`, {
    method: 'DELETE',
  })
}

export async function listPacientesOptions() {
  return unwrapList(await requestJson(PACIENTES_URL))
}

export async function listProfissionaisOptions() {
  return unwrapList(await requestJson(PROFISSIONAIS_URL))
}

export async function listProcedimentosOptions() {
  return unwrapList(await requestJson(PROCEDIMENTOS_URL))
}
