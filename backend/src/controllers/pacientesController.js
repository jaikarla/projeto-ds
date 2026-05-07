//controllers de pacientes
export const getPacientes = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Listando pacientes",
    data: []
  });
};

//controller para buscar paciente por id
export const getPacienteById = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Buscando paciente ${req.params.id}`
  });
};

//controller para criar paciente
export const createPaciente = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Paciente criado com sucesso",
    data: req.body
  });
};

//controller para atualizar paciente
export const updatePaciente = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Paciente ${req.params.id} atualizado`
  });
};

//controller para deletar paciente
export const deletePaciente = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Paciente ${req.params.id} removido`
  });
};