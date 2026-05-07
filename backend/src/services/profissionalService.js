//simulação de banco de dados em memória para teste - deve ser retirado quando o banco de dados real for implementado
let profissionais = [];
let idAtual = 1; //id auto-incremental para novos profissionais

//listar todos os profissionais
export const listarProfissionais = () => {
  return profissionais;
};

//buscar por id
export const buscarProfissionalPorId = (id) => {
  return profissionais.find(p => p.id === Number(id));
};

//criar novo profissional
export const criarProfissional = (dados) => {

  //campos obrigatórios
  if(!dados.nomeCompleto || !dados.cpf || !dados.cro || !dados.ufConselho || !dados.cns || !dados.especialidade
  ){
    throw new Error("Todos os campos são obrigatórios.");
  }

  //cpf
  const cpfRegex = /^\d{11}$/;
  
  if (!cpfRegex.test(dados.cpf)) {
    throw new Error("CPF inválido. Deve conter exatamente 11 dígitos numéricos.");
  }

  //cro
  const croRegex = /^[A-Z]{3}-\d{5}$/;

  if (!croRegex.test(dados.cro)){
    throw new Error("CRO inválido.");
  }

  //cns 
  const cnsRegex = /^\d{15}$/;

  if (!cnsRegex.test(dados.cns)) {
    throw new Error("CNS inválido. Deve conter exatamente 15 dígitos numéricos.");
  }

  //duplicidades - cpf, cro e cns devem ser únicos
  //cpf 
  const cpfExistente = profissionais.find(
    p => p.cpf === dados.cpf
  );

  if (cpfExistente) {
    throw new Error("CPF já cadastrado");
  }

  //cro
  const croExistente = profissionais.find(
    p => p.cro === dados.cro
  );

  if (croExistente) {
    throw new Error("CRO já cadastrado");
  }

  //cns
  const cnsExistente = profissionais.find(
    p => p.cns === dados.cns
  );

  if (cnsExistente) {
    throw new Error("CNS já cadastrado");
  }

  const novo = {
    id: idAtual++, //atribui o id atual e depois incrementa para o próximo
    ...dados
  };

  profissionais.push(novo); //adiciona o novo profissional à "base de dados" em memória
  return novo;
};

//atualizar profissional
export const atualizarProfissional = (id, dados) => {
  const index = profissionais.findIndex(p => p.id === Number(id));

  if (index === -1) return null;

  profissionais[index] = {
    ...profissionais[index],
    ...dados
  };

  return profissionais[index];
};

//deletar profissional
export const deletarProfissional = (id) => {
  const index = profissionais.findIndex(p => p.id === Number(id));

  if (index === -1) return false;

  profissionais.splice(index, 1);
  return true;
};