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
    dados.tipo,
    dados.cns
  ]);

  validarCPF(dados.cpf);

  validarCNS(dados.cns);

  validarTipo(dados.tipo);

  // CBO obrigatório apenas para profissional
  if (dados.tipo === 'profissional') {
    validarCamposObrigatorios([dados.cbo])
  }

  //cro e cro_uf é obrigatório para profissionais, mas não para estudantes
  if (dados.tipo.toLowerCase() === "profissional") {
    validarCamposObrigatorios([
      dados.cro,
      dados.cro_uf
    ]);

  validarCRO(dados.cro);
}

  // CBO fixo
  if (dados.tipo?.toLowerCase() === 'estudante') {
    dados.cbo = 'Estudante'
  }

  //matrícula obrigatória para estudante
  if (dados.tipo.toLowerCase() === "estudante" && !dados.matricula) {
    throw new Error("Matrícula é obrigatória para estudante.");
  }

  //duplicidade - CPF
  const cpfExistente =
    await Profissional.buscar_profissional_cpf(dados.cpf);

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

}

  //duplicidade - CNS
  const cnsExistente =
  await Profissional.buscar_profissional_cns(dados.cns);

  if (cnsExistente) {
    throw new Error("CNS já cadastrado.");
}

  if (dados.tipo?.toLowerCase() === 'estudante' && dados.matricula) {
    const matriculaExistente = await Profissional.buscar_estudante_matricula(dados.matricula)
    if (matriculaExistente) {
      throw new Error("Matrícula já cadastrada.")
    }
}

  return await Profissional.criar_profissional(dados)
};

//atualizar profissional
export const atualizarProfissional = async (id, dados) => {

  validarCamposObrigatorios([
    dados.cpf,
    dados.nome,
    dados.tipo,
    dados.cns
  ]);

  validarCPF(dados.cpf);

  validarCNS(dados.cns);

  validarTipo(dados.tipo);

  // CBO obrigatório apenas para profissional
  if (dados.tipo === 'profissional') {
    validarCamposObrigatorios([dados.cbo])
  }

  //cro e cro_uf é obrigatório para profissionais, mas não para estudantes
  if (dados.tipo.toLowerCase() === "profissional") {
    validarCamposObrigatorios([
      dados.cro,
      dados.cro_uf
    ]);

  validarCRO(dados.cro);
}
  // CBO fixo
  if (dados.tipo?.toLowerCase() === 'estudante') {
    dados.cbo = 'Estudante'
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


  // matricula
  if (dados.tipo?.toLowerCase() === 'estudante' && dados.matricula) {
  const matriculaExistente = await Profissional.buscar_estudante_matricula(dados.matricula)
  if (matriculaExistente && matriculaExistente.id !== Number(id)) {
    throw new Error("Matrícula já cadastrada.")
  }
}

  return await Profissional.atualizar_dados_profissional(id, dados)
};

//deletar profissional
export const deletarProfissional = async (id) => {
  return await Profissional.remover_profissional(id)
};
