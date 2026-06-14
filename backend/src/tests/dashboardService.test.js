import DashboardService from '../services/dashboardService.js'
import pool from '../config/db.js'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock do pool
vi.mock('../config/db.js', () => ({
  default: {
    query: vi.fn()
  }
}))

describe('DashboardService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getResumo', () => {
    it('deve retornar dados do dashboard sem filtro de data', async () => {
      // Mock dos dados
      const mockProfissionais = { rows: [{ total: '10' }] }
      const mockEstudantes = { rows: [{ total: '5' }] }
      const mockAtendimentos = { rows: [{ total: '25' }] }
      const mockProcedimentos = { rows: [{ total: '50' }] }
      const mockBpaI = { rows: [{ total: '15' }] }
      const mockBpaC = { rows: [{ total: '10' }] }
      const mockUltimosAtendimentos = {
        rows: [
          {
            id: 1,
            data_atendimento: '2024-01-15',
            paciente_nome: 'João Silva',
            profissional_nome: 'Dr. Carlos'
          }
        ]
      }

      pool.query
        .mockResolvedValueOnce(mockProfissionais)
        .mockResolvedValueOnce(mockEstudantes)
        .mockResolvedValueOnce(mockAtendimentos)
        .mockResolvedValueOnce(mockProcedimentos)
        .mockResolvedValueOnce(mockBpaI)
        .mockResolvedValueOnce(mockBpaC)
        .mockResolvedValueOnce(mockUltimosAtendimentos)

      const resultado = await DashboardService.getResumo()

      expect(resultado.cadastros.profissionais).toBe(10)
      expect(resultado.cadastros.estudantes).toBe(5)
      expect(resultado.producao.totalAtendimentos).toBe(25)
      expect(resultado.producao.totalProcedimentosDisponiveis).toBe(50)
      expect(resultado.atendimentosPorTipo.bpaI).toBe(15)
      expect(resultado.atendimentosPorTipo.bpaC).toBe(10)
      expect(resultado.ultimosAtendimentos.length).toBe(1)
      expect(resultado.periodo.dataInicio).toBeNull()
      expect(resultado.periodo.dataFim).toBeNull()
    })

    it('deve retornar dados com filtro de data', async () => {
      const mockProfissionais = { rows: [{ total: '10' }] }
      const mockEstudantes = { rows: [{ total: '5' }] }
      const mockAtendimentos = { rows: [{ total: '10' }] }
      const mockProcedimentos = { rows: [{ total: '50' }] }
      const mockBpaI = { rows: [{ total: '5' }] }
      const mockBpaC = { rows: [{ total: '5' }] }
      const mockUltimosAtendimentos = { rows: [] }

      pool.query
        .mockResolvedValueOnce(mockProfissionais)
        .mockResolvedValueOnce(mockEstudantes)
        .mockResolvedValueOnce(mockAtendimentos)
        .mockResolvedValueOnce(mockProcedimentos)
        .mockResolvedValueOnce(mockBpaI)
        .mockResolvedValueOnce(mockBpaC)
        .mockResolvedValueOnce(mockUltimosAtendimentos)

      const resultado = await DashboardService.getResumo('2024-01-01', '2024-01-31')
      const chamadas = pool.query.mock.calls

      expect(resultado.periodo.dataInicio).toBe('2024-01-01')
      expect(resultado.periodo.dataFim).toBe('2024-01-31')
      expect(chamadas[0][0]).toContain('data_cadastro >= $1::date')
      expect(chamadas[0][1]).toEqual(['2024-01-01', '2024-01-31'])
      expect(chamadas[1][0]).toContain('data_cadastro >= $1::date')
      expect(chamadas[1][1]).toEqual(['2024-01-01', '2024-01-31'])
      expect(chamadas[3][0]).toBe('SELECT COUNT(*) as total FROM procedimentos')
      expect(chamadas[3][1]).toBeUndefined()
    })

    it('deve retornar 0 quando não há registros', async () => {
      const mockVazio = { rows: [{ total: '0' }] }
      const mockUltimosAtendimentos = { rows: [] }

      pool.query
        .mockResolvedValueOnce(mockVazio)
        .mockResolvedValueOnce(mockVazio)
        .mockResolvedValueOnce(mockVazio)
        .mockResolvedValueOnce(mockVazio)
        .mockResolvedValueOnce(mockVazio)
        .mockResolvedValueOnce(mockVazio)
        .mockResolvedValueOnce(mockUltimosAtendimentos)

      const resultado = await DashboardService.getResumo()

      expect(resultado.cadastros.profissionais).toBe(0)
      expect(resultado.cadastros.estudantes).toBe(0)
      expect(resultado.producao.totalAtendimentos).toBe(0)
      expect(resultado.atendimentosPorTipo.bpaI).toBe(0)
      expect(resultado.atendimentosPorTipo.bpaC).toBe(0)
      expect(resultado.ultimosAtendimentos.length).toBe(0)
    })
  })

  describe('getEstatisticasPorData', () => {
    it('deve retornar estatísticas detalhadas por data', async () => {
      const mockEstatisticas = {
        rows: [
          {
            data: '2024-01-15',
            total_atendimentos: '5',
            pacientes_unicos: '3',
            profissionais_unicos: '2',
            total_procedimentos_realizados: '8'
          }
        ]
      }

      pool.query.mockResolvedValueOnce(mockEstatisticas)

      const resultado = await DashboardService.getEstatisticasPorData(
        '2024-01-01',
        '2024-01-31'
      )

      expect(resultado.length).toBe(1)
      expect(resultado[0].data).toBe('2024-01-15')
      expect(resultado[0].total_atendimentos).toBe('5')
    })
  })

  describe('validarDatas', () => {
    it('deve validar datas corretas', () => {
      expect(() => {
        DashboardService.validarDatas('2024-01-01', '2024-01-31')
      }).not.toThrow()
    })

    it('deve lançar erro para formato de data inválido', () => {
      expect(() => {
        DashboardService.validarDatas('01-01-2024', '2024-01-31')
      }).toThrow('Datas devem estar no formato YYYY-MM-DD')
    })

    it('deve lançar erro quando data início > data fim', () => {
      expect(() => {
        DashboardService.validarDatas('2024-01-31', '2024-01-01')
      }).toThrow('Data de início não pode ser maior que data de fim')
    })
  })
})
