import Paciente from '../models/paciente.js'

//listar todos os pacientes
export const listarPacientes = async () => {
  return await Paciente.buscar_pacientes();
};

//buscar por id
export const buscarPacientePorId = async (id) => {
  return await Paciente.buscar_paciente_id()
};

//criar novo paciente
export const criarPaciente = async (dados) => {
  return await Paciente.criar_paciente(dados)
};

//atualizar paciente
export const atualizarPaciente = async (id, dados) => {
  return await Paciente.atualizar_dados_pacientes(id, dados)
};

//deletar paciente
export const deletarPaciente = async (id) => {
  return await Paciente.remover_paciente(id)
};