import {
  listarProfissionais,
  buscarProfissionalPorId,
  criarProfissional,
  atualizarProfissional,
  deletarProfissional
} from "../services/profissionalService.js";

//listar todos os profissionais
export const getProfissionais = async (req, res) => {
  try{
    const profissionais = await listarProfissionais()
    res.status(200).json({ success: true, data: profissionais })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

//bucar por id
export const getProfissionalById = async (req, res) => {
  try{
    const { id } = req.params
    const profissional = await buscarProfissionalPorId(id)
    if (!profissional) {
      return res.status(404).json({ success: false, message: "Profissional não encontrado." })
    }
    res.status(200).json({ success: true, data: profissional })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

//criar novo profissional
export const createProfissional = async (req, res) => {
  try {
    const novo = await criarProfissional(req.body)
    res.status(201).json({ success: true, data: novo })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
};

//atualizar profissional
export const updateProfissional = async (req, res) => {
  try{
    const { id } = req.params
    const atualizado = await atualizarProfissional(id, req.body)
    if (!atualizado) {
      return res.status(404).json({ success: false, message: "Profissional não encontrado." })
    }
    res.status(200).json({ success: true, message: "Profissional atualizado com sucesso.", data: atualizado })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

//deletar profissional
export const deleteProfissional = async (req, res) => {
  try{
    const { id } = req.params
    const removido = await deletarProfissional(id)
    if (!removido) {
      return res.status(404).json({ success: false, message: "Profissional não encontrado." })
    }
    res.status(200).json({ success: true, message: "Profissional removido com sucesso." })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};