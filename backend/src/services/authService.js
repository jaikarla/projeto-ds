import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Faturista from '../models/faturista.js';
import { criarFaturista } from './faturistaService.js';
import { sendPasswordResetEmail } from './emailService.js';

const RESET_TOKEN_EXPIRATION_MS = 60 * 60 * 1000;
const PASSWORD_REQUIREMENTS_MESSAGE =
  'Senha invalida. Deve ter no minimo 6 caracteres, 1 letra maiuscula, 1 letra minuscula e 1 simbolo.';

function hashResetToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function validarSenha(senha) {
  const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,}$/;
  if (!senhaRegex.test(senha)) {
    throw new Error(PASSWORD_REQUIREMENTS_MESSAGE);
  }
}

class AuthService {
  async login(email, senha) {
    const emailFormatado = String(email).trim().toLowerCase();
    const faturista = await Faturista.busca_faturista_email(emailFormatado);

    if (!faturista) {
      throw new Error('Credenciais invalidas');
    }

    const senhaValida = await bcrypt.compare(senha, faturista.senha);
    if (!senhaValida) {
      throw new Error('Credenciais invalidas');
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
      return { emailSolicitado: emailFormatado, enviado: false };
    }

    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashResetToken(resetToken);
    const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRATION_MS);
    const linkRecuperacao = `${frontendUrl}/definir-nova-senha?token=${resetToken}`;

    await Faturista.salvar_token_recuperacao(faturista.id, tokenHash, expiresAt);

    await sendPasswordResetEmail({
      to: faturista.email,
      nome: faturista.nome,
      resetLink: linkRecuperacao,
    });

    return {
      emailSolicitado: emailFormatado,
      enviado: true
    };
  }

  async redefinirSenha(token, novaSenha) {
    if (!token || !novaSenha) {
      throw new Error('Token e nova senha sao obrigatorios.');
    }

    const tokenHash = hashResetToken(String(token).trim());
    const faturista = await Faturista.busca_faturista_token_recuperacao(tokenHash);
    if (!faturista) {
      throw new Error('Link de recuperacao invalido ou expirado.');
    }

    validarSenha(novaSenha);

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(novaSenha, salt);

    await Faturista.atualizar_senha_faturista(faturista.id, senhaCriptografada);

    return {
      id: faturista.id,
      email: faturista.email
    };
  }

  async register({ nome, email, senha, cpf, telefone }) {
    if (!nome || !email || !senha || !cpf) {
      throw new Error('Todos os campos obrigatorios devem ser preenchidos.');
    }

    validarSenha(senha);

    const cpfLimpo = String(cpf).replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      throw new Error('CPF invalido. Deve conter 11 digitos.');
    }

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
