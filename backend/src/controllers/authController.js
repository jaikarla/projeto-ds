import authService from '../services/authService.js';

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha são campos obrigatórios.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ erro: 'Formato de e-mail inválido.' });
      }

      const resultado = await authService.login(email, senha);

      return res.status(200).json({
        mensagem: 'Autenticação realizada com sucesso!',
        dados: resultado
      });

    } catch (error) {
      if (error.message === 'Credenciais inválidas') {
        return res.status(401).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
  }

  async register(req, res) {
    try {
      const { nome, email, senha, cpf, telefone } = req.body;

      if (!nome || !email || !senha || !cpf) {
        return res.status(400).json({ erro: 'Nome, e-mail, CPF e senha são obrigatórios.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ erro: 'Formato de e-mail inválido.' });
      }

      const resultado = await authService.register({ nome, email, senha, cpf, telefone });

      return res.status(201).json({
        mensagem: 'Cadastro realizado com sucesso!',
        dados: resultado
      });

    } catch (error) {
      if (error.message === 'E-mail já cadastrado' || error.message === 'CPF já cadastrado') {
        return res.status(409).json({ erro: error.message });
      }
      return res.status(400).json({ erro: error.message || 'Erro interno no servidor.' });
    }
  }
}
export default new AuthController();