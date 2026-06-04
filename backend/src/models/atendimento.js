import pool from '../config/db.js'

const Atendimento = {
  async verificar_cadastros(paciente_id, profissional_id) {
    let pacienteExiste = true
    let profissionalExiste = true

    if (paciente_id) {
      const resPaciente = await pool.query('SELECT id FROM pacientes WHERE id = $1', [paciente_id])
      if (resPaciente.rowCount === 0) pacienteExiste = false
    }

    if (profissional_id) {
      const resProfissional = await pool.query('SELECT id FROM profissionais WHERE id = $1', [profissional_id])
      if (resProfissional.rowCount === 0) profissionalExiste = false
    }

    if (!pacienteExiste && !profissionalExiste) throw new Error('AMBOS_INVALIDOS')
    if (!pacienteExiste) throw new Error('PACIENTE_INVALIDO')
    if (!profissionalExiste) throw new Error('PROFISSIONAL_INVALIDO')
  },

  async buscar_atendimentos() {
    const result = await pool.query(`
      SELECT 
        a.id,
        a.data_atendimento,
        a.cid,
        p.nome AS paciente_nome,
        p.cns AS paciente_cns,
        p.data_nascimento AS paciente_data_nascimento,
        p.sexo AS paciente_sexo,
        p.raca AS paciente_raca,
        pr.nome AS profissional_nome,
        pr.cbo AS profissional_cbo,
        pr.tipo AS profissional_tipo,
        COALESCE(
          json_agg(
            json_build_object(
              'codigo', proc.codigo,
              'nome', proc.nome,
              'tipo', proc.tipo,
              'quantidade', ap.quantidade
            )
          ) FILTER (WHERE proc.id IS NOT NULL), '[]'
        ) AS procedimentos
      FROM atendimentos a
      LEFT JOIN pacientes p ON p.id = a.paciente_id
      INNER JOIN profissionais pr ON pr.id = a.profissional_id
      LEFT JOIN atendimento_procedimentos ap ON ap.atendimento_id = a.id
      LEFT JOIN procedimentos proc ON proc.id = ap.procedimento_id
      GROUP BY a.id, p.id, pr.id
      ORDER BY a.data_atendimento DESC
    `)
    return result.rows
  },

  async buscar_atendimento_id(id) {
    const atendResult = await pool.query(
      `SELECT 
         a.id,
         a.data_atendimento,
         a.cid,
         p.nome AS paciente_nome,
         p.cns AS paciente_cns,
         p.data_nascimento,
         p.sexo AS paciente_sexo,
         p.raca AS paciente_raca,
         pr.nome AS profissional_nome,
         pr.cbo AS profissional_cbo
       FROM atendimentos a
       LEFT JOIN pacientes p ON p.id = a.paciente_id
       INNER JOIN profissionais pr ON pr.id = a.profissional_id
       WHERE a.id = $1`,
      [id]
    )
    const atendimento = atendResult.rows[0]
    if (!atendimento) return null

    const procResult = await pool.query(
      `SELECT 
         ap.quantidade,
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

  async buscar_atendimento_data(dataInicio, dataFim) {
    const result = await pool.query(
      `SELECT 
         a.id,
         a.data_atendimento,
         a.cid,
         p.nome AS paciente_nome,
         p.cns AS paciente_cns,
         p.data_nascimento,
         pr.nome AS profissional_nome,
         pr.cbo AS profissional_cbo
       FROM atendimentos a
       LEFT JOIN pacientes p ON p.id = a.paciente_id
       INNER JOIN profissionais pr ON pr.id = a.profissional_id
       WHERE a.data_atendimento BETWEEN $1 AND $2
       ORDER BY a.data_atendimento DESC`,
      [dataInicio, dataFim]
    )
    return result.rows
  },

  async criar_atendimento({ data_atendimento, cid, paciente_id, profissional_id, procedimentos }) {
    await this.verificar_cadastros(paciente_id, profissional_id)

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

  async atualizar_atendimento(id, { data_atendimento, cid, paciente_id, profissional_id, procedimentos }) {
    await this.verificar_cadastros(paciente_id, profissional_id)

    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const atendResult = await client.query(
        `UPDATE atendimentos 
         SET data_atendimento = $1, cid = $2, paciente_id = $3, profissional_id = $4
         WHERE id = $5 RETURNING *`,
        [data_atendimento, cid, paciente_id, profissional_id, id]
      )
      
      const atendimento = atendResult.rows[0]
      if (!atendimento) {
        await client.query('ROLLBACK')
        return null
      }

      await client.query('DELETE FROM atendimento_procedimentos WHERE atendimento_id = $1', [id])

      for (const proc of procedimentos) {
        await client.query(
          `INSERT INTO atendimento_procedimentos (atendimento_id, procedimento_id, quantidade)
           VALUES ($1, $2, $3)`,
          [id, proc.procedimento_id, proc.quantidade || 1]
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

  async remover_atendimento(id) {
    const result = await pool.query('DELETE FROM atendimentos WHERE id = $1', [id])
    return result.rowCount
  },

  async buscar_bpaC(dataInicio, dataFim) {
    const result = await pool.query(
      `SELECT
         proc.codigo,
         proc.nome AS procedimento_nome,
         pr.cbo,
         SUM(ap.quantidade) AS quantidade_total
       FROM atendimentos a
       INNER JOIN profissionais pr ON pr.id = a.profissional_id
       INNER JOIN atendimento_procedimentos ap ON ap.atendimento_id = a.id
       INNER JOIN procedimentos proc ON proc.id = ap.procedimento_id
       WHERE proc.tipo = 'BPA-C'
         AND a.data_atendimento BETWEEN $1 AND $2
       GROUP BY proc.codigo, proc.nome, pr.cbo
       ORDER BY proc.codigo`,
      [dataInicio, dataFim]
    )
    return result.rows
  },

  async buscar_bpaI(dataInicio, dataFim) {
    const result = await pool.query(
      `SELECT
         a.id AS atendimento_id,
         a.data_atendimento,
         a.cid,
         proc.codigo AS procedimento_codigo,
         proc.nome AS procedimento_nome,
         ap.quantidade,
         pr.cbo,
         pr.nome AS profissional_nome,
         p.cns,
         p.nome AS paciente_nome,
         p.data_nascimento,
         p.sexo,
         p.raca,
         e.cep,
         e.logradouro,
         e.numero,
         e.bairro
       FROM atendimentos a
       INNER JOIN pacientes p ON p.id = a.paciente_id
       INNER JOIN profissionais pr ON pr.id = a.profissional_id
       INNER JOIN atendimento_procedimentos ap ON ap.atendimento_id = a.id
       INNER JOIN procedimentos proc ON proc.id = ap.procedimento_id
       LEFT JOIN enderecos e ON e.paciente_id = p.id
       WHERE proc.tipo = 'BPA-I'
         AND a.data_atendimento BETWEEN $1 AND $2
       ORDER BY a.data_atendimento DESC`,
      [dataInicio, dataFim]
    )
    return result.rows
  }
}

export default Atendimento