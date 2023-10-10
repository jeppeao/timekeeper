const env = require('./env');
const Pool = require('pg').Pool;

const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT
});
