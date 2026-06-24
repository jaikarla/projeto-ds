const API_URL = '/bpa/api/faturistas';
const SESSION_STORAGE_KEY = 'bpaAuthSession';

function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function decodeJwtPayload(token) {
  if (!token) return {};

  try {
    const base64 = token.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/');
    if (!base64) return {};
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
}

function getSessionData() {
  const session = getStoredSession();
  const tokenPayload = decodeJwtPayload(session.token);
  const id = session.id || session.faturista?.id || tokenPayload.id;

  if (!id) {
    throw new Error('Sessao invalida. Faca login novamente.');
  }

  return { id, token: session.token };
}

async function requestJson(url, options = {}) {
  const { token } = getSessionData();
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.erro || payload.message || payload.mensagem || 'Nao foi possivel concluir a operacao.');
  }

  return payload;
}

export const perfilService = {
  async getPerfil() {
    const { id } = getSessionData();
    const payload = await requestJson(`${API_URL}/${id}`);
    return payload.dados || payload.data || payload;
  },

  async updatePerfil(dadosAtualizados) {
    const { id } = getSessionData();
    const payload = await requestJson(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dadosAtualizados)
    });
    return payload.dados || payload.data || payload;
  },

  async updateSenha(payloadSenha) {
    const { id } = getSessionData();
    return await requestJson(`${API_URL}/${id}/senha`, {
      method: 'PATCH',
      body: JSON.stringify(payloadSenha)
    });
  },

  async deleteConta() {
    const { id } = getSessionData();
    return await requestJson(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
  }
};
