const pool = require('../config/db')

const Profissional = {

  // busca de todos os profissionais
  async buscar_profissionais() {
    const result = await pool.query(
      'SELECT * FROM profissionais ORDER BY nome'
    )
    return result.rows
  },

  // buscar profissional pelo ID
  async buscar_profissional_id(id) {
    const result = await pool.query(
      'SELECT * FROM profissionais WHERE id = $1',
      [id]
    )
    return result.rows[0]
  },

  // buscar profissional pelo CPF
  async buscar_profissional_cpf(cpf) {
    const result = await pool.query(
      'SELECT * FROM profissionais WHERE cpf = $1',
      [cpf]
    )
    return result.rows[0]
  },

  // busca de profissional pelo CRO
  async buscar_profissional_cro(cro) {
    const result = await pool.query(
      'SELECT * FROM profissionais WHERE cro = $1',
      [cro]
    )
    return result.rows[0]
  },

  // busca profissionais por tipo (profissional ou estudante)
  async buscar_profissional_tipo(tipo) {
    const result = await pool.query(
      'SELECT * FROM profissionais WHERE tipo = $1 ORDER BY nome',
      [tipo]
    )
    return result.rows
  },

  // criar profissional
  async criar_profissional({ cpf, nome, cro, cro_uf, cbo, cargo, tipo }) {
    const result = await pool.query(
      `INSERT INTO profissionais (cpf, nome, cro, cro_uf, cbo, cargo, tipo)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [cpf, nome, cro, cro_uf, cbo, cargo, tipo]
    )
    return result.rows[0]
  },

  // atualizar dados do profissional
  async atualizar_dados_profissional(id, { cpf, nome, cro, cro_uf, cbo, cargo, tipo }) {
    const result = await pool.query(
      `UPDATE profissionais
       SET cpf = $1, nome = $2, cro = $3, cro_uf = $4,
           cbo = $5, cargo = $6, tipo = $7
       WHERE id = $8
       RETURNING *`,
      [cpf, nome, cro, cro_uf, cbo, cargo, tipo, id]
    )
    return result.rows[0]
  },

  // remover um profissional
  async remover_profissional(id) {
    await pool.query(
      'DELETE FROM profissionais WHERE id = $1',
      [id]
    )
  }

}

module.exports = Profissional