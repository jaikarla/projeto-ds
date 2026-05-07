//controller para profissionais
export const getProfissionais = (req, res) => {
  res.status(200).json({ 
    success: true,
    message: "Listando profissionais",
    data: []
  });
};

//controller para buscar profissional por id
export const getProfissionalById = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Buscando profissional ${req.params.id}`
  });
};

//controller para criar profissional
export const createProfissional = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Profissional criado com sucesso",
    data: req.body
  });
};

//controller para atualizar profissional
export const updateProfissional = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Profissional ${req.params.id} atualizado`
  });
};

//controller para deletar profissional
export const deleteProfissional = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Profissional ${req.params.id} removido`
  });
};