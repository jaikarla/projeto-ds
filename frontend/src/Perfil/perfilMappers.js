export const perfilMappers = {
  // Converte o que vem da API/Banco para o estado do React
  toState(apiData) {
    if (!apiData) return {};
    return {
      nome: apiData.nome_completo || '',
      email: apiData.email_usuario || '',
      cargo: apiData.cargo_funcao || '',
      cpf: apiData.cpf_usuario || '',
      registro: apiData.registro_profissional || '',
      uf: apiData.uf_conselho || 'PE'
    };
  },

  // Converte o estado do React de volta para o formato que a API/Banco espera
  toApi(stateData) {
    if (!stateData) return {};
    return {
      nome_completo: stateData.nome,
      email_usuario: stateData.email,
      cargo_funcao: stateData.cargo,
      cpf_usuario: stateData.cpf.replace(/\D/g, ''), 
      registro_profissional: stateData.registro,
      uf_conselho: stateData.uf
    };
  }
};