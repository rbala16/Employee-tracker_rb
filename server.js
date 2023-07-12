//dependencies required
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");
//const sql = require("./sql");

//mysql connection
const connection = mysql.createConnection({
    host: 'localhost',

   
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'Water12345@',
    database: 'employees_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
   
    // runs the app
    employeeTracker();
});

// function which prompts the user for what action they should take
function employeeTracker() {

  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "End"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View All Departments":
          viewDepartment();
          break;

          case "View All Employees":
            viewEmployee();
            break;

            case "View All Roles":
              viewRoles();
              break;

          case "Add Department":
          addDepartment();
          break;

          case "Add Role":
          addRole();
          break;

         case "Add Employee":
          addEmployee();
          break;

          case "Update Employee Role":
          updateEmployeeRole();
          break;

          case "End":
          connection.end();
          break;
      }
    });
}

//View All Department
function viewDepartment() {
  console.log("Viewing employees\n");

  var query =
    `SELECT * from department`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Employees viewed!\n");

    employeeTracker();
  });

}

//View All Roles
function viewRoles() {
  console.log("Viewing employees\n");

  var query =
    `SELECT * 
    FROM role r
    LEFT JOIN department d
    ON r.department_id = d.id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Employees viewed!\n");

    employeeTracker();
  });

}

//View Employees
function viewEmployee() {
  console.log("Viewing employees\n");

  var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Employees viewed!\n");

    employeeTracker();
  });

}

// Add employee
function addEmployee() {
  console.log("Adding an new employee!")

  var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("RoleToInsert!");

    promptInsert();
  });
}

function promptInsert() {

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: [
          ]
      },
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.insertedRows + "Inserted successfully!\n");

          employeeTracker();
        });
    });
}

