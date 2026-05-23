import authService from '../services/authService.js';

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Validação básica de campos obrigatórios
      if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha são campos obrigatórios.' });
      }

      // Validação de formato de e-mail usando regex simples
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ erro: 'Formato de e-mail inválido.' });
      }

      // Chamada ao serviço
      const resultado = await authService.login(email, senha);

      // Sucesso -> Redirecionamento/Dashboard será lidado pelo Frontend usando este token
      return res.status(200).json({
        mensagem: 'Autenticação realizada com sucesso!',
        dados: resultado
      });

    } catch (error) {
      // Credenciais incorretas cai aqui
      if (error.message === 'Credenciais inválidas') {
        return res.status(401).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
  }
}
export default new AuthController();