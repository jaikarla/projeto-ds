import { apiToProcedimento, formToApi } from './procedimentoMappers'

const API_URL = '/api/procedimentos'

async function requestJson(url, options) {
  const response = await fetch(url, options)
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || 'Nao foi possivel concluir a operacao.')
  }

  return payload
}

export async function listProcedimentos() {
  const payload = await requestJson(API_URL)
  const data = payload.data ?? []

  return data.map(apiToProcedimento)
}

export async function createProcedimento(form) {
  const payload = await requestJson(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formToApi(form)),
  })

  return apiToProcedimento(payload.data)
}

export async function updateProcedimento(procedimentoId, form) {
  const payload = await requestJson(`${API_URL}/${procedimentoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formToApi(form)),
  })

  return apiToProcedimento(payload.data)
}

export async function deleteProcedimento(procedimentoId) {
  await requestJson(`${API_URL}/${procedimentoId}`, {
    method: 'DELETE',
  })
}
