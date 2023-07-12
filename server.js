//Import packages
const inquirer = require('inquirer');
const mysql = require('mysql')
const cTable = require('console.table');

//Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',

    password: 'Water12345@',
    database: 'employees_db'
  },
  console.log(`Connected to the employess_db.`)
);

db.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  // runs the app
  firstPrompt();
});

function firstPrompt() {
  inquirer
      .prompt(
          {
              name: 'job',
              type: 'list',
              message: 'Which would you like to do?',
              choices: [
                "View All Department",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "update an employee role"],
          }
      ).then(function ({ job }) {
          switch (job) {
              case 'View All Department':
                  viewAlldepartment();
                  break;

              case 'View all Roles':
                viewAllRoles();
                  break;

                  case "View All Employees":
                    viewAllEmployees();
                    break;
          
                  case "Add a Department":
                    addDepartment();
                    break;
          
                  case "Add a Role":
                    addRole();
                    break;
          
                  case "Add an Employee":
                    addanEmployee();
                    break;
          
                    case "Update an Employe Role":
                    updateanEmployeeRole();
                    break;

                  case "Exit":
                    db.end();
                    break;
          }

      })
};






