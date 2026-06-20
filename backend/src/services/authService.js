// Usa bcrypt instalado no projeto para comparação de senha.
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Faturista from '../models/faturista.js';
import { criarFaturista } from './faturistaService.js';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  port: Number(process.env.EMAIL_PORT || 2525),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const criarHashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

class AuthService {
  async login(email, senha) {
    const emailFormatado = String(email).trim().toLowerCase();
    const faturista = await Faturista.busca_faturista_email(emailFormatado);

    if (!faturista) {
      throw new Error('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(senha, faturista.senha);
    if (!senhaValida) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: faturista.id, email: faturista.email, nome: faturista.nome },
      process.env.JWT_SECRET || 'chave_secreta_padrao',
      { expiresIn: '8h' }
    );

    return {
      token,
      faturista: { id: faturista.id, nome: faturista.nome, email: faturista.email }
    };
  }

  async recuperarSenha(email) {
    const emailFormatado = String(email).trim().toLowerCase();
    const faturista = await Faturista.busca_faturista_email(emailFormatado);

    if (!faturista) {
      throw new Error('E-mail não encontrado');
    }
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Serviço de e-mail não configurado.');
    }

    const tokenRecuperacao = crypto.randomBytes(32).toString('hex');
    const tokenHash = criarHashToken(tokenRecuperacao);
    const expiraEm = new Date(Date.now() + 60 * 60 * 1000);

    await Faturista.salvar_token_recuperacao(faturista.id, tokenHash, expiraEm);

    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
    const linkRecuperacao = `${frontendUrl}/definir-nova-senha?token=${tokenRecuperacao}`;

    // dispara o email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Suporte BPA" <suporte@sistemabpa.com>',
      to: faturista.email,
      subject: "Recuperação de Senha - Faturista",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Olá, ${faturista.nome}!</h2>
          <p>Recebemos uma solicitação para redefinir a senha da sua conta de Faturista no sistema BPA.</p>
          <p>Para escolher uma nova senha, clique no botão abaixo:</p>
          <a href="${linkRecuperacao}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0;">
            Redefinir Minha Senha
          </a>
          <p style="font-size: 12px; color: #666;">Se você não solicitou essa alteração, pode ignorar este e-mail com segurança.</p>
        </div>
      `,
    });
    return {
      email: faturista.email,
      nome: faturista.nome
    };
  }

  async redefinirSenha(credencialRecuperacao, novaSenha) {
    if (!credencialRecuperacao || !novaSenha) {
      throw new Error('Link de recuperação e nova senha são obrigatórios.');
    }

    const credencial = String(credencialRecuperacao).trim();
    const pareceEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credencial);
    const faturista = pareceEmail
      ? await Faturista.busca_faturista_email(credencial.toLowerCase())
      : await Faturista.busca_faturista_token_recuperacao(criarHashToken(credencial));

    if (!faturista) {
      throw new Error('Link de recuperação inválido ou expirado.');
    }

    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,}$/;
    if (!senhaRegex.test(novaSenha)) {
      throw new Error(
        'Senha inválida. Deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 símbolo.'
      );
    }

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(novaSenha, salt);

    await Faturista.atualizar_senha_faturista(faturista.id, senhaCriptografada);
    await Faturista.limpar_token_recuperacao(faturista.id);

    return {
      id: faturista.id,
      email: faturista.email
    };
  }

  async register({ nome, email, senha, cpf, telefone }) {
    if (!nome || !email || !senha || !cpf) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
    }

    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,}$/;
    if (!senhaRegex.test(senha)) {
      throw new Error(
        'Senha inválida. Deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 símbolo.'
      );
    }

    const cpfLimpo = String(cpf).replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      throw new Error('CPF inválido. Deve conter 11 dígitos.');
    }

    // Cria o faturista no banco e gera token JWT para o login automático.
    const novoFaturista = await criarFaturista({ nome, email, senha, cpf: cpfLimpo, telefone });

    const token = jwt.sign(
      { id: novoFaturista.id, email: novoFaturista.email, nome: novoFaturista.nome },
      process.env.JWT_SECRET || 'chave_secreta_padrao',
      { expiresIn: '8h' }
    );

    return {
      token,
      faturista: { id: novoFaturista.id, nome: novoFaturista.nome, email: novoFaturista.email }
    };
  }
}
export default new AuthService();
