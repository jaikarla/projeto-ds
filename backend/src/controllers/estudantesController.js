import {
  listarEstudantes,
  buscarEstudantePorId,
  criarEstudante,
  atualizarEstudante,
  deletarEstudante
} from "../services/estudantesService.js";

//listar todos os estudantes
export const getEstudantes = (req, res) => {
  const estudantes = listarEstudantes();

  res.status(200).json({
    succes: true,
    data: estudantes
  });
};

//bucar por id
export const getEstudanteById = (req, res) => {
  const { id } = req.params;
  const estudante = buscarEstudantePorId(id);

  //se não encontrar o estudante, retorna 404
  if(!estudante) {
    return res.status(404).json({
      success: false,
      message: "Estudante não encontrado"
    });
  }

  res.status(200).json({
    success: true,
    data: estudante
  });
}

//criar novo estudante
export const createEstudante = (req, res) => {
  const { nome, dataNascimento, cpf } = req.body;
  try {const novo = criarEstudante(req.body);
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

//atualizar estudante
export const updateEstudante = (req, res) => {
  const { id } = req.params;
  const atualizado = atualizarEstudante(id, req.body);

  if(!atualizado) {
    return res.status(404).json({
      success: false,
      message: "Estudante não encontrado."
    });
  }

  res.status(200).json({
    success: true,
    message: "Estudante atualizado com sucesso.",
    data: atualizado
  });
};

//deletar estudante
export const deleteEstudante = (req, res) => {
  const { id } = req.params;
  const removido = deletarEstudante(id);

  if (!removido) {
    return res.status(404).json({
      success: false,
      message: "Estudante não encontrado"
    });
  }

  res.status(200).json({
    success: true,
    message: "Estudante removido com sucesso"
  });
};