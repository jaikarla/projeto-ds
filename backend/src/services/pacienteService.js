import Paciente from '../models/paciente.js'

import {
  validarCPF,
  validarCNS,
  validarSexo,
  validarDataNascimento,
  validarEndereco,
  validarCamposObrigatorios
} from '../validators/validacoes.js';

//listar todos os pacientes
export const listarPacientes = async () => {
  return await Paciente.buscar_pacientes();
};

//buscar por id
export const buscarPacientePorId = async (id) => {
  return await Paciente.buscar_paciente_id(id)
};

//criar novo paciente
export const criarPaciente = async (dados) => {

  validarCamposObrigatorios([
  dados.nome,
  dados.data_nascimento,
  dados.cpf,
  dados.sexo,
  dados.raca,
  dados.etnia,
  dados.nacionalidade,
  dados.cns
  ]);

  validarCPF(dados.cpf);

  validarCNS(dados.cns);

  validarSexo(dados.sexo);

  validarDataNascimento(dados.data_nascimento);

  validarEndereco(dados.endereco);

  //duplicidade de CPF
  const cpfExistente =
  await Paciente.buscar_paciente_cpf(dados.cpf);

  if (cpfExistente) {
    throw new Error("CPF já cadastrado.");
  }

  //duplicidade de CNS
  const cnsExistente =
  await Paciente.buscar_paciente_cns(dados.cns);

  if (cnsExistente) {
    throw new Error("CNS já cadastrado.");
  }

  return await Paciente.criar_paciente(dados)
};

//atualizar paciente
export const atualizarPaciente = async (id, dados) => {

  validarCamposObrigatorios([
  dados.nome,
  dados.data_nascimento,
  dados.cpf,
  dados.sexo,
  dados.raca,
  dados.etnia,
  dados.nacionalidade,
  dados.cns
  ]);

  validarCPF(dados.cpf);

  validarCNS(dados.cns);

  validarSexo(dados.sexo);

  validarDataNascimento(dados.data_nascimento);

  validarEndereco(dados.endereco);

  //duplicidade de CPF
  const cpfExistente =
    await Paciente.buscar_paciente_cpf(dados.cpf
  );

  if ( cpfExistente && cpfExistente.id !== Number(id)) {
    throw new Error("CPF já cadastrado.");
  }

  //duplicidade de CNS
  const cnsExistente =
    await Paciente.buscar_paciente_cns(dados.cns);

  if (cnsExistente && cnsExistente.id !== Number(id)) {
    throw new Error("CNS já cadastrado.");
  }

  return await Paciente.atualizar_dados_pacientes(id, dados)
};


//deletar paciente
export const deletarPaciente = async (id) => {
  return await Paciente.remover_paciente(id)
};