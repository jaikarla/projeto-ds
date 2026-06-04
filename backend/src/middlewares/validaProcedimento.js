export const validaProcedimento = (req, res, next) => {
  const { nome, codigo, tipo } = req.body;

  // Regra A: nome, código e tipo são obrigatórios
  if (!nome || !codigo || !tipo) {
    return res.status(400).json({ 
      success: false, 
      message: "Nome, código e tipo são obrigatórios." 
    });
  }

  // Regra B: O código só permite até 10 dígitos numéricos
  const regexCodigo = /^\d{1,10}$/;
  if (!regexCodigo.test(codigo)) {
    return res.status(400).json({ 
      success: false, 
      message: "O código deve conter apenas números e no máximo 10 dígitos." 
    });
  }

  // Regra C: O tipo só aceita BPA-C ou BPA-I
  if (tipo !== 'BPA-C' && tipo !== 'BPA-I') {
    return res.status(400).json({ 
      success: false, 
      message: "O tipo deve ser exclusivamente BPA-C ou BPA-I." 
    });
  }

  // Se passou em tudo, vai para o controller
  next();
};