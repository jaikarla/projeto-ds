import { describe, test, expect, beforeEach, vi } from 'vitest';
import { criarProcedimento } from '../services/procedimentoService.js';
import Procedimento from '../models/procedimento.js';

// Simulando (Mocking) o Banco de Dados
vi.mock('../models/procedimento.js', () => ({
  default: {
    buscar_procedimento_codigo: vi.fn(),
    criar_procedimento: vi.fn(),
  }
}));

describe('Testes para criar procedimentos', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpa a memória antes de cada teste
  });

  // Caminho Feliz
  test('Deve criar um procedimento válido', async () => {
    Procedimento.buscar_procedimento_codigo.mockResolvedValue(null);
    Procedimento.criar_procedimento.mockResolvedValue({
      id: 1,
      nome: 'Consulta Médica Especializada',
      codigo: '1234567890',
      tipo: 'BPA-C'
    });

    const resultado = await criarProcedimento({
      nome: 'Consulta Médica Especializada',
      codigo: '1234567890',
      tipo: 'BPA-C'
    });

    expect(resultado).toHaveProperty('nome', 'Consulta Médica Especializada');
  });

  // 2. Regra de Negócio A (Campos Obrigatórios)
  test('Deve exibir erro quando campo obrigatório (nome) estiver vazio', async () => {
    await expect(criarProcedimento({
      codigo: '1234567890',
      tipo: 'BPA-C'
      // nome faltando intencionalmente
    })).rejects.toThrow();
  });

  // 3. Regra de Negócio B (Máximo de 10 dígitos)
  test('Deve exibir erro para código com mais de 10 dígitos numéricos', async () => {
    await expect(criarProcedimento({
      nome: 'Raio-X',
      codigo: '12345678901', // 11 dígitos
      tipo: 'BPA-I'
    })).rejects.toThrow();
  });

  // 4. Regra de Negócio B (Código Único)
  test('Deve exibir erro para código já cadastrado (duplicado)', async () => {
    // Finge que o banco encontrou o código já cadastrado
    Procedimento.buscar_procedimento_codigo.mockResolvedValue({ id: 1, codigo: '12345' });

    await expect(criarProcedimento({
      nome: 'Exame de Sangue',
      codigo: '12345',
      tipo: 'BPA-C'
    })).rejects.toThrow();
  });

  // 5. Regra de Negócio C (Tipo restrito)
  test('Deve exibir erro para tipo diferente de BPA-C ou BPA-I', async () => {
    await expect(criarProcedimento({
      nome: 'Sessão de Fisioterapia',
      codigo: '123456',
      tipo: 'BPA-Z' // Tipo inválido
    })).rejects.toThrow();
  });
});