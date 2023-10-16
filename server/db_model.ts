
import * as env from "./env";
import * as pg from 'pg';

interface Userdata {
  user_id: number,
  email: string,
  password: string
}

const { Pool } = pg;

const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT
});

const setupTables = async () => {
  const users = await new Promise((resolve, reject) => {
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

  const tags = await new Promise((resolve, reject) => {
    pool.query(`CREATE TABLE IF NOT EXISTS tags(
      tag_id SERIAL PRIMARY KEY,
      name TEXT,
      user_id INT,
      CONSTRAINT fk_user
        FOREIGN KEY(user_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE
    );`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
  });

  const blocks = await new Promise((resolve, reject) => {
    pool.query(`CREATE TABLE IF NOT EXISTS blocks(
      block_id SERIAL PRIMARY KEY,
      start_time TIMESTAMPTZ,
      end_time TIMESTAMPTZ,
      user_id INT,
      CONSTRAINT fk_user
        FOREIGN KEY(user_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE
    );`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
  });

  const blockTags = await new Promise((resolve, reject) => {
    pool.query(`CREATE TABLE IF NOT EXISTS blocktags(
      blocktag_id SERIAL PRIMARY KEY,
      block_id INT,
      tag_id INT,
      CONSTRAINT fk_block_id
        FOREIGN KEY(block_id)
          REFERENCES blocks(block_id)
          ON DELETE CASCADE,
      CONSTRAINT fk_tag_id
        FOREIGN KEY(tag_id)
          REFERENCES tags(tag_id)
          ON DELETE CASCADE
    );`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
  });

  return Promise.all([users, tags, blocks, blockTags])
}

const createUser = (body: {email: string, password: string}) => {
  return new Promise(function(resolve, reject) {
    const { email, password } = body;
    pool.query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`, 
      [email, password], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`new user created: ${results.rows[0]}`);
      });
  });
}

const getUser = (email: string): Promise<Userdata> => {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT * FROM users where email = $1`, 
      [email], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0] as Userdata);
      });
  });
}

const deleteUser = (email: string) => {
  return new Promise(function(resolve, reject) {
    pool.query(`DELETE FROM users WHERE email = $1 RETURNING *`, 
      [email], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`user deleted: ${results.rows[0]}`);
      });
  });
}

const getPassword = (email: string) => {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT password FROM users WHERE email = $1`, 
      [email], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0]);
      });
  });
}

const setPassword = (body: {email: string, newPwd:string}) => {
  const { email, newPwd } = body;
  return new Promise(function(resolve, reject) {
    pool.query(`UPDATE users SET password = $2 WHERE email = $1`, 
      [email, newPwd], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0]);
      });
  });
}

export {
  Userdata,
  setupTables,
  createUser,
  deleteUser,
  getPassword,
  setPassword,
  getUser
}


