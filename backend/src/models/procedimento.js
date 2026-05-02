const pool = require('../config/db')

const Procedimento = {

  // busca todos os procedimentos
  async buscar_procedimentos() {
    const result = await pool.query(
      'SELECT * FROM procedimentos ORDER BY codigo'
    )
    return result.rows
  },

  // buscar procedimento pelo ID
  async buscar_procedimento_id(id) {
    const result = await pool.query(
      'SELECT * FROM procedimentos WHERE id = $1',
      [id]
    )
    return result.rows[0]
  },

  // buscar procedimento pelo código 
  async buscar_procedimento_codigo(codigo) {
    const result = await pool.query(
      'SELECT * FROM procedimentos WHERE codigo = $1',
      [codigo]
    )
    return result.rows[0]
  },

  // busca procedimentos por tipo (BPA-C ou BPA-I)
  async buscar_procedimento_tipo(tipo) {
    const result = await pool.query(
      'SELECT * FROM procedimentos WHERE tipo = $1 ORDER BY codigo',
      [tipo]
    )
    return result.rows
  },

  // buscar procedimentos pelo nome 
  async buscar_procedimento_nome(nome) {
    const result = await pool.query(
      `SELECT * FROM procedimentos
       WHERE nome ILIKE $1
       ORDER BY codigo`,
      [`%${nome}%`]
    )
    return result.rows
  }

}

module.exports = Procedimento