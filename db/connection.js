const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3002,
  password: "password",
  database: "employees",

});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;