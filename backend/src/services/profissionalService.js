import Profissional from '../models/profissional.js'

import {
  validarCPF,
  validarCRO,
  validarCNS,
  validarTipo,
  validarCamposObrigatorios
} from '../validators/validacoes.js'

//listar todos os profissionais
export const listarProfissionais = async () => {
    return await Profissional.buscar_profissionais()
};

//buscar por id
export const buscarProfissionalPorId = async (id) => {
  return await Profissional.buscar_profissional_id(id)
};

//criar novo profissional
export const criarProfissional = async (dados) => {

  validarCamposObrigatorios([
    dados.cpf,
    dados.nome,
    dados.cbo,
    dados.tipo,
    dados.cns
  ]);

  validarCPF(dados.cpf);

  validarCNS(dados.cns);

  validarTipo(dados.tipo);

  //cro e cro_uf é obrigatório para profissionais, mas não para estudantes
  if (dados.tipo.toLowerCase() === "profissional") {
    validarCamposObrigatorios([
      dados.cro,
      dados.cro_uf
    ]);

  validarCRO(dados.cro);
}

  //matrícula obrigatória para estudante
  if (dados.tipo.toLowerCase() === "estudante" && !dados.matricula) {
    throw new Error("Matrícula é obrigatória para estudante.");
  }

<<<<<<< HEAD
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

  if (dados.cns && !cnsRegex.test(dados.cns)) {
    throw new Error("CNS inválido. Deve conter exatamente 15 dígitos numéricos.");
  }

  //duplicidades - cpf, cro e cns devem ser únicos
  //cpf 
  const cpfExistente = profissionais.find(
    p => p.cpf === dados.cpf
  );
=======
  //duplicidade - CPF
  const cpfExistente =
    await Profissional.buscar_profissional_cpf(dados.cpf);
>>>>>>> d72b6eb7fdef195683e3feb2978b81265468ff6c

  if (cpfExistente) {
    throw new Error("CPF já cadastrado.");
  }

  //duplicidade - CRO
  if (dados.tipo.toLowerCase() === "profissional") {

    const croExistente =
      await Profissional.buscar_profissional_cro(dados.cro);

  if (croExistente) {
    throw new Error("CRO já cadastrado.");
  }

<<<<<<< HEAD
  //cns
  const cnsExistente = dados.cns && profissionais.find(
    p => p.cns === dados.cns
  );
=======
}

  //duplicidade - CNS
  const cnsExistente =
  await Profissional.buscar_profissional_cns(dados.cns);
>>>>>>> d72b6eb7fdef195683e3feb2978b81265468ff6c

  if (cnsExistente) {
    throw new Error("CNS já cadastrado.");
}

  return await Profissional.criar_profissional(dados)
};

//atualizar profissional
export const atualizarProfissional = async (id, dados) => {

  validarCamposObrigatorios([
    dados.cpf,
    dados.nome,
    dados.cbo,
    dados.tipo,
    dados.cns
  ]);

  validarCPF(dados.cpf);

  validarCNS(dados.cns);

  validarTipo(dados.tipo);

  //cro e cro_uf é obrigatório para profissionais, mas não para estudantes
  if (dados.tipo.toLowerCase() === "profissional") {
    validarCamposObrigatorios([
      dados.cro,
      dados.cro_uf
    ]);

  validarCRO(dados.cro);
}

  //matrícula obrigatória para estudante
  if (dados.tipo.toLowerCase() === "estudante" && !dados.matricula) {
    throw new Error("Matrícula é obrigatória para estudante.");
  }

  //verificar o cpf, cro e cns para evitar duplicidade
  //CPF
  const cpfExistente =
    await Profissional.buscar_profissional_cpf(dados.cpf);

  if (cpfExistente && cpfExistente.id !== Number(id)) {
    throw new Error("CPF já cadastrado.");
  }

  //CRO
  if (dados.tipo.toLowerCase() === "profissional") {
    const croExistente =
      await Profissional.buscar_profissional_cro(dados.cro);

  if (croExistente && croExistente.id !== Number(id)) {
    throw new Error("CRO já cadastrado.");
  }

}

  //CNS
  const cnsExistente =
    await Profissional.buscar_profissional_cns(dados.cns);

  if (cnsExistente && cnsExistente.id !== Number(id)) {
    throw new Error("CNS já cadastrado.");
}

  return await Profissional.atualizar_dados_profissional(id, dados)
};

//deletar profissional
<<<<<<< HEAD
export const deletarProfissional = (id) => {
  const index = profissionais.findIndex(p => p.id === Number(id));

  if (index === -1) return false;

  profissionais.splice(index, 1);
  return true;
};
=======
export const deletarProfissional = async (id) => {
  return await Profissional.remover_profissional(id)
};
>>>>>>> d72b6eb7fdef195683e3feb2978b81265468ff6c
