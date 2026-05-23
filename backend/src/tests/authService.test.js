import { describe, it, expect, vi, afterEach } from 'vitest';
import authService from '../services/authService.js';
import db from '../config/db.js';
import bcrypt from 'bcrypt';

vi.mock('../config/db.js', () => ({
  default: {
    query: vi.fn(),
  },
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
    db.query.mockResolvedValue({
      rows: [{ id: 1, email: 'teste@teste.com', senha: 'senhaCriptografada' }]
    });

    bcrypt.compare.mockResolvedValue(false);

    await expect(authService.login('teste@teste.com', 'senhaErrada'))
      .rejects
      .toThrow('Credenciais inválidas');
  });

  it('Deve retornar token e dados do usuário com credenciais corretas', async () => {
    db.query.mockResolvedValue({
      rows: [{ id: 1, email: 'teste@teste.com', senha: 'senhaCriptografada', nome: 'Admin' }]
    });
    bcrypt.compare.mockResolvedValue(true);

    const resultado = await authService.login('teste@teste.com', 'senhaCorreta');

    expect(resultado).toHaveProperty('token');
    expect(resultado.faturista).toHaveProperty('email', 'teste@teste.com');
  });
});