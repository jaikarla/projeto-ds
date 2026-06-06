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
  const { nome, codigo, tipo } = dados;

  // Regra A: Campos obrigatórios
  if (!nome || !codigo || !tipo) {
    throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
  }

  // Regra B: Código com máximo de 10 dígitos
  if (codigo.length > 10) {
    throw new Error('O código deve ter no máximo 10 dígitos.');
  }

  // Regra C: Tipo restrito a BPA-C ou BPA-I
  if (tipo !== 'BPA-C' && tipo !== 'BPA-I') {
    throw new Error('Tipo inválido. Deve ser BPA-C ou BPA-I.');
  }

  // Regra B: Código único (não pode ser duplicado no banco)
  const codigoJaExiste = await Procedimento.buscar_procedimento_codigo(codigo);
  if (codigoJaExiste) {
    throw new Error('Código já cadastrado.');
  }

  // Se passou por todas as barreiras acima, pode salvar no banco!
  return await Procedimento.criar_procedimento(dados);
}

// atualizar procedimento
export const atualizarProcedimento = async (id, dados) => {
  return await Procedimento.atualizar_procedimento(id, dados)
}

// deletar procedimento
export const deletarProcedimento = async (id) => {
  return await Procedimento.remover_procedimento(id)
}