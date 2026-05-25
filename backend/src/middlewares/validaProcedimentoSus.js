import Procedimento from '../models/procedimento.js'; 

export const validaProcedimentoSus = async (req, res, next) => {
  const { codigo_sus, paciente_id } = req.body;

  if (!codigo_sus) {
    return res.status(400).json({ status: "error", message: "O código SUS é obrigatório." });
  }

  try {
    const procedimento = await Procedimento.buscar_procedimento_codigo(codigo_sus);

    if (!procedimento) {
      return res.status(404).json({ status: "error", message: "Código não encontrado." });
    }

    // A lógica de trava BPA-I
    if (procedimento.tipo === 'BPA-I' && !paciente_id) {
      return res.status(400).json({
        status: "error",
        message: `O procedimento '${procedimento.nome}' é BPA-I. Identificação do paciente é obrigatória.`
      });
    }

    req.procedimento = procedimento;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Erro interno no servidor." });
  }
};