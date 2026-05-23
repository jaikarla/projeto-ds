export function middlewareValidaCadastro(req, res, next) {
  const { nome, email, senha, cpf, cns_profissional } = req.body;
  const erros = {};

  // Validações básicas e diretas
  if (!nome || nome.trim() === "") erros.nome = "O nome é obrigatório.";
  if (!email || !email.includes("@")) erros.email = "Insira um e-mail válido.";
  if (!senha || senha.length < 6) erros.senha = "A senha deve ter no mínimo 6 caracteres.";
  
  // O CPF precisa ter exatamente 11 números (removendo pontos e traços)
  const cpfLimpo = cpf ? cpf.replace(/\D/g, '') : "";
  if (cpfLimpo.length !== 11) erros.cpf = "O CPF deve conter 11 dígitos numéricos.";

  // O CNS (Cartão Nacional de Saúde) exige 15 dígitos
  const cnsLimpo = cns_profissional ? cns_profissional.replace(/\D/g, '') : "";
  if (cnsLimpo.length !== 15) erros.cns_profissional = "O CNS deve conter 15 dígitos.";

  // Se o objeto 'erros' tiver alguma coisa, barra e responde com status 400
  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ 
      status: "error", 
      message: "Falha na validação dos dados", 
      errors: erros 
    });
  }

  // Se os dados estiverem perfeitos, a requisição segue adiante
  next();
}