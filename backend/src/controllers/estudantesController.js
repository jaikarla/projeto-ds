//controllers para estudantes
export const getEstudantes = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Listando estudantes",
    data: []
  });
};

//controller para buscar estudante por id
export const getEstudanteById = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Buscando estudante ${req.params.id}`
  });
};

//controller para criar estudante
export const createEstudante = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Estudante criado com sucesso",
    data: req.body
  });
};

//controller para atualizar estudante
export const updateEstudante = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Estudante ${req.params.id} atualizado`
  });
};

//controller para deletar estudante
export const deleteEstudante = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Estudante ${req.params.id} removido`
  });
};