export function calcularIdade(dataNascimento) {
  if (!dataNascimento) return '';
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade >= 0 ? idade : '';
}

export function prepararPacienteParaEnvio(values) {
  return {
    nome: values.nomeCompleto || '',
    data_nascimento: values.dataNascimento || '',
    cpf: values.cpf ? values.cpf.replace(/\D/g, '') : '',
    sexo: values.sexo || '',
    raca: values.racaCor || '',
    etnia: values.etnia || '',
    nacionalidade: values.nacionalidade || '',
    cns: values.cns ? values.cns.replace(/\D/g, '') : '',
    endereco: {
      cep: values.cep ? values.cep.replace(/\D/g, '') : '',
      logradouro: values.logradouro || '',
      numero: values.numero || '',
      bairro: values.bairro || '',
      cidade: values.cidade || '',
      uf: values.uf || ''
    }
  };
}


export function transformarPacienteDoBackend(paciente) {
  if (!paciente) return null;
  
  return {
    id: paciente.id,
    nomeCompleto: paciente.nome || '',
    dataNascimento: paciente.data_nascimento || '',
    idade: calcularIdade(paciente.data_nascimento),
    cpf: paciente.cpf || '',
    sexo: paciente.sexo || '',
    racaCor: paciente.raca || '',
    etnia: paciente.etnia || '',
    nacionalidade: paciente.nacionalidade || '',
    cns: paciente.cns || '',
    cep: paciente.cep || '',
    logradouro: paciente.logradouro || '',
    numero: paciente.numero || '',
    bairro: paciente.bairro || '',
    cidade: paciente.cidade || '',
    uf: paciente.uf || ''
  };
}