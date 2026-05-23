export const middlewareValidaCadastro = (req, res, next) => {
  const { nome, email, cpf, cns_profissional, senha } = req.body;

  // 1. Verifica se todos os campos existem
  if (!nome || !email || !cpf || !cns_profissional || !senha) {
    return res.status(400).json({ status: "error", message: "Todos os campos são obrigatórios!" });
  }

  // 2. Valida o tamanho do CPF (deve ter 11 números, já que vamos remover os pontos depois)
  const cpfLimpo = String(cpf).replace(/\D/g, '');
  if (cpfLimpo.length !== 11) {
    return res.status(400).json({ status: "error", message: "CPF inválido! Deve conter 11 dígitos." });
  }

  // 3. Valida o tamanho do CNS (o cartão SUS geralmente tem 15 dígitos)
  const cnsLimpo = String(cns_profissional).replace(/\D/g, '');
  if (cnsLimpo.length !== 15) {
    return res.status(400).json({ status: "error", message: "CNS inválido! Deve conter 15 dígitos." });
  }

  // Se passou por tudo, libera a passagem para o Controller
  next();
};