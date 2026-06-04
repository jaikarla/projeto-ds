// Usa bcrypt instalado no projeto para comparação de senha.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Faturista from '../models/faturista.js';
import { criarFaturista } from './faturistaService.js';

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

    return {
      email: faturista.email,
      nome: faturista.nome
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