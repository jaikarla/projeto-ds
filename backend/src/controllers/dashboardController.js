import DashboardService from '../services/dashboardService.js'

class DashboardController {

  async getResumo(req, res) {
    try {
      const { dataInicio, dataFim } = req.query

      if ((dataInicio && !dataFim) || (!dataInicio && dataFim)) {
        return res.status(400).json({
          erro: 'Ambas as datas (dataInicio e dataFim) devem ser fornecidas juntas'
        })
      }

      if (dataInicio && dataFim) {
        DashboardService.validarDatas(dataInicio, dataFim)
      }

      const dadosDashboard = await DashboardService.getResumo(dataInicio, dataFim)

      return res.status(200).json(dadosDashboard)
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error)
      return res.status(500).json({
        erro: 'Erro interno ao carregar o dashboard.',
        mensagem: error.message
      })
    }
  }
  
  async getEstatisticasPorData(req, res) {
    try {
      const { dataInicio, dataFim } = req.query

      if (!dataInicio || !dataFim) {
        return res.status(400).json({
          erro: 'dataInicio e dataFim são obrigatórios'
        })
      }

      DashboardService.validarDatas(dataInicio, dataFim)

      const estatisticas = await DashboardService.getEstatisticasPorData(dataInicio, dataFim)

      return res.status(200).json({
        periodo: { dataInicio, dataFim },
        estatisticas
      })
    } catch (error) {
      console.error('Erro ao buscar estatísticas por data:', error)
      return res.status(500).json({
        erro: 'Erro ao buscar estatísticas',
        mensagem: error.message
      })
    }
  }
}

export default new DashboardController()