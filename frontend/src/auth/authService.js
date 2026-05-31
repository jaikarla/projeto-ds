const API_URL = '/api/auth'

async function requestJson(url, options = {}) {
  const response = await fetch(url, options)
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.erro || payload.message || 'Não foi possível concluir a operação.')
  }

  return payload
}

export async function login({ email, senha }) {
  const payload = await requestJson(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  })

  return payload.dados
}

export async function register({ nome, email, senha, cpf, telefone }) {
  const payload = await requestJson(`${API_URL}/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, email, senha, cpf, telefone }),
  })

  return payload.dados
}

export async function recoverPassword(email) {
  const payload = await requestJson(`${API_URL}/recuperar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  return payload.dados
}
