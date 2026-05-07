//simulação de banco de dados em memória para teste - deve ser retirado quando o banco de dados real for implementado
let estudantes = [];
let idAtual = 1; //id auto-incremental para novos estudantes

//listar todos os estudantes
export const listarEstudantes = () => {
  return estudantes;
};

//buscar por id
export const buscarEstudantePorId = (id) => {
  return estudantes.find(e => e.id === Number(id));
};

//criar novo estudante
export const criarEstudante = (dados) => {

  //campos obrigatórios
  if(!dados.nomeCompleto || !dados.cpf || !dados.cns || !dados.dataNascimento || !dados.matricula) {
    throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
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
    throw new Error("Data de nascimento inválida. Deve estar no formato YYYY-MM-DD.");
  }

  const hoje = new Date(); // para não permitir datas futuras

  if (dataNascimento > hoje) {
    throw new Error("Data de nascimento não pode ser futura");
  }

  //duplicidades - cpf, cns e matrícula devem ser únicos
  //cpf
  const cpfExistente = estudantes.find(
    e => e.cpf === dados.cpf
  );

  if (cpfExistente) {
    throw new Error("CPF já cadastrado.");
  }

  //cns
  const cnsExistente = estudantes.find(
    e => e.cns === dados.cns
  );

  if (cnsExistente) {
    throw new Error("CNS já cadastrado.");
  
  }

  //matrícula
  const matriculaExistente = estudantes.find(
    e => e.matricula === dados.matricula
  );

  if (matriculaExistente) {
    throw new Error("Matrícula já cadastrada");
  }

  const novo = {
    id: idAtual++, //atribui o id atual e depois incrementa para o próximo
    ...dados
  };

  estudantes.push(novo); //adiciona o novo estudante à "base de dados" em memória
  return novo;
};

//atualizar estudante
export const atualizarEstudante = (id, dados) => {
  const index = estudantes.findIndex(e => e.id === Number(id));

  if (index === -1) return null;

  estudantes[index] = {
    ...estudantes[index],
    ...dados
  };

  return estudantes[index];
};

//deletar estudante
export const deletarEstudante = (id) => {
  const index = estudantes.findIndex(e => e.id === Number(id));

  if (index === -1) return false;

  estudantes.splice(index, 1);
  return true;
};