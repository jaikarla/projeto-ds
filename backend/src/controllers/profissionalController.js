import {
  listarProfissionais,
  buscarProfissionalPorId,
  criarProfissional,
  atualizarProfissional,
  deletarProfissional
} from "../services/profissionalService.js";

//listar todos os profissionais
export const getProfissionais = (req, res) => {
  const profissionais = listarProfissionais();

  res.status(200).json({
    succes: true,
    data: profissionais
  });
};

//bucar por id
export const getProfissionalById = (req, res) => {
  const { id } = req.params;
  const profissional = buscarProfissionalPorId(id);

  //se não encontrar o profissional, retorna 404
  if(!profissional) {
    return res.status(404).json({
      success: false,
      message: "Profissional não encontrado."
    });
  }

  res.status(200).json({
    success: true,
    data: profissional
  });
}

//criar novo profissional
export const createProfissional = (req, res) => {
  try {const novo = criarProfissional(req.body);
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

//atualizar profissional
export const updateProfissional = (req, res) => {
  const { id } = req.params;
  const atualizado = atualizarProfissional(id, req.body);

  if(!atualizado) {
    return res.status(404).json({
      success: false,
      message: "Profissional não encontrado."
    });
  }

  res.status(200).json({
    success: true,
    message: "Profissional atualizado com sucesso.",
    data: atualizado
  });
};

//deletar profissional
export const deleteProfissional = (req, res) => {
  const { id } = req.params;
  const removido = deletarProfissional(id);

  if (!removido) {
    return res.status(404).json({
      success: false,
      message: "Profissional não encontrado."
    });
  }

  res.status(200).json({
    success: true,
    message: "Profissional removido com sucesso."
  });
};