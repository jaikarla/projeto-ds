import { describe, it, expect, vi, afterEach } from 'vitest';
import authService from '../services/authService.js';
import bcrypt from 'bcrypt';
import Faturista from '../models/faturista.js';
import { criarFaturista } from '../services/faturistaService.js';
import { sendPasswordResetEmail } from '../services/emailService.js';

vi.mock('../models/faturista.js', () => ({
  default: {
    busca_faturista_email: vi.fn(),
    busca_faturista_token_recuperacao: vi.fn(),
    salvar_token_recuperacao: vi.fn(),
    atualizar_senha_faturista: vi.fn(),
  },
}));

vi.mock('../services/faturistaService.js', () => ({
  criarFaturista: vi.fn(),
}));

vi.mock('../services/emailService.js', () => ({
  sendPasswordResetEmail: vi.fn(),
}));

vi.mock('bcrypt', () => ({
  default: {
    compare: vi.fn(),
    genSalt: vi.fn(),
    hash: vi.fn(),
  },
}));

describe('AuthService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Deve lancar erro de "Credenciais invalidas" se a senha estiver incorreta', async () => {
    Faturista.busca_faturista_email.mockResolvedValue({
      id: 1,
      email: 'teste@teste.com',
      senha: 'senhaCriptografada'
    });

    bcrypt.compare.mockResolvedValue(false);

    await expect(authService.login('teste@teste.com', 'senhaErrada'))
      .rejects
      .toThrow('Credenciais invalidas');
  });

  it('Deve retornar token e dados do usuario com credenciais corretas', async () => {
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

  it('Deve gerar token de recuperacao, salvar hash e enviar e-mail', async () => {
    Faturista.busca_faturista_email.mockResolvedValue({
      id: 1,
      nome: 'Admin',
      email: 'teste@teste.com',
    });
    Faturista.salvar_token_recuperacao.mockResolvedValue();
    sendPasswordResetEmail.mockResolvedValue({ provider: 'resend' });

    const resultado = await authService.recuperarSenha(' TESTE@TESTE.COM ');

    expect(resultado).toEqual({ emailSolicitado: 'teste@teste.com', enviado: true });
    expect(Faturista.salvar_token_recuperacao).toHaveBeenCalledWith(
      1,
      expect.stringMatching(/^[a-f0-9]{64}$/),
      expect.any(Date)
    );
    expect(sendPasswordResetEmail).toHaveBeenCalledWith({
      to: 'teste@teste.com',
      nome: 'Admin',
      resetLink: expect.stringMatching(/^http:\/\/localhost:5173\/definir-nova-senha\?token=[a-f0-9]{64}$/),
    });
  });

  it('Nao deve revelar se o e-mail de recuperacao nao existir', async () => {
    Faturista.busca_faturista_email.mockResolvedValue(null);

    const resultado = await authService.recuperarSenha('ausente@teste.com');

    expect(resultado).toEqual({ emailSolicitado: 'ausente@teste.com', enviado: false });
    expect(sendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it('Deve redefinir senha com token valido e limpar token salvo', async () => {
    Faturista.busca_faturista_token_recuperacao.mockResolvedValue({
      id: 1,
      email: 'teste@teste.com',
    });
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('senhaCriptografadaNova');

    const resultado = await authService.redefinirSenha('token-valido', 'Senha123!');

    expect(resultado).toEqual({ id: 1, email: 'teste@teste.com' });
    expect(Faturista.busca_faturista_token_recuperacao).toHaveBeenCalledWith(
      expect.stringMatching(/^[a-f0-9]{64}$/)
    );
    expect(Faturista.atualizar_senha_faturista).toHaveBeenCalledWith(1, 'senhaCriptografadaNova');
  });

  it('Deve rejeitar link de recuperacao invalido ou expirado', async () => {
    Faturista.busca_faturista_token_recuperacao.mockResolvedValue(null);

    await expect(authService.redefinirSenha('token-expirado', 'Senha123!'))
      .rejects
      .toThrow('Link de recuperacao invalido ou expirado.');
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

  it('Deve rejeitar senha que nao tem simbolo', async () => {
    await expect(authService.register({
      nome: 'Admin',
      email: 'teste@teste.com',
      senha: 'Senha1234',
      cpf: '12345678900'
    })).rejects.toThrow(
      'Senha invalida. Deve ter no minimo 6 caracteres, 1 letra maiuscula, 1 letra minuscula e 1 simbolo.'
    );
  });

  it('Deve rejeitar senha com menos de 6 caracteres', async () => {
    await expect(authService.register({
      nome: 'Admin',
      email: 'teste@teste.com',
      senha: 'S1!a',
      cpf: '12345678900'
    })).rejects.toThrow(
      'Senha invalida. Deve ter no minimo 6 caracteres, 1 letra maiuscula, 1 letra minuscula e 1 simbolo.'
    );
  });
});
