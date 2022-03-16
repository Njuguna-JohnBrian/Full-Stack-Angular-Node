const mysql = require('mysql2');

const dbconnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '24852673jbN!',
  database: 'coursedb',
  port: 3306,
});

module.exports = dbconnection;
