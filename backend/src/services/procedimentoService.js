import Procedimento from '../models/procedimento.js'

// listar todos os procedimentos
export const listarProcedimentos = async () => {
  return await Procedimento.buscar_procedimentos()
}

// buscar por id
export const buscarProcedimentoPorId = async (id) => {
  return await Procedimento.buscar_procedimento_id(id)
}

// criar novo procedimento
export const criarProcedimento = async (dados) => {
  return await Procedimento.criar_procedimento(dados)
}

// atualizar procedimento
export const atualizarProcedimento = async (id, dados) => {
  return await Procedimento.atualizar_procedimento(id, dados)
}

// deletar procedimento
export const deletarProcedimento = async (id) => {
  return await Procedimento.remover_procedimento(id)
}