import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import pool, { dbConfigured } from '../config/db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function migrate() {
  if (!dbConfigured) {
    throw new Error('Banco de dados não configurado. Confira o arquivo .env antes de rodar as migrações.')
  }

  const migrationsDir = path.join(__dirname, 'migrations')
  const files = (await fs.readdir(migrationsDir))
    .filter((file) => file.endsWith('.sql'))
    .sort()

  for (const file of files) {
    const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8')
    await pool.query(sql)
    console.log(`Migração aplicada: ${file}`)
  }

  await pool.end()
}

migrate().catch(async (error) => {
  console.error('Erro ao rodar migrações:', error.message)
  await pool.end?.().catch(() => {})
  process.exit(1)
})
