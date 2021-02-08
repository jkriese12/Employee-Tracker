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
  let query =
    "SELECT employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, role.id, role.department_id, department.id, department.name, employee.id FROM ((employee INNER JOIN role ON employee.role_id=role.id) INNER JOIN department ON role.department_id=department.id)";
  connection.query(query, function (err, res) {
    if (err) throw err;
    let t = new ezTable();
    res.forEach((answer) => {
      t.cell("ID", answer.id);
      t.cell("First Name", answer.first_name);
      t.cell("Last Name", answer.last_name);
      t.cell("Role", answer.title);
      t.cell("Department", answer.name);
      t.cell("Salary");
      t.cell("Manager");
      t.newRow();
      console.log(t.toString());
    });
  });
  connection.end();
}
