import {
  listarPacientes,
  buscarPacientePorId,
  criarPaciente,
  atualizarPaciente,
  deletarPaciente
} from "../services/pacienteService.js";

//listar todos os pacientes
export const getPacientes = (req, res) => {
  const pacientes = listarPacientes();

  res.status(200).json({
    succes: true,
    data: pacientes
  });
};

//bucar por id
export const getPacienteById = (req, res) => {
  const { id } = req.params;
  const paciente = buscarPacientePorId(id);

  //se não encontrar o paciente, retorna 404
  if(!paciente) {
    return res.status(404).json({
      success: false,
      message: "Paciente não encontrado"
    });
  }

  res.status(200).json({
    success: true,
    data: paciente
  });
}

//criar novo paciente
export const createPaciente = (req, res) => {
  const { nome, dataNascimento, cpf } = req.body;
  try { const novo = criarPaciente(req.body);
    res.status(201).json({
      success: true,
      data: novo
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

//atualizar paciente
export const updatePaciente = (req, res) => {
  const { id } = req.params;
  const atualizado = atualizarPaciente(id, req.body);

  if(!atualizado) {
    return res.status(404).json({
      success: false,
      message: "Paciente não encontrado."
    });
  }

  res.status(200).json({
    success: true,
    message: "Paciente atualizado com sucesso.",
    data: atualizado
  });
};

//deletar paciente
export const deletePaciente = (req, res) => {
  const { id } = req.params;
  const removido = deletarPaciente(id);

  if (!removido) {
    return res.status(404).json({
      success: false,
      message: "Paciente não encontrado"
    });
  }

  res.status(200).json({
    success: true,
    message: "Paciente removido com sucesso"
  });
};