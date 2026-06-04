import DashboardController from '../controllers/dashboardController.js'
import DashboardService from '../services/dashboardService.js'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock do service
vi.mock('../services/dashboardService.js', () => ({
  default: {
    getResumo: vi.fn(),
    getEstatisticasPorData: vi.fn(),
    validarDatas: vi.fn()
  }
}))

describe('DashboardController', () => {
  let req, res

  beforeEach(() => {
    vi.clearAllMocks()

    req = {
      query: {}
    }

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
  })

  describe('getResumo', () => {
    it('deve retornar dados do dashboard com sucesso', async () => {
      const mockDados = {
        cadastros: { profissionais: 10, estudantes: 5 },
        producao: { totalAtendimentos: 25, totalProcedimentosDisponiveis: 50 },
        atendimentosPorTipo: { bpaI: 15, bpaC: 10 },
        ultimosAtendimentos: []
      }

      DashboardService.getResumo.mockResolvedValueOnce(mockDados)

      await DashboardController.getResumo(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockDados)
    })

    it('deve retornar erro quando ambas datas não são fornecidas juntas', async () => {
      req.query = { dataInicio: '2024-01-01' } // Falta dataFim

      await DashboardController.getResumo(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          erro: expect.stringContaining('Ambas as datas')
        })
      )
    })

    it('deve validar datas quando fornecidas', async () => {
      req.query = { dataInicio: '2024-01-01', dataFim: '2024-01-31' }

      const mockDados = {
        cadastros: { profissionais: 10, estudantes: 5 },
        producao: { totalAtendimentos: 10, totalProcedimentosDisponiveis: 50 },
        atendimentosPorTipo: { bpaI: 5, bpaC: 5 },
        ultimosAtendimentos: [],
        periodo: { dataInicio: '2024-01-01', dataFim: '2024-01-31' }
      }

      DashboardService.getResumo.mockResolvedValueOnce(mockDados)

      await DashboardController.getResumo(req, res)

      expect(DashboardService.validarDatas).toHaveBeenCalledWith(
        '2024-01-01',
        '2024-01-31'
      )
      expect(res.status).toHaveBeenCalledWith(200)
    })

    it('deve retornar erro 500 em caso de exceção', async () => {
      const erro = new Error('Erro de conexão com banco de dados')
      DashboardService.getResumo.mockRejectedValueOnce(erro)

      await DashboardController.getResumo(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          erro: 'Erro interno ao carregar o dashboard.',
          mensagem: 'Erro de conexão com banco de dados'
        })
      )
    })

    it('deve lançar erro se datas estão em formato inválido', async () => {
      req.query = { dataInicio: '01-01-2024', dataFim: '31-01-2024' }

      DashboardService.validarDatas.mockImplementationOnce(() => {
        throw new Error('Datas devem estar no formato YYYY-MM-DD')
      })

      await DashboardController.getResumo(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

  describe('getEstatisticasPorData', () => {
    it('deve retornar estatísticas detalhadas com sucesso', async () => {
      req.query = { dataInicio: '2024-01-01', dataFim: '2024-01-31' }

      const mockEstatisticas = {
        periodo: { dataInicio: '2024-01-01', dataFim: '2024-01-31' },
        estatisticas: [
          {
            data: '2024-01-15',
            total_atendimentos: 5,
            pacientes_unicos: 3,
            profissionais_unicos: 2
          }
        ]
      }

      DashboardService.getEstatisticasPorData.mockResolvedValueOnce(
        mockEstatisticas.estatisticas
      )

      await DashboardController.getEstatisticasPorData(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          periodo: { dataInicio: '2024-01-01', dataFim: '2024-01-31' }
        })
      )
    })

    it('deve retornar erro quando datas não são fornecidas', async () => {
      req.query = {}

      await DashboardController.getEstatisticasPorData(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          erro: expect.stringContaining('obrigatórios')
        })
      )
    })

    it('deve retornar erro 500 em caso de exceção', async () => {
      req.query = { dataInicio: '2024-01-01', dataFim: '2024-01-31' }

      const erro = new Error('Erro na query')
      DashboardService.getEstatisticasPorData.mockRejectedValueOnce(erro)

      await DashboardController.getEstatisticasPorData(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          erro: 'Erro ao buscar estatísticas'
        })
      )
    })
  })
})
