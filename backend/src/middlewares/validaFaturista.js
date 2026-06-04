export const middlewareValidaCadastro = (req, res, next) => {
  const { nome, email, cpf, telefone, senha } = req.body;

  // 1. Verifica se todos os campos existem (Telefone adicionado como obrigatório)
  if (!nome || !email || !cpf || !telefone || !senha) {
    return res.status(400).json({ status: "error", message: "Todos os campos são obrigatórios!" });
  }

  // 2. Valida o formato do Telefone: (XX)XXXXXXXXX
  // Regra: Parênteses obrigatórios + 2 dígitos pro DDD + 9 dígitos pro número
  const regexTelefone = /^\(\d{2}\)\d{9}$/;
  if (!regexTelefone.test(telefone)) {
    return res.status(400).json({ 
      status: "error", 
      message: "O telefone deve estar no formato (XX)XXXXXXXXX, contendo exatamente 11 dígitos numéricos." 
    });
  }

  // 3. Valida o tamanho do CPF (deve ter 11 números, já que vamos remover os pontos depois)
  const cpfLimpo = String(cpf).replace(/\D/g, '');
  if (cpfLimpo.length !== 11) {
    return res.status(400).json({ status: "error", message: "CPF inválido! Deve conter 11 dígitos." });
  }

  // Se passou por tudo, libera a passagem para o Controller
  next();
};