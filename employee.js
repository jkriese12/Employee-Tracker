// Import the NPM packages
const mysql = require("mysql");
const inquirer = require("inquirer");

// Connect to the employee_db database using a localhost connection
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "H0ldth3Door?",

  // Name of database
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startQuery();
});

function startQuery() {
  inquirer.prompt([{}]);
}
