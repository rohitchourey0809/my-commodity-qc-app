// index.js
const mysql = require("mysql");

// MySQL database connection setup
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "commodity_qc_db",
});

module.exports = connection
