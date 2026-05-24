import { describe, it, expect, vi, afterEach } from 'vitest';
import authService from '../services/authService.js';
import bcrypt from 'bcrypt';
import Faturista from '../models/faturista.js';
import { criarFaturista } from '../services/faturistaService.js';

vi.mock('../models/faturista.js', () => ({
  default: {
    busca_faturista_email: vi.fn(),
  },
}));

vi.mock('../services/faturistaService.js', () => ({
  criarFaturista: vi.fn(),
}));

vi.mock('bcrypt', () => ({
  default: {
    compare: vi.fn(),
  },
}));

describe('AuthService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Deve lançar erro de "Credenciais inválidas" se a senha estiver incorreta (Edge Case)', async () => {
    Faturista.busca_faturista_email.mockResolvedValue({
      id: 1,
      email: 'teste@teste.com',
      senha: 'senhaCriptografada'
    });

    bcrypt.compare.mockResolvedValue(false);

    await expect(authService.login('teste@teste.com', 'senhaErrada'))
      .rejects
      .toThrow('Credenciais inválidas');
  });

  it('Deve retornar token e dados do usuário com credenciais corretas', async () => {
    Faturista.busca_faturista_email.mockResolvedValue({
      id: 1,
      email: 'teste@teste.com',
      senha: 'senhaCriptografada',
      nome: 'Admin'
    });
    bcrypt.compare.mockResolvedValue(true);

    const resultado = await authService.login('teste@teste.com', 'senhaCorreta');

    expect(resultado).toHaveProperty('token');
    expect(resultado.faturista).toHaveProperty('email', 'teste@teste.com');
  });

  it('Deve cadastrar faturista e retornar token', async () => {
    criarFaturista.mockResolvedValue({
      id: 1,
      nome: 'Admin',
      email: 'teste@teste.com'
    });

    const resultado = await authService.register({
      nome: 'Admin',
      email: 'teste@teste.com',
      senha: 'Senha123!',
      cpf: '12345678900'
    });

    expect(resultado).toHaveProperty('token');
    expect(resultado.faturista).toHaveProperty('email', 'teste@teste.com');
  });

  it('Deve rejeitar senha que não tem símbolo', async () => {
    await expect(authService.register({
      nome: 'Admin',
      email: 'teste@teste.com',
      senha: 'Senha1234',
      cpf: '12345678900'
    })).rejects.toThrow(
      'Senha inválida. Deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 símbolo.'
    );
  });

  it('Deve rejeitar senha com menos de 6 caracteres', async () => {
    await expect(authService.register({
      nome: 'Admin',
      email: 'teste@teste.com',
      senha: 'S1!a',
      cpf: '12345678900'
    })).rejects.toThrow(
      'Senha inválida. Deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 símbolo.'
    );
  });
});