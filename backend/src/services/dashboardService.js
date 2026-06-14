import pool from '../config/db.js'

class DashboardService {

  async getResumo(dataInicio, dataFim) {
    try {
      let whereClause = ''
      let queryParams = []
      let cadastroDateClause = ''
      let cadastroQueryParams = []

      if (dataInicio && dataFim) {
        whereClause = 'WHERE a.data_atendimento >= $1::date AND a.data_atendimento <= $2::date'
        queryParams = [dataInicio, dataFim]
        cadastroDateClause = 'AND data_cadastro >= $1::date AND data_cadastro <= $2::date'
        cadastroQueryParams = [dataInicio, dataFim]
      }

      const results = await Promise.all([
        pool.query(`
          SELECT COUNT(*) as total
          FROM profissionais
          WHERE tipo = 'profissional'
          ${cadastroDateClause}
        `, cadastroQueryParams),
        
        pool.query(`
          SELECT COUNT(*) as total
          FROM profissionais
          WHERE tipo = 'estudante'
          ${cadastroDateClause}
        `, cadastroQueryParams),
        
        pool.query(`
          SELECT COUNT(*) as total FROM atendimentos a
          ${whereClause}
        `, queryParams),
        
        pool.query('SELECT COUNT(*) as total FROM procedimentos'),
        
        pool.query(`
          SELECT COUNT(DISTINCT a.id) as total 
          FROM atendimentos a
          INNER JOIN atendimento_procedimentos ap ON ap.atendimento_id = a.id
          INNER JOIN procedimentos p ON p.id = ap.procedimento_id
          WHERE p.tipo = 'BPA-I'
          ${dataInicio && dataFim ? 'AND a.data_atendimento >= $1::date AND a.data_atendimento <= $2::date' : ''}
        `, dataInicio && dataFim ? [dataInicio, dataFim] : []),
        
        pool.query(`
          SELECT COUNT(DISTINCT a.id) as total 
          FROM atendimentos a
          INNER JOIN atendimento_procedimentos ap ON ap.atendimento_id = a.id
          INNER JOIN procedimentos p ON p.id = ap.procedimento_id
          WHERE p.tipo = 'BPA-C'
          ${dataInicio && dataFim ? 'AND a.data_atendimento >= $1::date AND a.data_atendimento <= $2::date' : ''}
        `, dataInicio && dataFim ? [dataInicio, dataFim] : []),
        
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

      const getTotal = (index) => parseInt(results[index]?.rows?.[0]?.total, 10) || 0

      const dadosDashboard = {
        periodo: dataInicio && dataFim ? { dataInicio, dataFim } : { dataInicio: null, dataFim: null },
        cadastros: {
          profissionais: getTotal(0),
          estudantes: getTotal(1)
        },
        producao: {
          totalAtendimentos: getTotal(2),
          totalProcedimentosDisponiveis: getTotal(3)
        },
        atendimentosPorTipo: {
          bpaI: getTotal(4),
          bpaC: getTotal(5)
        },
        ultimosAtendimentos: results[6].rows || []
      }

      return dadosDashboard
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error)
      throw error
    }
  }

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
        WHERE a.data_atendimento >= $1::date AND a.data_atendimento <= $2::date
        GROUP BY DATE(a.data_atendimento)
        ORDER BY data DESC
      `, [dataInicio, dataFim])

      return result.rows
    } catch (error) {
      console.error('Erro ao buscar estatísticas por data:', error)
      throw error
    }
  }

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