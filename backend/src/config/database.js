const { Pool } = require('pg');
require('dotenv').config();

let pool;

if (process.env.DATABASE_URL) {
  //  Railway / Production
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  //  Local development fallback
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'zamangwane_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    ssl: false,
  });
}

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const query = (text, params) => pool.query(text, params);

const initDB = async () => {
  try {
    const client = await pool.connect();
    console.log(' Database connected successfully');
    client.release();
  } catch (err) {
    console.error(' Database connection error:', err);
  }
};

module.exports = {
  pool,
  query,
  initDB
};