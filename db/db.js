const Sequelize = require('sequelize');

require('dotenv').config();
const mysql2 = require('mysql2/promise');

const pool  = mysql2.createPool({
  connectionLimit : 10,  // default = 10
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_NAME
});

module.exports = pool;