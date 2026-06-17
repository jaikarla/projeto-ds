const API_BASE_URL = '/api'; 

export async function fetchRelatoriosContadores(dataInicial, dataFinal) {
  if (!dataInicial || !dataFinal) return { total: 0, bpaC: 0, bpaI: 0 };
  
  const response = await fetch(
    `${API_BASE_URL}/relatorios/contadores?dataInicial=${dataInicial}&dataFinal=${dataFinal}`
  );
  if (!response.ok) throw new Error('Erro ao buscar contadores do período.');
  return response.json();
}

export async function downloadRelatorioApi(tipo, formato, filtros) {
  // remove campos null, undefined ou vazios antes de montar a URL
  const filtrosLimpos = Object.fromEntries(
    Object.entries(filtros).filter(([, valor]) => valor !== null && valor !== undefined && valor !== '')
  );
  
  // Converte o objeto de filtros em query params (dataInicial, dataFinal, cnes, uf, etc.)
  const params = new URLSearchParams(filtrosLimpos).toString();
  
  const response = await fetch(`${API_BASE_URL}/relatorios/exportar/${tipo}/${formato}?${params}`, {
    method: 'GET',
    headers: {
      'Accept': formato === 'csv' ? 'text/csv' : 'text/plain',
    }
  });

  if (!response.ok){
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || `Erro ao gerar o arquivo ${formato.toUpperCase()}.`);
  }

  // Retorna o arquivo como um Blob nativo para download direto no navegador
  return response.blob();
}