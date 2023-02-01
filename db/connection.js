const mysql = require("mysql2");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "employee_db",
  },
  console.log(`Connected to the employees_db database.`)
);

module.exports = connection;