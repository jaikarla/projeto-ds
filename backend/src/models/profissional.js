import pool from '../config/db.js'

const Profissional = {

  // busca de todos os profissionais (do tipo "profissional")
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

  //buscar profissional pelo CNS
async buscar_profissional_cns(cns) {
  const result = await pool.query(
    'SELECT * FROM profissionais WHERE cns = $1',
    [cns]
  )

  return result.rows[0]
},

  // busca profissionais por tipo (profissional ou estudante)
  // usado por estudantesServices para listar os estudantes
  async buscar_profissional_tipo(tipo) {
    const result = await pool.query(
      'SELECT * FROM profissionais WHERE tipo = $1 ORDER BY nome',
      [tipo]
    )
    return result.rows
  },

  // busca estudantes pela matricula
  async buscar_estudante_matricula(matricula) {
    const result = await pool.query(
      'SELECT * FROM profissionais WHERE matricula = $1 AND tipo = $2',
      [matricula, 'estudante']
    )
    return result.rows[0]
  },

  // criar profissional ou estudante
  // matricula é obrigatoria para estudantes
  async criar_profissional({ cpf, cns, nome, cro, cro_uf, cbo, matricula, tipo }) {
    const result = await pool.query(
      `INSERT INTO profissionais (cpf, cns, nome, cro, cro_uf, cbo, matricula, tipo)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [cpf, cns, nome, cro, cro_uf, cbo, matricula || null, tipo]
    )
    return result.rows[0]
  },

  // atualizar dados do profissional ou estudante
  async atualizar_dados_profissional(id, { cpf, cns, nome, cro, cro_uf, cbo, matricula, tipo }) {
    const result = await pool.query(
      `UPDATE profissionais
       SET cpf = $1, cns = $2, nome = $3, cro = $4, cro_uf = $5,
           cbo = $6, matricula = $7, tipo = $8
       WHERE id = $9
       RETURNING *`,
      [cpf, cns, nome, cro, cro_uf, cbo, matricula || null, tipo, id]
    )
    return result.rows[0]
  },

  // remover um profissional ou estudante
  async remover_profissional(id) {
    /*await pool.query(
      'DELETE FROM profissionais WHERE id = $1',
      [id]
    )*/

    //implementado para resolver o bug de não retornar o profissional deletado
    const result = await pool.query(
    `DELETE FROM profissionais WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
  }

}

export default Profissional