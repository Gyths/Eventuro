// src/db.js
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.USUARIO_BD,
  host: process.env.HOST_BD,
  database: process.env.DATABASE_BD,
  password: process.env.PASS_BD,
  port: process.env.PORT_BD,
});