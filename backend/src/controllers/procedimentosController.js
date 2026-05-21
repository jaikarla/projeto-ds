import {
  listarProcedimentos,
  buscarProcedimentoPorId,
  criarProcedimento,
  atualizarProcedimento,
  deletarProcedimento
} from "../services/procedimentoService.js";

//listar todos os procedimentos
export const getProcedimentos = async (req, res) => {
  const procedimentos = await listarProcedimentos();

  res.status(200).json({
    succes: true,
    data: procedimentos
  });
};

//bucar por id
export const getProcedimentoById = async (req, res) => {
  const { id } = req.params;
  const procedimento =  await buscarProcedimentoPorId(id);

  //se não encontrar o procedimento, retorna 404
  if(!procedimento) {
    return res.status(404).json({
      success: false,
      message: "Procedimento não encontrado"
    });
  }

  res.status(200).json({
    success: true,
    data: procedimento
  });
}

//criar novo procedimento
export const createProcedimento = async (req, res) => {
  const { nome, codigo } = req.body;

  //validação simples - pode ser expandida se necessário
  if(!nome || !codigo) {
    return res.status(400).json({
      success: false,
      message: "Nome e código são obrigatórios."
    });
  }

  const novo = await criarProcedimento(req.body);

  res.status(201).json({
    success: true,
    message: "Procedimento criado com sucesso.",
    data: novo
  });
};

//atualizar procedimento
export const updateProcedimento = async (req, res) => {
  const { id } = req.params;
  const atualizado = await atualizarProcedimento(id, req.body);

  if(!atualizado) {
    return res.status(404).json({
      success: false,
      message: "Procedimento não encontrado."
    });
  }

  res.status(200).json({
    success: true,
    message: "Procedimento atualizado com sucesso.",
    data: atualizado
  });
};

//deletar procedimento
export const deleteProcedimento = async (req, res) => {
  const { id } = req.params;
  const removido = await deletarProcedimento(id);

  if (!removido) {
    return res.status(404).json({
      success: false,
      message: "Procedimento não encontrado"
    });
  }

  res.status(200).json({
    success: true,
    message: "Procedimento removido com sucesso"
  });
};