import {
  listarEstudantes,
  buscarEstudantePorId,
  criarEstudante,
  atualizarEstudante,
  deletarEstudante
} from "../services/estudantesService.js";

//listar todos os estudantes
export const getEstudantes = async (req, res) => {
  try{
    const estudantes = await listarEstudantes()
    res.status(200).json({ success: true, data: estudantes })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

//bucar por id
export const getEstudanteById = async (req, res) => {
  try{
    const { id } = req.params;
  const estudante = await buscarEstudantePorId(id);

  //se não encontrar o estudante, retorna 404
  if (!estudante) {
      return res.status(404).json({ success: false, message: "Estudante não encontrado" })
    }
    res.status(200).json({ success: true, data: estudante })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

//criar novo estudante
export const createEstudante = async (req, res) => {
  try{
    const novo = await criarEstudante(req.body)
    res.status(201).json({ success: true, data: novo })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
};

//atualizar estudante
export const updateEstudante = async (req, res) => {
  try{
    const { id } = req.params
    const atualizado = await atualizarEstudante(id, req.body)
    if (!atualizado) {
      return res.status(404).json({ success: false, message: "Estudante não encontrado." })
    }
    res.status(200).json({ success: true, message: "Estudante atualizado com sucesso.", data: atualizado })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

//deletar estudante
export const deleteEstudante = async (req, res) => {
  try{
    const { id } = req.params
    const removido = await deletarEstudante(id)
    if (!removido) {
      return res.status(404).json({ success: false, message: "Estudante não encontrado" })
    }
    res.status(200).json({ success: true, message: "Estudante removido com sucesso" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};