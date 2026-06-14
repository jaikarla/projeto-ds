export const perfilMappers = {
  // Converte o que vem da API/Banco para o estado do React
  toState(apiData) {
    if (!apiData) return {};
    return {
      nome: apiData.nome_completo || '',
      email: apiData.email_usuario || '',
      cpf: apiData.cpf_usuario || '',
      telefone: apiData.telefone_usuario || '',
      cep: apiData.cep_endereco || '',
      numero: apiData.numero_endereco || '',
      complemento: apiData.complemento_endereco || ''
    };
  },

  // Converte o estado do React de volta para o formato que a API/Banco espera
  toApi(stateData) {
    if (!stateData) return {};
    return {
      nome_completo: stateData.nome,
      email_usuario: stateData.email,
      cpf_usuario: stateData.cpf.replace(/\D/g, ''), 
      telefone_usuario: stateData.telefone.replace(/\D/g, ''),
      cep_endereco: stateData.cep.replace(/\D/g, ''),
      numero_endereco: stateData.numero,
      complemento_endereco: stateData.complemento
    };
  }
};