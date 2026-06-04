import pool from '../config/db.js'

class DashboardService {
  /**
   * Busca o resumo do dashboard com opção de filtro por período
   * @param {string} dataInicio - Data no formato YYYY-MM-DD (opcional)
   * @param {string} dataFim - Data no formato YYYY-MM-DD (opcional)
   * @returns {Object} Dados do dashboard
   */
  async getResumo(dataInicio, dataFim) {
    try {
      // Constrói a cláusula WHERE dinamicamente
      let whereClause = ''
      let queryParams = []

      if (dataInicio && dataFim) {
        whereClause = 'WHERE a.data_atendimento >= $1 AND a.data_atendimento <= $2'
        queryParams = [dataInicio, dataFim]
      }

      // Executa todas as queries em paralelo
      const results = await Promise.all([
        // Total de profissionais (todos que têm tipo = 'profissional')
        pool.query('SELECT COUNT(*) as total FROM profissionais WHERE tipo = \'profissional\''),
        
        // Total de estudantes
        pool.query('SELECT COUNT(*) as total FROM profissionais WHERE tipo = \'estudante\''),
        
        // Total de atendimentos (com filtro de data opcional)
        pool.query(`
          SELECT COUNT(*) as total FROM atendimentos a
          ${whereClause}
        `, queryParams),
        
        // Total de procedimentos disponíveis (todos os cadastrados no sistema)
        pool.query('SELECT COUNT(*) as total FROM procedimentos'),
        
        // Total de atendimentos com tipo BPA-I (com filtro de data opcional)
        pool.query(`
          SELECT COUNT(DISTINCT a.id) as total 
          FROM atendimentos a
          INNER JOIN atendimento_procedimentos ap ON ap.atendimento_id = a.id
          INNER JOIN procedimentos p ON p.id = ap.procedimento_id
          WHERE p.tipo = 'BPA-I'
          ${dataInicio && dataFim ? 'AND a.data_atendimento >= $' + (queryParams.length + 1) + ' AND a.data_atendimento <= $' + (queryParams.length + 2) : ''}
        `, dataInicio && dataFim ? [...queryParams, dataInicio, dataFim] : []),
        
        // Total de atendimentos com tipo BPA-C (com filtro de data opcional)
        pool.query(`
          SELECT COUNT(DISTINCT a.id) as total 
          FROM atendimentos a
          INNER JOIN atendimento_procedimentos ap ON ap.atendimento_id = a.id
          INNER JOIN procedimentos p ON p.id = ap.procedimento_id
          WHERE p.tipo = 'BPA-C'
          ${dataInicio && dataFim ? 'AND a.data_atendimento >= $' + (queryParams.length + 1) + ' AND a.data_atendimento <= $' + (queryParams.length + 2) : ''}
        `, dataInicio && dataFim ? [...queryParams, dataInicio, dataFim] : []),
        
        // Últimos atendimentos realizados no período (ou hoje se sem filtro)
        pool.query(`
          SELECT 
            a.id,
            a.data_atendimento,
            a.cid,
            p.nome AS paciente_nome,
            p.cns AS paciente_cns,
            pr.nome AS profissional_nome,
            pr.tipo AS profissional_tipo,
            STRING_AGG(DISTINCT proc.tipo, ', ') AS tipos_procedimentos
          FROM atendimentos a
          LEFT JOIN pacientes p ON p.id = a.paciente_id
          INNER JOIN profissionais pr ON pr.id = a.profissional_id
          LEFT JOIN atendimento_procedimentos ap ON ap.atendimento_id = a.id
          LEFT JOIN procedimentos proc ON proc.id = ap.procedimento_id
          ${whereClause || 'WHERE DATE(a.data_atendimento) = CURRENT_DATE'}
          GROUP BY a.id, p.id, pr.id
          ORDER BY a.data_atendimento DESC
          LIMIT 10
        `, whereClause ? queryParams : [])
      ])

      // Estrutura limpa para enviar ao frontend
      const dadosDashboard = {
        periodo: dataInicio && dataFim ? { dataInicio, dataFim } : { dataInicio: null, dataFim: null },
        cadastros: {
          profissionais: parseInt(results[0].rows[0].total) || 0,
          estudantes: parseInt(results[1].rows[0].total) || 0
        },
        producao: {
          totalAtendimentos: parseInt(results[2].rows[0].total) || 0,
          totalProcedimentosDisponiveis: parseInt(results[3].rows[0].total) || 0
        },
        atendimentosPorTipo: {
          bpaI: parseInt(results[4].rows[0].total) || 0,
          bpaC: parseInt(results[5].rows[0].total) || 0
        },
        ultimosAtendimentos: results[6].rows || []
      }

      return dadosDashboard
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error)
      throw error
    }
  }

  /**
   * Busca estatísticas detalhadas por data
   * @param {string} dataInicio - Data no formato YYYY-MM-DD
   * @param {string} dataFim - Data no formato YYYY-MM-DD
   * @returns {Object} Estatísticas detalhadas
   */
  async getEstatisticasPorData(dataInicio, dataFim) {
    try {
      const result = await pool.query(`
        SELECT 
          DATE(a.data_atendimento) as data,
          COUNT(DISTINCT a.id) as total_atendimentos,
          COUNT(DISTINCT a.paciente_id) as pacientes_unicos,
          COUNT(DISTINCT a.profissional_id) as profissionais_unicos,
          SUM(ap.quantidade) as total_procedimentos_realizados
        FROM atendimentos a
        LEFT JOIN atendimento_procedimentos ap ON ap.atendimento_id = a.id
        WHERE a.data_atendimento >= $1 AND a.data_atendimento <= $2
        GROUP BY DATE(a.data_atendimento)
        ORDER BY data DESC
      `, [dataInicio, dataFim])

      return result.rows
    } catch (error) {
      console.error('Erro ao buscar estatísticas por data:', error)
      throw error
    }
  }

  /**
   * Valida se as datas estão no formato correto
   * @param {string} dataInicio
   * @param {string} dataFim
   * @returns {boolean}
   */
  validarDatas(dataInicio, dataFim) {
    const regexData = /^\d{4}-\d{2}-\d{2}$/
    if (!regexData.test(dataInicio) || !regexData.test(dataFim)) {
      throw new Error('Datas devem estar no formato YYYY-MM-DD')
    }
    if (new Date(dataInicio) > new Date(dataFim)) {
      throw new Error('Data de início não pode ser maior que data de fim')
    }
    return true
  }
}

export default new DashboardService()
