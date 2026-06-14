import { describe, test, expect, beforeEach, vi } from 'vitest';
import { criarProcedimento } from '../services/procedimentoService.js';
import { validaProcedimento } from '../middlewares/validaProcedimento.js';
import Procedimento from '../models/procedimento.js';

// Simulando o Banco de Dados
vi.mock('../models/procedimento.js', () => ({
  default: {
    buscar_procedimento_codigo: vi.fn(),
    criar_procedimento: vi.fn(),
  }
}));

describe('Testes para Procedimentos (Service e Middleware)', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpa a memória antes de cada teste
  });

  // ==========================================
  // 1. TESTES DO SERVICE (Regras de Banco)
  // ==========================================
  describe('Testes do Service (procedimentoService.js)', () => {
    test('Deve criar um procedimento válido (Caminho Feliz)', async () => {
      Procedimento.buscar_procedimento_codigo.mockResolvedValue(null);
      Procedimento.criar_procedimento.mockResolvedValue({ id: 1, nome: 'Consulta', codigo: '12345', tipo: 'BPA-C' });

      const resultado = await criarProcedimento({ nome: 'Consulta', codigo: '12345', tipo: 'BPA-C' });
      expect(resultado).toHaveProperty('id', 1);
    });

    test('Deve exibir erro para código já cadastrado (duplicado no banco)', async () => {
      // Finge que o banco encontrou o código já cadastrado
      Procedimento.buscar_procedimento_codigo.mockResolvedValue({ id: 1, codigo: '12345' });

      await expect(criarProcedimento({ codigo: '12345' }))
        .rejects.toThrow();
    });
  });

  // ==========================================
  // 2. TESTES DO MIDDLEWARE (Regras de Formato)
  // ==========================================
  describe('Testes do Middleware (validaProcedimento.js)', () => {
    let req, res, next;

    beforeEach(() => {
      // Simula a requisição do Express (req, res, next)
      req = { body: {} };
      res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      };
      next = vi.fn();
    });

    test('Deve exibir erro quando campo obrigatório (nome) estiver vazio', () => {
      req.body = { codigo: '1234567890', tipo: 'BPA-C' }; // Sem nome
      validaProcedimento(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
      expect(next).not.toHaveBeenCalled(); // Não deve prosseguir
    });

    test('Deve exibir erro para código com mais de 10 dígitos', () => {
      req.body = { nome: 'Raio-X', codigo: '12345678901', tipo: 'BPA-I' }; // 11 dígitos
      validaProcedimento(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
      expect(next).not.toHaveBeenCalled();
    });

    test('Deve exibir erro para tipo diferente de BPA-C ou BPA-I', () => {
      req.body = { nome: 'Sessão de Fisioterapia', codigo: '123456', tipo: 'BPA-Z' }; // Tipo inválido
      validaProcedimento(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
      expect(next).not.toHaveBeenCalled();
    });

    test('Deve chamar next() se todos os dados do middleware estiverem corretos', () => {
      req.body = { nome: 'Consulta', codigo: '12345', tipo: 'BPA-C' };
      validaProcedimento(req, res, next);
      
      expect(next).toHaveBeenCalled(); // Pode prosseguir para o Service!
    });
  });
});