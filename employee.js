// Import the NPM packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const ezTable = require("easy-table");
// Connect to the employee_db database using a localhost connection
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "H0ldth3Door?",

  // Name of database
  database: "employee_db",
});
// Connecting to database, logging out when connected and starting main function.
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startQuery();
});
// Main function to route user to correct data table
function startQuery() {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "What would you like to do?",
        choices: ["View all employees", "View all employees by department"],
      },
    ])
    .then(function (answer) {
      if (answer.choices === "View all employees") {
        viewAll();
      } else if (answer.choices === "View all employees by department") {
        viewByDept();
      }
    });
}
// Function to show all employees
function viewAll() {
  let query = "SELECT first_name, last_name FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    let t = new ezTable();
    res.forEach((answer) => {
      t.cell("Name", answer.first_name + " " + answer.last_name);
      t.cell("Role");
      t.cell("Salary");
      t.newRow();
      console.log(t.toString());
    });
  });
}
