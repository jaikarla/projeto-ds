import {
  listarPacientes,
  buscarPacientePorId,
  criarPaciente,
  atualizarPaciente,
  deletarPaciente
} from "../services/pacienteService.js";

//listar todos os pacientes
export const getPacientes = async (req, res) => {
  try {
    const pacientes = await listarPacientes();
    res.status(200).json({ success: true, data: pacientes })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

//bucar por id
export const getPacienteById =  async (req, res) => {
  try{
    const { id } = req.params;
    const paciente = await buscarPacientePorId(id);

    //se não encontrar o paciente, retorna 404
     if (!paciente) {
      return res.status(404).json({ success: false, message: "Paciente não encontrado" })
    }
    res.status(200).json({ success: true, data: paciente })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};


//criar novo paciente
export const createPaciente = async (req, res) => {
  try{
    const novo = await criarPaciente(req.body)
    res.status(201).json({ success: true, data: novo })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
};

//atualizar paciente
export const updatePaciente = async (req, res) => {
  try{
    const { id } = req.params
    const atualizado = await atualizarPaciente(id, req.body)
    if (!atualizado) {
      return res.status(404).json({ success: false, message: "Paciente não encontrado." })
    }
    res.status(200).json({ success: true, message: "Paciente atualizado com sucesso.", data: atualizado })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

//deletar paciente
export const deletePaciente = async (req, res) => {
  try{
    const { id } = req.params
    const paciente = await deletarPaciente(id)
    if (!paciente) {
      return res.status(404).json({ success: false, message: "Paciente não encontrado" })
    }
    res.status(200).json({ success: true, message: "Paciente removido com sucesso" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};