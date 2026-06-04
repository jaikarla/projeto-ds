import pool, { dbConfigured } from '../config/db.js'

const fallbackPacientes = [
  {
    id: 1,
    nome: 'Paciente Demo',
    data_nascimento: '1990-01-01',
    cpf: '12345678901',
    sexo: 'M',
    raca: 'Branca',
    etnia: 'Não informado',
    nacionalidade: 'Brasileiro',
    cns: '123456789012345',
    cep: '12345-678',
    logradouro: 'Rua Demo',
    numero: '100',
    bairro: 'Centro',
    cidade: 'Demo',
    uf: 'PE'
  }
]

let nextFallbackId = 2
const useFallback = () => !dbConfigured

const isDatabaseError = (error) => {
  return (
    error &&
    error.message &&
    /database|connect|not configured|not accessible/i.test(error.message)
  )
}

const Paciente = {

  // buscar todos os pacientes com endereço
  async buscar_pacientes() {
    if (useFallback()) {
      return [...fallbackPacientes]
    }

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
  async buscar_paciente_id(id) {
    if (useFallback()) {
      return fallbackPacientes.find((paciente) => paciente.id === Number(id))
    }

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
  async buscar_paciente_cns(cns) {
    if (useFallback()) {
      return fallbackPacientes.find((paciente) => paciente.cns === cns)
    }

    try {
      const result = await pool.query(
        `SELECT p.*,
                e.cep, e.logradouro, e.numero, e.bairro, e.cidade, e.uf
            FROM pacientes p
            LEFT JOIN enderecos e ON e.paciente_id = p.id
            WHERE p.cns = $1`,
        [cns]
      )
      return result.rows[0]
    } catch (error) {
      if (isDatabaseError(error)) {
        return fallbackPacientes.find((paciente) => paciente.cns === cns)
      }
      throw error
    }
  },

  // busca de paciente pelo CPF
  async buscar_paciente_cpf(cpf) {
    if (useFallback()) {
      return fallbackPacientes.find((paciente) => paciente.cpf === cpf)
    }

    try {
      const result = await pool.query(
        `SELECT p.*,
                e.cep, e.logradouro, e.numero, e.bairro, e.cidade, e.uf
            FROM pacientes p
            LEFT JOIN enderecos e ON e.paciente_id = p.id
            WHERE p.cpf =$1`,
        [cpf]
      )
      return result.rows[0]
    } catch (error) {
      if (isDatabaseError(error)) {
        return fallbackPacientes.find((paciente) => paciente.cpf === cpf)
      }
      throw error
    }
  },

  // criar novo paciente
  async criar_paciente({ nome, data_nascimento, cpf, sexo, raca, etnia, nacionalidade, cns, endereco }) {
    if (useFallback()) {
      const novoPaciente = {
        id: nextFallbackId++,
        nome,
        data_nascimento,
        cpf,
        sexo,
        raca,
        etnia,
        nacionalidade,
        cns,
        cep: endereco?.cep || null,
        logradouro: endereco?.logradouro || null,
        numero: endereco?.numero || null,
        bairro: endereco?.bairro || null,
        cidade: endereco?.cidade || null,
        uf: endereco?.uf || null
      }
      fallbackPacientes.push(novoPaciente)
      return novoPaciente
    }

    try {
      const client = await pool.connect()
      try {
        await client.query('BEGIN')

        const paciente_result = await client.query(
          `INSERT INTO pacientes (nome, data_nascimento, cpf, sexo, raca, etnia, nacionalidade, cns)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING *`,
          [nome, data_nascimento, cpf, sexo, raca, etnia, nacionalidade, cns]
        )

        const paciente = paciente_result.rows[0]

        if (endereco) {
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
    } catch (error) {
      if (isDatabaseError(error)) {
        const novoPaciente = {
          id: nextFallbackId++,
          nome,
          data_nascimento,
          cpf,
          sexo,
          raca,
          etnia,
          nacionalidade,
          cns,
          cep: endereco?.cep || null,
          logradouro: endereco?.logradouro || null,
          numero: endereco?.numero || null,
          bairro: endereco?.bairro || null,
          cidade: endereco?.cidade || null,
          uf: endereco?.uf || null
        }
        fallbackPacientes.push(novoPaciente)
        return novoPaciente
      }
      throw error
    }
  },

  //atualizar dados do paciente
  async atualizar_dados_pacientes(id, { nome, data_nascimento, cpf, sexo, raca, etnia, nacionalidade, cns }) {
    if (useFallback()) {
      const index = fallbackPacientes.findIndex((paciente) => paciente.id === Number(id))
      if (index === -1) {
        return null
      }
      const atualizado = {
        ...fallbackPacientes[index],
        nome,
        data_nascimento,
        cpf,
        sexo,
        raca,
        etnia,
        nacionalidade,
        cns
      }
      fallbackPacientes[index] = atualizado
      return atualizado
    }

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
  async atualizar_endereco(paciente_id, { cep, logradouro, numero, bairro, cidade, uf }) {
    if (useFallback()) {
      const paciente = fallbackPacientes.find((paciente) => paciente.id === Number(paciente_id))
      if (!paciente) {
        return null
      }
      paciente.cep = cep
      paciente.logradouro = logradouro
      paciente.numero = numero
      paciente.bairro = bairro
      paciente.cidade = cidade
      paciente.uf = uf
      return paciente
    }

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
  async remover_paciente(id) {
    if (useFallback()) {
      const index = fallbackPacientes.findIndex((paciente) => paciente.id === Number(id))
      if (index === -1) {
        return null
      }
      const [removido] = fallbackPacientes.splice(index, 1)
      return removido
    }

    const result = await pool.query(
      `DELETE FROM pacientes WHERE id=$1
                    RETURNING *`,
      [id]
    )
    return result.rows[0]
  }
}
export default Paciente
