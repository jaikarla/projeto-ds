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
    ...values,
    cpf: values.cpf ? values.cpf.replace(/\D/g, '') : '',
    cns: values.cns ? values.cns.replace(/\D/g, '') : '',
    cep: values.cep ? values.cep.replace(/\D/g, '') : '',
  };
}