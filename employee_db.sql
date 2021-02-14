-- Calling which database to use
USE employee_db;

-- Adding department titles as constants for the application
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)   
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO department (name)
VALUES ("HR");

INSERT INTO department (name)
VALUES ("Engineering");

-- Adding all roles to database with salaries. ID's correspond with the ID of the department they belong to
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Rep", 40000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 55000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("CFO", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 75000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Paralegal", 37000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Rep", 65000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Lead", 75000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Developer", 80000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Sr. Software Developer", 105000, 5);

-- Adding Employees to Database for each role
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Emily", "Hitchens", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luke", "Skywalker", 3, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Darth", "Vader", 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tony", "Stark", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Peter", "Parker", 6, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wanda", "Vision", 7, 8);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Dr.", "Strange", 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Thor", "GodOfThunder", 9, 10);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tom", "Brady", 10);