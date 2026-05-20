import pg from 'pg'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const { Pool } = pg

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  database: process.env.DB_NAME     || 'sistema_bpa',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD,
  port:     parseInt(process.env.DB_PORT) || 5432,
})

pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message)
    return
  }
  release()
  console.log('Conectado ao banco de dados.')
})

export default pool