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
        choices: [
          "View all employees",
          "View all employees by department",
          "View all roles",
          "View all departments",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update employee role",
          "Leave database",
        ],
      },
    ])
    .then(function (answer) {
      if (answer.choices === "View all employees") {
        viewAll();
      } else if (answer.choices === "View all employees by department") {
        departmentView();
      } else if (answer.choices === "Add Employee") {
        addEmployee();
      } else if (answer.choices === "Add Department") {
        addDepartment();
      } else if (answer.choices === "Add Role") {
        addRole();
      } else if (answer.choices === "View all roles") {
        viewAllRoles();
      } else if (answer.choices === "View all departments") {
        viewAllDepts();
      } else if (answer.choices === "Update employee role") {
        updateEmpRole();
      } else {
        connection.end();
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
      t.cell("Salary", answer.salary);
      t.cell("Manager");
      t.newRow();
    });
    console.log(t.toString());
    startQuery();
  });
}
// Function to look at all employees for specific department
function departmentView() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "deptChoice",
          type: "list",
          message: "Which department would you like to view?",
          choices: function () {
            let choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].name);
            }
            return choiceArray;
          },
        },
      ])
      .then(function (answer) {
        // JSON.stringify(answer);
        let query =
          "SELECT employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, role.id, role.department_id, department.id, department.name, employee.id FROM ((employee INNER JOIN role ON employee.role_id=role.id) INNER JOIN department ON role.department_id=department.id) WHERE department.name = ?";
        connection.query(query, answer.deptChoice, function (err, res) {
          if (err) throw err;
          let table = new ezTable();
          res.forEach((answer) => {
            table.cell("ID", answer.id);
            table.cell("First Name", answer.first_name);
            table.cell("Last Name", answer.last_name);
            table.cell("Role", answer.title);
            table.cell("Department", answer.name);
            table.cell("Salary", answer.salary);
            table.cell("Manager");
            table.newRow();
          });
          console.log(table.toString());
          startQuery();
        });
      });
  });
}
// Function to add employee to the database
function addEmployee() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "empFirst",
          type: "input",
          message: "Please enter the employees first name",
        },
        {
          name: "empLast",
          type: "input",
          message: "Please enter the employees last name",
        },
        {
          name: "empRole",
          type: "list",
          message: "Which role was the employee hired for?",
          choices: function () {
            let choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
        },
      ])
      .then(function (answer) {
        let query =
          "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, (SELECT id FROM role WHERE title=?))";

        connection.query(
          query,
          [answer.empFirst, answer.empLast, answer.empRole],
          function (err, res) {
            if (err) throw err;
            console.log("Employee added!");
            startQuery();
          }
        );
      });
  });
}
// Adding a new department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "dept",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then(function (answer) {
      let query = `INSERT INTO department (name) VALUES ('${answer.dept}')`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("New department " + answer.dept + " added to database");
        startQuery();
      });
    });
}
// Adding a new role
function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "role",
          type: "input",
          message: "What is the name of the role you are adding?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this role?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
        },
        {
          name: "dept",
          type: "list",
          message: "What department does this belong to?",
          choices: function () {
            let choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].name);
            }
            return choiceArray;
          },
        },
      ])
      .then(function (answer) {
        let query =
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT ID FROM department WHERE name=?))";
        connection.query(
          query,
          [answer.role, answer.salary, answer.dept],
          function (err, res) {
            if (err) throw err;
            console.log("Role successfully added!");
            startQuery();
          }
        );
      });
  });
}
// View all roles
function viewAllRoles() {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    let t = new ezTable();
    res.forEach((answer) => {
      t.cell("Role", answer.title);
      t.cell("Salary", answer.salary);
      t.newRow();
    });
    console.log(t.toString());
    startQuery();
  });
}
// View all departments
function viewAllDepts() {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    let t = new ezTable();
    res.forEach((answer) => {
      t.cell("Department", answer.name);
      t.newRow();
    });
    console.log(t.toString());
    startQuery();
  });
}
// Update a single employees role
function updateEmpRole() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "deptChoice",
        type: "list",
        message: "Which employee would you like to update?",
        choices: function () {
          let choiceArray = [];

          for (var i = 0; i < results.length; i++) {
            choiceArray.push([results[i].first_name, results[i].last_name]);
          }
          return choiceArray;
        },
      },
    ]);
  });
}
