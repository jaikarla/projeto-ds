import { describe, test, expect, beforeEach, vi } from "vitest";

import { 
  criarNovoAtendimento, 
  atualizarAtendimentoExistente, 
  listarAtendimentos, 
  buscarAtendimentoPorId, 
  deletarAtendimentoExistente 
} from "../services/atendimentoService.js";

import Atendimento from '../models/atendimento.js';

// MOCKS -----------
vi.mock('../models/atendimento.js', () => ({
  default: {
    criar_atendimento: vi.fn(),
    atualizar_atendimento: vi.fn(),
    buscar_atendimentos: vi.fn(),
    buscar_atendimento_id: vi.fn(),
    remover_atendimento: vi.fn()
  }
}));

// DADOS AUXILIARES PARA OS TESTES -----------
const procedimentoValidoFake = { id: 99 };
const dataPassada = '2023-01-01T10:00:00Z'; // Data garantida no passado
const dataFutura = '2050-12-31T10:00:00Z'; // Data garantida no futuro

describe("Testes para criarNovoAtendimento", () => {
  beforeEach(() => { vi.clearAllMocks(); });

  test("Deve criar um atendimento válido com todos os dados preenchidos", async () => {
    Atendimento.criar_atendimento.mockResolvedValue({ id: 1, status: 'criado' });

    const dadosEntrada = {
      data_atendimento: dataPassada,
      cid: 'A00',
      paciente_id: 10,
      profissional_id: 5,
      quantidade: 2
    };

    const resultado = await criarNovoAtendimento(dadosEntrada, procedimentoValidoFake);

    expect(resultado.id).toBe(1);
    expect(Atendimento.criar_atendimento).toHaveBeenCalledWith({
      data_atendimento: dataPassada,
      cid: 'A00',
      paciente_id: 10,
      profissional_id: 5,
      procedimentos: [{ procedimento_id: 99, quantidade: 2 }]
    });
  });

  test("Deve criar um atendimento aplicando valores default (quantidade 1 e campos null)", async () => {
    Atendimento.criar_atendimento.mockResolvedValue({ id: 2 });

    const dadosEntradaIncompletos = {
      data_atendimento: dataPassada,
      profissional_id: 5
      // cid, paciente_id e quantidade omitidos propositalmente
    };

    await criarNovoAtendimento(dadosEntradaIncompletos, procedimentoValidoFake);

    expect(Atendimento.criar_atendimento).toHaveBeenCalledWith(expect.objectContaining({
      cid: null,
      paciente_id: null,
      procedimentos: [{ procedimento_id: 99, quantidade: 1 }]
    }));
  });

  test("Deve exibir erro ao tentar criar atendimento com data no futuro", async () => {
    const dadosDataFutura = {
      data_atendimento: dataFutura,
      profissional_id: 5
    };

    await expect(
      criarNovoAtendimento(dadosDataFutura, procedimentoValidoFake)
    ).rejects.toThrow('DATA_FUTURA');
  });
});

describe("Testes para atualizarAtendimentoExistente", () => {
  beforeEach(() => { vi.clearAllMocks(); });

  test("Deve atualizar um atendimento válido", async () => {
    Atendimento.atualizar_atendimento.mockResolvedValue({ id: 1, status: 'atualizado' });

    const dadosEntrada = {
      data_atendimento: dataPassada,
      cid: 'B01',
      paciente_id: 15,
      profissional_id: 7,
      quantidade: 3
    };

    const resultado = await atualizarAtendimentoExistente(1, dadosEntrada, procedimentoValidoFake);

    expect(resultado.status).toBe('atualizado');
    expect(Atendimento.atualizar_atendimento).toHaveBeenCalledWith(1, {
      data_atendimento: dataPassada,
      cid: 'B01',
      paciente_id: 15,
      profissional_id: 7,
      procedimentos: [{ procedimento_id: 99, quantidade: 3 }]
    });
  });

  test("Deve exibir erro ao tentar atualizar atendimento com data no futuro", async () => {
    const dadosDataFutura = {
      data_atendimento: dataFutura,
      profissional_id: 7
    };

    await expect(
      atualizarAtendimentoExistente(1, dadosDataFutura, procedimentoValidoFake)
    ).rejects.toThrow('DATA_FUTURA');
  });
});

describe("Testes para métodos de listagem e exclusão", () => {
  beforeEach(() => { vi.clearAllMocks(); });

  test("Deve listar todos os atendimentos", async () => {
    const listaMock = [{ id: 1 }, { id: 2 }];
    Atendimento.buscar_atendimentos.mockResolvedValue(listaMock);

    const resultado = await listarAtendimentos();

    expect(resultado).toEqual(listaMock);
    expect(Atendimento.buscar_atendimentos).toHaveBeenCalledTimes(1);
  });

  test("Deve buscar um atendimento específico por ID", async () => {
    const atendimentoMock = { id: 5, paciente_id: 10 };
    Atendimento.buscar_atendimento_id.mockResolvedValue(atendimentoMock);

    const resultado = await buscarAtendimentoPorId(5);

    expect(resultado.id).toBe(5);
    expect(Atendimento.buscar_atendimento_id).toHaveBeenCalledWith(5);
  });

  test("Deve deletar um atendimento existente", async () => {
    Atendimento.remover_atendimento.mockResolvedValue(true);

    const resultado = await deletarAtendimentoExistente(10);

    expect(resultado).toBe(true);
    expect(Atendimento.remover_atendimento).toHaveBeenCalledWith(10);
  });
});