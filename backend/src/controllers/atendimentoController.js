import * as atendimentoService from '../services/atendimentoService.js';

// Criar Atendimento
export const criarAtendimentoController = async (req, res) => {
  try {
    const dadosCorpo = req.body;
    const procedimentoDaRequisicao = req.procedimento; 

    const resultado = await atendimentoService.criarNovoAtendimento(dadosCorpo, procedimentoDaRequisicao);

    return res.status(201).json({
      status: "success",
      message: "Procedimento registrado com sucesso!",
      data: {
        atendimento_id: resultado ? resultado.id : null, 
        tipo_faturamento: procedimentoDaRequisicao.tipo
      }
    });
  } catch (error) {
    console.error("Falha no Controller de Atendimento:", error);
    return res.status(500).json({ 
      status: "error", 
      message: "Falha na comunicação com o banco ao salvar o atendimento." 
    });
  }
};

// Listar Atendimentos
export const getAtendimentos = async (req, res) => {
  try {
    const atendimentos = await atendimentoService.listarAtendimentos();
    return res.status(200).json({ status: "success", data: atendimentos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Erro ao listar atendimentos." });
  }
};

// Buscar por ID
export const getAtendimentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const atendimento = await atendimentoService.buscarAtendimentoPorId(id);
    if (!atendimento) {
      return res.status(404).json({ status: "error", message: "Atendimento não encontrado." });
    }
    return res.status(200).json({ status: "success", data: atendimento });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Erro ao buscar atendimento." });
  }
};

// Atualizar Atendimento
export const updateAtendimento = async (req, res) => {
  try {
    const { id } = req.params;
    return res.status(200).json({ 
      status: "success", 
      message: `Atendimento ${id} atualizado com sucesso (Mock/Banco mantido).` 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Erro ao atualizar atendimento." });
  }
};

// Deletar Atendimento
export const deleteAtendimento = async (req, res) => {
  try {
    const { id } = req.params;
    await atendimentoService.deletarAtendimentoExistente(id);
    return res.status(200).json({ status: "success", message: "Atendimento removido com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Erro ao apagar atendimento." });
  }
};