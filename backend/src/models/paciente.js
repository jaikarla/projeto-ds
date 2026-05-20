import pool from '../config/db.js'

const Paciente = {


    // buscar todos os pacientes com endereço
    async buscar_pacientes(){
        const result = await pool.query(
            `SELECT p.*,
                e.cep, e.logradouro, e.numero, e.bairro, e.cidade, e.uf
            FROM pacientes p
            LEFT JOIN enderecos e ON e.paciente_id = p.id
            ORDER BY p.nome`,
        )
        return result.rows
    },

    // busca de paciente pelo id com endereço
    async buscar_paciente_id(id){
        const result = await pool.query(
            `SELECT p.*,
                e.cep, e.logradouro, e.numero, e.bairro, e.cidade, e.uf
            FROM pacientes p
            LEFT JOIN enderecos e ON e.paciente_id = p.id
            WHERE p.id = $1`,
            [id]
        )
        return result.rows[0]
    },

    //busca de paciente pelo CNS 
    async buscar_paciente_cns(cns){
        const result = await pool.query(
            `SELECT p.*,
                e.cep, e.logradouro, e.numero, e.bairro, e.cidade, e.uf
            FROM pacientes p
            LEFT JOIN enderecos e ON e.paciente_id = p.id
            WHERE p.cns = $1`,
            [cns]        
        )
        return result.rows[0]
    },

    // busca de paciente pelo CPF
    async buscar_paciente_cpf(cpf){
        const result = await pool.query(
            `SELECT p.*,
                e.cep, e.logradouro, e.numero, e.bairro, e.cidade, e.uf
            FROM pacientes p
            LEFT JOIN enderecos e ON e.paciente_id = p.id
            WHERE p.cpf =$1`,
            [cpf]
        )
        return result.rows[0]
    },

    // criar novo paciente
    async criar_paciente({nome, data_nascimento, cpf, sexo, raca, etnia, nacionalidade, cns, endereco}){
        const client = await pool.connect()
            try{
                await client.query('BEGIN')

                const paciente_result = await client.query(
                    `INSERT INTO pacientes (nome, data_nascimento, cpf, sexo, raca, etnia, nacionalidade, cns)
                    VALUES($1, $2, $3, $4, $5, $6, $7)
                    RETURNING *`,
                    [nome, data_nascimento, cpf, sexo, raca, etnia, nacionalidade, cns]
                )

                const paciente = paciente_result.rows[0]

                if(endereco){
                    await client.query(
                        `INSERT INTO enderecos(cep, logradouro, numero, bairro, cidade, uf, paciente_id)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                        [endereco.cep, endereco.logradouro, endereco.numero, endereco.bairro, endereco.cidade, endereco.uf, paciente.id]
                    )   
                }
                await client.query('COMMIT')
                return paciente
 
                } catch (err) {
                await client.query('ROLLBACK')
                throw err
                } finally {
                client.release()
                }
            },

            //atualizar dados do paciente
            async atualizar_dados_pacientes(id, { nome, data_nascimento, cpf, sexo, raca, etnia, nacionalidade, cns }) {
                const result = await pool.query(
                    `UPDATE pacientes
                    SET nome=$1, data_nascimento=$2, cpf=$3, sexo=$4,
                    raca=$5, etnia=$6, nacionalidade=$7, cns=$8
                    WHERE id=$9
                    RETURNING *`,
                    [nome, data_nascimento, cpf, sexo, raca, etnia, nacionalidade, cns, id]
                )
                return result.rows[0]
            },

            //atualizar endereço do paciente
            async atualizar_endereco(paciente_id, { cep, logradouro, numero, bairro, cidade, uf }){
                const result = await pool.query(
                    `UPDATE enderecos
                    SET cep=$1, logradouro=$2, numero=$3, bairro=$4, cidade=$5, uf=$6
                    WHERE paciente_id=$7
                    RETURNING *`,
                    [cep, logradouro, numero, bairro, cidade, uf, paciente_id]
                )
                return result.rows[0]
            },
            

            //remover apciente
            async remover_paciente(id){
                await pool.query(
                    'DELETE FROM pacientes WHERE id=$1',
                    [id]
                )
            }
    }

export default Paciente
