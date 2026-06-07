import Procedimento from '../models/procedimento.js'

// listar todos os procedimentos
export const listarProcedimentos = async () => {
  return await Procedimento.buscar_procedimentos()
}

// buscar por id
export const buscarProcedimentoPorId = async (id) => {
  return await Procedimento.buscar_procedimento_id(id)
}

// criar novo procedimento com trava de c�digo �nico
export const criarProcedimento = async (dados) => {
  const existente = await Procedimento.buscar_procedimento_codigo(dados.codigo);
  
  if (existente) {
    throw new Error("J� existe um procedimento cadastrado com este c�digo �nico.");
  }

  return await Procedimento.criar_procedimento(dados)
}

// atualizar procedimento com trava de c�digo �nico
export const atualizarProcedimento = async (id, dados) => {
  if (dados.codigo) {
    const existente = await Procedimento.buscar_procedimento_codigo(dados.codigo);
    
    // Se achar o c�digo em uso por OUTRO id, barra a duplica��o
    if (existente && existente.id !== Number(id)) {
      throw new Error("Este c�digo j� est� em uso por outro procedimento.");
    }
  }

  return await Procedimento.atualizar_procedimento(id, dados)
}

// deletar procedimento
export const deletarProcedimento = async (id) => {
  return await Procedimento.remover_procedimento(id)
}