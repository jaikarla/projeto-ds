//controller de autenticação
export const login = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Login realizado com sucesso"
  });
};

//para registrar um novo usuário, usando os dados enviados no corpo da requisição
export const register = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Usuário registrado com sucesso"
  });
};

//para obter informações do usuário autenticado
export const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dados do usuário"
  });
};