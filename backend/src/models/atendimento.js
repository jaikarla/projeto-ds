const pool = require('../config/db')

const Atendimento = {

  // busca todos os atendimentos com dados completos
  async buscar_atendimentos() {
    const result = await pool.query(
      `SELECT 
         a.id,
         a.data_atendimento,
         a.cid,
         -- dados do paciente (null para BPA-C)
         p.id            AS paciente_id,
         p.nome          AS paciente_nome,
         p.cns           AS paciente_cns,
         p.data_nascimento,
         -- dados do profissional
         pr.id           AS profissional_id,
         pr.nome         AS profissional_nome,
         pr.cbo          AS profissional_cbo,
         pr.tipo         AS profissional_tipo
       FROM atendimentos a
       LEFT JOIN pacientes      p  ON p.id  = a.paciente_id
       INNER JOIN profissionais pr ON pr.id = a.profissional_id
       ORDER BY a.data_atendimento DESC`
    )
    return result.rows
  },

  // busca um atendimento pelo ID 
  async buscar_atendimento_id(id) {
    const atendResult = await pool.query(
      `SELECT 
         a.*,
         p.nome          AS paciente_nome,
         p.cns           AS paciente_cns,
         p.data_nascimento,
         p.sexo          AS paciente_sexo,
         p.raca          AS paciente_raca,
         pr.nome         AS profissional_nome,
         pr.cbo          AS profissional_cbo
       FROM atendimentos a
       LEFT JOIN pacientes      p  ON p.id  = a.paciente_id
       INNER JOIN profissionais pr ON pr.id = a.profissional_id
       WHERE a.id = $1`,
      [id]
    )
    const atendimento = atendResult.rows[0]
    if (!atendimento) return null

    // busca os procedimentos desse atendimento
    const procResult = await pool.query(
      `SELECT 
         ap.quantidade,
         proc.id,
         proc.nome,
         proc.codigo,
         proc.tipo
       FROM atendimento_procedimentos ap
       INNER JOIN procedimentos proc ON proc.id = ap.procedimento_id
       WHERE ap.atendimento_id = $1`,
      [id]
    )
    atendimento.procedimentos = procResult.rows

    return atendimento
  },

  // busca atendimentos por período
  async buscar_atendimento_data(dataInicio, dataFim) {
    const result = await pool.query(
      `SELECT 
         a.id,
         a.data_atendimento,
         a.cid,
         p.nome          AS paciente_nome,
         p.cns           AS paciente_cns,
         p.data_nascimento,
         pr.nome         AS profissional_nome,
         pr.cbo          AS profissional_cbo
       FROM atendimentos a
       LEFT JOIN pacientes      p  ON p.id  = a.paciente_id
       INNER JOIN profissionais pr ON pr.id = a.profissional_id
       WHERE a.data_atendimento BETWEEN $1 AND $2
       ORDER BY a.data_atendimento DESC`,
      [dataInicio, dataFim]
    )
    return result.rows
  },

  // criar atendimento com seus procedimentos
  async criar_atendimento({ data_atendimento, cid, paciente_id, profissional_id, procedimentos }) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const atendResult = await client.query(
        `INSERT INTO atendimentos (data_atendimento, cid, paciente_id, profissional_id)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [data_atendimento, cid, paciente_id, profissional_id]
      )
      const atendimento = atendResult.rows[0]

      // vincula cada procedimento ao atendimento
      for (const proc of procedimentos) {
        await client.query(
          `INSERT INTO atendimento_procedimentos (atendimento_id, procedimento_id, quantidade)
           VALUES ($1, $2, $3)`,
          [atendimento.id, proc.procedimento_id, proc.quantidade || 1]
        )
      }

      await client.query('COMMIT')
      return atendimento

    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  },

  // remover um atendimento
  // atendimento_procedimentos são removidos automaticamente (CASCADE)
  async remover_atendimento(id) {
    await pool.query(
      'DELETE FROM atendimentos WHERE id = $1',
      [id]
    )
  },

  // ============================================================
  // QUERIES PARA FACILITAR O RELATÓRIO BPA
  // ============================================================

  // BPA-C: agrupa por procedimento e CBO do profissional no período
  async buscar_bpaC(dataInicio, dataFim) {
    const result = await pool.query(
      `SELECT
         proc.codigo,
         proc.nome              AS procedimento_nome,
         pr.cbo,
         SUM(ap.quantidade)     AS quantidade_total
       FROM atendimentos a
       INNER JOIN profissionais             pr   ON pr.id   = a.profissional_id
       INNER JOIN atendimento_procedimentos ap   ON ap.atendimento_id = a.id
       INNER JOIN procedimentos             proc ON proc.id = ap.procedimento_id
       WHERE proc.tipo = 'BPA-C'
         AND a.data_atendimento BETWEEN $1 AND $2
       GROUP BY proc.codigo, proc.nome, pr.cbo
       ORDER BY proc.codigo`,
      [dataInicio, dataFim]
    )
    return result.rows
  },

  // BPA-I: retorna cada atendimento individualizado com dados completos do paciente
  async buscar_bpaI(dataInicio, dataFim) {
    const result = await pool.query(
      `SELECT
         a.id                   AS atendimento_id,
         a.data_atendimento,
         a.cid,
         proc.codigo            AS procedimento_codigo,
         proc.nome              AS procedimento_nome,
         ap.quantidade,
         pr.cbo,
         pr.nome                AS profissional_nome,
         p.cns,
         p.nome                 AS paciente_nome,
         p.data_nascimento,
         p.sexo,
         p.raca,
         e.cep,
         e.logradouro,
         e.numero,
         e.bairro
       FROM atendimentos a
       INNER JOIN pacientes                 p    ON p.id    = a.paciente_id
       INNER JOIN profissionais             pr   ON pr.id   = a.profissional_id
       INNER JOIN atendimento_procedimentos ap   ON ap.atendimento_id = a.id
       INNER JOIN procedimentos             proc ON proc.id = ap.procedimento_id
       LEFT JOIN enderecos                  e    ON e.paciente_id = p.id
       WHERE proc.tipo = 'BPA-I'
         AND a.data_atendimento BETWEEN $1 AND $2
       ORDER BY a.data_atendimento DESC`,
      [dataInicio, dataFim]
    )
    return result.rows
  }

}

module.exports = Atendimento