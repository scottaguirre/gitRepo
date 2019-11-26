const mysql = require("mysql");

// Database Connection
const db = mysql.createConnection({
  user: "scottaguirre_scottaguirre",
  password: "EiSa170283",
  database: "scottaguirre_test",
  host: "127.0.0.1"
});

module.exports = db;
