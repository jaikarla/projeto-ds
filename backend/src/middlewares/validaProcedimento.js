export const validaProcedimento = (req, res, next) => {
  const { nome, codigo, tipo } = req.body;

  // Regra A: nome, c�digo e tipo s�o obrigat�rios
  if (!nome || !codigo || !tipo) {
    return res.status(400).json({ 
      success: false, 
      message: "Nome, c�digo e tipo s�o obrigat�rios." 
    });
  }

  // Regra B: O c�digo s� permite at� 10 d�gitos num�ricos
  const regexCodigo = /^\d{1,10}$/;
  if (!regexCodigo.test(codigo)) {
    return res.status(400).json({ 
      success: false, 
      message: "O c�digo deve conter apenas n�meros e no m�ximo 10 d�gitos." 
    });
  }

  // Regra C: O tipo s� aceita BPA-C ou BPA-I
  if (tipo !== 'BPA-C' && tipo !== 'BPA-I') {
    return res.status(400).json({ 
      success: false, 
      message: "O tipo deve ser exclusivamente BPA-C ou BPA-I." 
    });
  }

  // Se passou em tudo, vai para o controller
  next();
};