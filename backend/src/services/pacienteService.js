//simulação de banco de dados em memória para teste - deve ser retirado quando o banco de dados real for implementado
let pacientes = [];
let idAtual = 1; //id auto-incremental para novos pacientes

//listar todos os pacientes
export const listarPacientes = () => {
  return pacientes;
};

//buscar por id
export const buscarPacientePorId = (id) => {
  return pacientes.find(p => p.id === Number(id));
};

//criar novo paciente
export const criarPaciente = (dados) => {

  //campos obrigatórios
  if (!dados.nomeCompleto || !dados.dataNascimento || !dados.cpf || !dados.sexo || !dados.raca || !dados.nacionalidade || !dados.cns || !dados.endereco){
    throw new Error('Todos os campos são obrigatórios.');
  }

  //endereco deve conter rua, número, bairro, cidade e estado
  const { rua, numero, bairro, cidade, estado } = dados.endereco;

  if (!rua || !numero || !bairro || !cidade || !estado) {
    throw new Error("O endereço deve conter rua, número, bairro, cidade e estado preenchidos.");
  }

  //cpf
  const cpfRegex = /^\d{11}$/;

  if (!cpfRegex.test(dados.cpf)) {
    throw new Error("CPF inválido. Deve conter exatamente 11 dígitos numéricos.");
  }

  //cns
  const cnsRegex = /^\d{15}$/;

  if (!cnsRegex.test(dados.cns)) {
    throw new Error("CNS inválido. Deve conter exatamente 15 dígitos numéricos.");
  }

  //data de nascimento
  const dataNascimento = new Date(dados.dataNascimento);

  if (isNaN(dataNascimento.getTime())) {
    throw new Error("Data de nascimento inválida. Deve ser uma data válida.");
  }

  const hoje = new Date(); //para não ter data futura

  if (dataNascimento > hoje) {
    throw new Error("Data de nascimento não pode ser futura.");
  }

  //sexo
  const sexosValidos = ["M", "F"];

  if (!sexosValidos.includes(dados.sexo)) {
    throw new Error("Sexo inválido. Deve ser 'M' ou 'F'.");
  }

  //duplicidade - cpf, cns
  //cpf
  const cpfExistente = pacientes.find(
    p => p.cpf === dados.cpf
  );

  if (cpfExistente) {
    throw new Error("CPF já cadastrado.");
  }

  //cns
  const cnsExistente = pacientes.find(
    p => p.cns === dados.cns
  );

  if (cnsExistente) {
    throw new Error("CNS já cadastrado.");
  }

  const novo = {
    id: idAtual++, //atribui o id atual e depois incrementa para o próximo
    ...dados
  };

  pacientes.push(novo); //adiciona o novo paciente à "base de dados" em memória
  return novo;
};

//atualizar paciente
export const atualizarPaciente = (id, dados) => {
  const index = pacientes.findIndex(p => p.id === Number(id));

  if (index === -1) return null;

  pacientes[index] = {
    ...pacientes[index],
    ...dados
  };

  return pacientes[index];
};

//deletar paciente
export const deletarPaciente = (id) => {
  const index = pacientes.findIndex(p => p.id === Number(id));

  if (index === -1) return false;

  pacientes.splice(index, 1);
  return true;
};