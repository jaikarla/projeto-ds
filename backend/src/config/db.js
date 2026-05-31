import 'dotenv/config'
import { Pool } from 'pg'

const normalizeEnvValue = (value) => {
  if (typeof value !== 'string') {
    return undefined
  }
  const trimmed = value.trim()
  return trimmed.replace(/^['"]|['"]$/g, '')
}

const parsedPort = normalizeEnvValue(process.env.DB_PORT || process.env.PGPORT)
const poolConfig = {
  host: normalizeEnvValue(process.env.DB_HOST || process.env.PGHOST),
  user: normalizeEnvValue(process.env.DB_USER || process.env.PGUSER),
  password: normalizeEnvValue(process.env.DB_PASSWORD || process.env.PGPASSWORD),
  database: normalizeEnvValue(process.env.DB_NAME || process.env.PGDATABASE),
  port: parsedPort ? Number(parsedPort) : 5432,
};

// Habilita SSL se especificado ou se usar Neon
const useSSL = normalizeEnvValue(process.env.DB_SSL) === 'true' ||
               normalizeEnvValue(process.env.PGSSLMODE) === 'require' ||
               normalizeEnvValue(process.env.PGHOST)?.includes('neon');

if (useSSL) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const dbConfigured = Boolean(poolConfig.host && poolConfig.user && poolConfig.database);

const pool = dbConfigured ? new Pool(poolConfig) : {
  query() {
    throw new Error('Banco de dados não configurado. Defina DB_HOST, DB_USER, DB_PASSWORD e DB_NAME.');
  }
};

if (dbConfigured) {
  pool.on('error', (err) => {
    console.error('Erro no pool de conexões:', err.message);
  });

  pool.connect((err, client, release) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.message);
      return;
    }
    release();
    console.log('✓ Conectado ao banco de dados');
  });
} else {
  console.warn('Aviso: banco de dados PostgreSQL não está configurado. A rota de profissionais usará dados de fallback em memória para desenvolvimento.');
}

export default pool
export { dbConfigured }