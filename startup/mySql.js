
const mysql = require('mariadb');
const pool  = mysql.createPool({
  connectionLimit : 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taxaudit',
});

exports.pool = pool