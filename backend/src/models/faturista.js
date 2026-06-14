import pool from '../config/db.js'

const Faturista={

    // buscar todos os faturistas
    async buscar_faturistas(){
        const result = await pool.query(
            'SELECT id, nome, email, cpf, telefone FROM faturistas'
        )
        return result.rows
    },

    // busca um faturista pelo ID
    async busca_faturista_id(id){
        const result = await pool.query( 
            'SELECT id, nome, email, cpf, telefone FROM faturistas WHERE id = $1',
            [id]
        )
        return result.rows[0]
    },

    async busca_faturista_id_com_senha(id){
        const result = await pool.query(
            'SELECT * FROM faturistas WHERE id = $1',
            [id]
        )
        return result.rows[0]
    },

    //busca faturista pelo email usado no login
    // retorna a senha para comparar
    async busca_faturista_email(email){
        const result = await pool.query(
            'SELECT * FROM faturistas WHERE email = $1',
            [email]
        )
        return result.rows[0]
    },

    async busca_faturista_cpf(cpf){
        const result = await pool.query(
            'SELECT * FROM faturistas WHERE cpf = $1',
            [cpf]
        )
        return result.rows[0]
    },

    //criar novo faturista
    async criar_faturista({nome, email, cpf, telefone, senha}) {
        const result = await pool.query(
            `INSERT INTO faturistas (nome, email, cpf, telefone, senha) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, nome, email, cpf, telefone`,
            [nome, email, cpf, telefone, senha]
        )
        return result.rows[0]
    },

    // atualizar dados  
    async atualizar_dados_faturista(id, {nome, email, cpf, telefone}){
        const result = await pool.query(
            `UPDATE faturistas
            SET nome=$1, email=$2, cpf=$3, telefone=$4
            WHERE  id  = $5
            RETURNING id, nome, email, cpf, telefone `,
            [nome, email, cpf, telefone, id]
        )
        return result.rows[0]
    },

    //atualizar apenas a senha 
    async atualizar_senha_faturista(id, senhaNova){
        await pool.query(
            'UPDATE faturistas SET senha = $1 WHERE id = $2',
            [senhaNova, id]
        )
    },

    //remover faturista
    async remover_faturista(id){
        const result = await pool.query(
            'DELETE FROM faturistas WHERE id = $1 RETURNING id',
            [id]
        )
        return result.rows[0]
    }
}

export default Faturista
