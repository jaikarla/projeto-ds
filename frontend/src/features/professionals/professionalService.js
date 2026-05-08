import { apiToProfessional, formToApi } from './professionalMappers'

const API_URL = '/api/profissionais'

async function requestJson(url, options) {
  const response = await fetch(url, options)
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || 'Nao foi possivel concluir a operacao.')
  }

  return payload
}

export async function listProfessionals() {
  const payload = await requestJson(API_URL)
  const data = payload.data ?? []

  return data.map(apiToProfessional)
}

export async function createProfessional(form) {
  const payload = await requestJson(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formToApi(form)),
  })

  return apiToProfessional(payload.data)
}

export async function updateProfessional(professionalId, form) {
  const payload = await requestJson(`${API_URL}/${professionalId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formToApi(form)),
  })

  return apiToProfessional(payload.data)
}

export async function deleteProfessional(professionalId) {
  await requestJson(`${API_URL}/${professionalId}`, {
    method: 'DELETE',
  })
}
