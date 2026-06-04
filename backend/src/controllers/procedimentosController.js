import {
  listarProcedimentos,
  buscarProcedimentoPorId,
  criarProcedimento,
  atualizarProcedimento,
  deletarProcedimento
} from "../services/procedimentoService.js";

// listar todos os procedimentos
export const getProcedimentos = async (req, res) => {
  try {
    const procedimentos = await listarProcedimentos();
    res.status(200).json({ success: true, data: procedimentos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// buscar por id
export const getProcedimentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const procedimento = await buscarProcedimentoPorId(id);

    if (!procedimento) {
      return res.status(404).json({ success: false, message: "Procedimento não encontrado" });
    }

    res.status(200).json({ success: true, data: procedimento });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// criar novo procedimento
export const createProcedimento = async (req, res) => {
  try {
    const novo = await criarProcedimento(req.body);
    res.status(201).json({
      success: true,
      message: "Procedimento criado com sucesso.",
      data: novo
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// atualizar procedimento
export const updateProcedimento = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizado = await atualizarProcedimento(id, req.body);

    if (!atualizado) {
      return res.status(404).json({ success: false, message: "Procedimento não encontrado." });
    }

    res.status(200).json({
      success: true,
      message: "Procedimento atualizado com sucesso.",
      data: atualizado
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// deletar procedimento
export const deleteProcedimento = async (req, res) => {
  try {
    const { id } = req.params;
    const removido = await deletarProcedimento(id);

    if (!removido) {
      return res.status(404).json({ success: false, message: "Procedimento não encontrado" });
    }

    res.status(200).json({ success: true, message: "Procedimento removido com sucesso" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};