
import * as env from "./env";
import * as pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT
});

const setupTables = () => {

  const users = new Promise((resolve, reject) => {
    pool.query(`CREATE TABLE IF NOT EXISTS users(
      user_id SERIAL PRIMARY KEY,
      email TEXT,
      password TEXT
    );`,
    (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  const tags = new Promise((resolve, reject) => {
    pool.query(`CREATE TABLE IF NOT EXISTS tags(
      id SERIAL PRIMARY KEY,
      name TEXT,
      user_id INT,
      CONSTRAINT fk_user
        FOREIGN KEY(user_id)
          REFERENCES users(user_id)
    );`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
  });

  const blocks = new Promise((resolve, reject) => {
    pool.query(`CREATE TABLE IF NOT EXISTS blocks(
      id SERIAL PRIMARY KEY,
      name TEXT,
      user_id INT,
      CONSTRAINT fk_user
        FOREIGN KEY(user_id)
          REFERENCES users(user_id)
    );`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
  });

  return Promise.all([users, tags])
}

export {
  setupTables,
}


