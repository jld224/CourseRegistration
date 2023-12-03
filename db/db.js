const Sequelize = require('sequelize');
require('dotenv').config();
const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
  connectionLimit: 10, // default = 10
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function executeQuery(query, params) {
  const connection = await pool.getConnection();
  try {
    const [rows, fields] = await connection.query(query, params);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports =  pool;