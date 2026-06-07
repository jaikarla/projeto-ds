const API_URL = "/api/pacientes"; 

function extrairMensagemErro(errorData) {
  if (typeof errorData === 'string') {
    return errorData;
  }
  if (errorData.message) {
    return errorData.message;
  }
  if (errorData.erro) {
    return errorData.erro;
  }
  if (errorData.mensagem) {
    return errorData.mensagem;
  }
  return 'Erro desconhecido na operação.';
}

export async function fetchPacientesApi(busca = '') {
  try {
    const url = busca ? `${API_URL}?search=${encodeURIComponent(busca)}` : API_URL;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const mensagem = errorData.message || 'Erro ao buscar pacientes.';
      throw new Error(mensagem);
    }
    
    const data = await response.json();
  
    return data.data || data;
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    throw new Error(error.message || 'Erro ao buscar pacientes.');
  }
}

export async function cadastrarPacienteApi(pacienteData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pacienteData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const mensagem = extrairMensagemErro(errorData);
      throw new Error(mensagem);
    }
    
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
    throw new Error(error.message || 'Erro ao cadastrar paciente.');
  }
}

export async function atualizarPacienteApi(id, pacienteData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pacienteData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const mensagem = extrairMensagemErro(errorData);
      throw new Error(mensagem);
    }
    
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    throw new Error(error.message || 'Erro ao atualizar paciente.');
  }
}

export async function deletarPacienteApi(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const mensagem = extrairMensagemErro(errorData);
      throw new Error(mensagem);
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    throw new Error(error.message || 'Erro ao deletar paciente.');
  }
}