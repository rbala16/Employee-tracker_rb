# 12 SQL: Employee Tracker

## Your Task

Create a command-line application  to manage a company's employee database, using Node.js, Inquirer, and MySQL.


## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [License](#license)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## License 
MIT License

## Installation
1. Clone the repository
2. Install the following: 
- Node.JS [Version 16.18.1](https://nodejs.org/en/blog/release/v16.18.1/)
- Inquirer.js: [Version 8.2.4](https://www.npmjs.com/package/inquirer/v/8.2.4)
- mysql2- (https://www.npmjs.com/package/mysql2)

## Usage
💻   
  This applications is to view and manage the departments, roles, and employees in the company
so that owner can organize and plan his company busines according to that.<br>
Run the following command at the terminal:
`mysql -u root -p` <br>
`node server.js`  <br>
Please watch the demo viedo for step by step instructions

## Contributing
Rajni bala : (https://github.com/rbala16)

## Questions
✉️ Contact me with any questions: [Email:]bala12rajni@gmail.com , [Github](https://github.com/rbala16)<br />

## Mockup
* A walkthrough video demonstrating the functionality of the application.<br>
![alt demo](./demo/walkThrough.gif)
<br>
The full movie file showing functionality of the application can be found here :<br>
 https://drive.google.com/file/d/1XzDHa0DOai7lAF7fPCqK0ff19oSCTw6B/view


## Important Links

You are required to submit BOTH of the following for review:

* A walkthrough video demonstrating the functionality of the application.<br>
https://drive.google.com/file/d/1XzDHa0DOai7lAF7fPCqK0ff19oSCTw6B/view

* The URL of the GitHub repository, with a unique name and a README describing the project.<br>
https://github.com/rbala16/Employee-tracker_rb


