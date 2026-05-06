//controller para procedimentos
export const getProcedimentos = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Listando procedimentos",
    data: []
  });
};

//controller para procedimento por id
export const getProcedimentoById = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Buscando procedimento ${req.params.id}`
  });
};

//controller para criar procedimento
export const createProcedimento = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Procedimento criado com sucesso",
    data: req.body
  });
};

//controller para atualizar procedimento
export const updateProcedimento = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Procedimento ${req.params.id} atualizado`
  });
};

//controller para deletar procedimento
export const deleteProcedimento = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Procedimento ${req.params.id} removido`
  });
};