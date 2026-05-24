import { Pool } from 'pg'

const poolConfig = {
  host: process.env.DB_HOST || process.env.PGHOST,
  user: process.env.DB_USER || process.env.PGUSER,
  password: process.env.DB_PASSWORD || process.env.PGPASSWORD,
  database: process.env.DB_NAME || process.env.PGDATABASE,
  port: (process.env.DB_PORT || process.env.PGPORT) ? Number(process.env.DB_PORT || process.env.PGPORT) : 5432,
};

// Habilita SSL se especificado ou se usar Neon
const useSSL = process.env.DB_SSL === 'true' || 
               process.env.PGSSLMODE === 'require' ||
               process.env.PGHOST?.includes('neon');

if (useSSL) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

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

export default pool