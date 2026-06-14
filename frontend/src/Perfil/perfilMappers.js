export const perfilMappers = {
  toState(apiData) {
    if (!apiData) return {};

    return {
      nome: apiData.nome || apiData.nome_completo || '',
      email: apiData.email || apiData.email_usuario || '',
      cpf: apiData.cpf || apiData.cpf_usuario || '',
      telefone: apiData.telefone || apiData.telefone_usuario || '',
      cep: '',
      numero: '',
      complemento: ''
    };
  },

  toApi(stateData) {
    if (!stateData) return {};

    return {
      nome: stateData.nome,
      email: stateData.email,
      cpf: (stateData.cpf || '').replace(/\D/g, ''),
      telefone: (stateData.telefone || '').replace(/\D/g, '')
    };
  }
};
