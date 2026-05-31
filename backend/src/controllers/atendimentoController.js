import * as atendimentoService from '../services/atendimentoService.js'

export const criarAtendimentoController = async (req, res) => {
  try {
    const dadosCorpo = req.body
    const procedimentoDaRequisicao = req.procedimento 

    const resultado = await atendimentoService.criarNovoAtendimento(dadosCorpo, procedimentoDaRequisicao)

    return res.status(201).json({
      status: "success",
      message: "Procedimento registrado com sucesso!",
      data: {
        atendimento_id: resultado ? resultado.id : null, 
        tipo_faturamento: procedimentoDaRequisicao.tipo
      }
    })
  } catch (error) {
    if (error.message === 'DATA_FUTURA') {
      return res.status(400).json({ status: "error", message: "Não é permitido registrar atendimentos em datas futuras." })
    }
    if (error.message === 'AMBOS_INVALIDOS') {
      return res.status(400).json({ status: "error", message: "Por favor, cadastre o profissional e o paciente identificados antes de registrar o atendimento." })
    }
    if (error.message === 'PACIENTE_INVALIDO') {
      return res.status(400).json({ status: "error", message: "Este paciente não foi cadastrado." })
    }
    if (error.message === 'PROFISSIONAL_INVALIDO') {
      return res.status(400).json({ status: "error", message: "Este profissional não foi cadastrado" })
    }

    console.error(error)
    return res.status(500).json({ status: "error", message: "Falha na comunicação com o banco ao salvar o atendimento." })
  }
}

export const getAtendimentos = async (req, res) => {
  try {
    const atendimentos = await atendimentoService.listarAtendimentos()
    return res.status(200).json({ status: "success", data: atendimentos })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: "error", message: "Erro ao listar atendimentos." })
  }
}

export const getAtendimentoById = async (req, res) => {
  try {
    const { id } = req.params
    const atendimento = await atendimentoService.buscarAtendimentoPorId(id)
    if (!atendimento) {
      return res.status(404).json({ status: "error", message: "Atendimento não encontrado." })
    }
    return res.status(200).json({ status: "success", data: atendimento })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: "error", message: "Erro ao buscar atendimento." })
  }
}

export const updateAtendimento = async (req, res) => {
  try {
    const { id } = req.params
    const dadosCorpo = req.body
    const procedimentoDaRequisicao = req.procedimento 

    const resultado = await atendimentoService.atualizarAtendimentoExistente(id, dadosCorpo, procedimentoDaRequisicao)
    
    if (!resultado) {
      return res.status(404).json({ status: "error", message: "O atendimento indicado não foi registrado." })
    }

    return res.status(200).json({ 
      status: "success", 
      message: "Atendimento atualizado com sucesso."
    })
  } catch (error) {
    if (error.message === 'DATA_FUTURA') {
      return res.status(400).json({ status: "error", message: "Não é permitido registrar atendimentos em datas futuras." })
    }
    if (error.message === 'AMBOS_INVALIDOS') {
      return res.status(400).json({ status: "error", message: "Por favor, cadastre o profissional e o paciente identificados antes de registrar o atendimento." })
    }
    if (error.message === 'PACIENTE_INVALIDO') {
      return res.status(400).json({ status: "error", message: "Este paciente não foi cadastrado." })
    }
    if (error.message === 'PROFISSIONAL_INVALIDO') {
      return res.status(400).json({ status: "error", message: "Este profissional não foi cadastrado" })
    }

    console.error(error)
    return res.status(500).json({ status: "error", message: "Erro ao atualizar atendimento." })
  }
}

export const deleteAtendimento = async (req, res) => {
  try {
    const { id } = req.params
    const linhasAfetadas = await atendimentoService.deletarAtendimentoExistente(id)
    
    if (linhasAfetadas === 0) {
      return res.status(404).json({ status: "error", message: "O atendimento indicado não foi registrado." })
    }

    return res.status(200).json({ status: "success", message: "Atendimento removido com sucesso." })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: "error", message: "Erro ao apagar atendimento." })
  }
}