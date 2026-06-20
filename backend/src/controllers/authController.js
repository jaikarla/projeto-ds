import authService from '../services/authService.js';

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha sao campos obrigatorios.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ erro: 'Formato de e-mail invalido.' });
      }

      const resultado = await authService.login(email, senha);

      return res.status(200).json({
        mensagem: 'Autenticacao realizada com sucesso!',
        dados: resultado
      });
    } catch (error) {
      if (error.message === 'Credenciais invalidas') {
        return res.status(401).json({ erro: error.message });
      }

      return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
  }

  async register(req, res) {
    try {
      const { nome, email, senha, cpf, telefone } = req.body;

      if (!nome || !email || !senha || !cpf) {
        return res.status(400).json({ erro: 'Nome, e-mail, CPF e senha sao obrigatorios.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ erro: 'Formato de e-mail invalido.' });
      }

      const resultado = await authService.register({ nome, email, senha, cpf, telefone });

      return res.status(201).json({
        mensagem: 'Cadastro realizado com sucesso!',
        dados: resultado
      });
    } catch (error) {
      if (error.message === 'E-mail ja cadastrado' || error.message === 'CPF ja cadastrado') {
        return res.status(409).json({ erro: error.message });
      }

      return res.status(400).json({ erro: error.message || 'Erro interno no servidor.' });
    }
  }

  async recuperarSenha(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ erro: 'E-mail e obrigatorio.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ erro: 'Formato de e-mail invalido.' });
      }

      const resultado = await authService.recuperarSenha(email);

      return res.status(200).json({
        mensagem: 'Se o e-mail estiver cadastrado, enviaremos as instrucoes de recuperacao.',
        dados: resultado
      });
    } catch (error) {
      return res.status(502).json({
        erro: 'Nao foi possivel enviar o e-mail de recuperacao agora. Tente novamente em alguns minutos.'
      });
    }
  }

  async redefinirSenha(req, res) {
    try {
      const { token, novaSenha } = req.body;

      const resultado = await authService.redefinirSenha(token, novaSenha);

      return res.status(200).json({
        mensagem: 'Senha redefinida com sucesso!',
        dados: resultado
      });
    } catch (error) {
      if (error.message === 'Link de recuperacao invalido ou expirado.') {
        return res.status(400).json({ erro: error.message });
      }

      return res.status(400).json({ erro: error.message || 'Erro interno no servidor.' });
    }
  }
}

export default new AuthController();
