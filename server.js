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
        "Remove Employee",
        "End"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View All Departments":
          viewDepartment();
          break;

        case "View All Roles":
          viewRoles();
          break;

          case "View All Employees":
          viewEmployee();
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

          case "Remove Employee":
            removeEmployee();
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

//Add Department
function addDepartment() {
  inquirer
      .prompt(
          {
              name: 'name',
              message: "What is the department's name?",
              type: 'input'
          }
      ).then(function ({ name }) {
          connection.query(`INSERT INTO department (name) VALUES ('${name}')`, function (err, data) {
              if (err) throw err;
              console.log(`${name} Added`)
              
              employeeTracker();
          })
      })
}

//"Add Role" 
function addRole() {

  var query = `SELECT * from department;`

  connection.query(query, function (err, res) {
    if (err) throw err;


    const departmentChoices = res.map(({ id, name }) => ({
      value:id,
      name:name,
    
    }));

    promptAddRole(departmentChoices);
  });
}

function promptAddRole(departmentChoices) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Role title?"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Role Salary"
      },
      {
        type: "list",
        name: "departmentId",
        message: "Department?",
        choices: departmentChoices
      },
    ])
    .then(function (answer) {

      var query = `INSERT INTO role SET ?`

      connection.query(
        query, {
        title: answer.roleTitle,
        salary: answer.roleSalary,
        department_id: answer.departmentId
      },
        function (err, res) {
          if (err) throw err;
   
          console.log(`${answer.roleTitle} Added`);
        
          employeeTracker();
        });

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

    const roleChoices = res.map(({ id, title }) => ({
      value: id,
     name: title
    }));

    console.table(res);
    console.log("RoleToInsert!");

    promptInsert(roleChoices);
  });
}

  function promptInsert(roleChoices) {
  

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
        choices: roleChoices
        
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
          console.log(`${answer.first_name} ${answer.last_name} added successfully!\n`);
          employeeTracker();
        });
    });
}



//"Update Employee Role" 

function updateEmployeeRole() {
  console.log("Updating an employee");

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

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`      
    }));

    roleArray(employeeChoices);
  });
}

function roleArray(employeeChoices) {


  var query =
    `SELECT r.id, r.title, r.salary 
  FROM role r`
  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title }) => ({
      value: id, name: `${id} ${title}`      
    }));

    console.log(" Updating  r ole!\n")

    promptEmployeeRole(employeeChoices, roleChoices);
  });
}

function promptEmployeeRole(employeeChoices, roleChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to update?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employee SET role_id = ? WHERE id = ?`
     
      connection.query(query,
        [ answer.roleId,  
          answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

 
          console.log("Employee role has been successfully!");

          employeeTracker();
        });
    });
}

//Remove Employees
function removeEmployee() {
  console.log("Deleting an employee");

  var query =
    `SELECT e.id, e.first_name, e.last_name
      FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`
    }));

       promptDelete(deleteEmployeeChoices);
  });
}

// User choose the employee list, then employee is deleted
function promptDelete(deleteEmployeeChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove from the list?",
        choices: deleteEmployeeChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE FROM employee WHERE ?`;
       connection.query(query, { id: answer.employeeId }, function (err, res) {
        if (err) throw err;

        
        console.log( "Selected Employee has been from the list!\n");

        employeeTracker();
      });
    });
}
