const API_URL = "http://localhost:5000/api/pacientes"; // Ajustar conforme a porta do backend

export async function fetchPacientesApi(busca = '') {
  const url = busca ? `${API_URL}?search=${encodeURIComponent(busca)}` : API_URL;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar pacientes.');
  return response.json();
}

export async function cadastrarPacienteApi(pacienteData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pacienteData)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao cadastrar paciente.');
  }
  return response.json();
}

export async function atualizarPacienteApi(id, pacienteData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pacienteData)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao atualizar paciente.');
  }
  return response.json();
}

export async function deletarPacienteApi(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Erro ao deletar paciente.');
  return true;
}