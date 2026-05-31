import Atendimento from '../models/atendimento.js'

export const criarNovoAtendimento = async (dados, procedimentoValido) => {
  const dataAtendimento = new Date(dados.data_atendimento)
  const dataAtual = new Date()
  
  if (dataAtendimento > dataAtual) {
    throw new Error('DATA_FUTURA')
  }

  const dadosFormatados = {
    data_atendimento: dados.data_atendimento,
    cid: dados.cid || null,
    paciente_id: dados.paciente_id || null,
    profissional_id: dados.profissional_id,
    procedimentos: [
      {
        procedimento_id: procedimentoValido.id,
        quantidade: dados.quantidade || 1
      }
    ]
  }

  return await Atendimento.criar_atendimento(dadosFormatados)
}

export const atualizarAtendimentoExistente = async (id, dados, procedimentoValido) => {
  const dataAtendimento = new Date(dados.data_atendimento)
  const dataAtual = new Date()
  
  if (dataAtendimento > dataAtual) {
    throw new Error('DATA_FUTURA')
  }

  const dadosFormatados = {
    data_atendimento: dados.data_atendimento,
    cid: dados.cid || null,
    paciente_id: dados.paciente_id || null,
    profissional_id: dados.profissional_id,
    procedimentos: [
      {
        procedimento_id: procedimentoValido.id,
        quantidade: dados.quantidade || 1
      }
    ]
  }

  return await Atendimento.atualizar_atendimento(id, dadosFormatados)
}

export const listarAtendimentos = async () => {
  return await Atendimento.buscar_atendimentos()
}

export const buscarAtendimentoPorId = async (id) => {
  return await Atendimento.buscar_atendimento_id(id)
}

export const deletarAtendimentoExistente = async (id) => {
  return await Atendimento.remover_atendimento(id)
}