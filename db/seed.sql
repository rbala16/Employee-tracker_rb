USE employees_db;

USE employeeTracker_db;

INSERT INTO department (name) 
VALUES ('Engineering');

INSERT INTO department (name)
 VALUES ('Accounting');

 INSERT INTO department (name)
 VALUES ('Sales');

INSERT INTO role (title, salary, department_id) 
VALUES ('Software Engineer', 120000, 1);
INSERT INTO role (title, salary, department_id)
 VALUES ('Full Stack Web Developer', 100000, 1);

 INSERT INTO role (title, salary, department_id)
 VALUES ('Financial Controller', 100000, 2);
 INSERT INTO role (title, salary, department_id)
 VALUES ('Accountant', 80000, 2);

 INSERT INTO role (title, salary, department_id) 
VALUES ('Sales Manager', 80000, 3);
INSERT INTO role (title, salary, department_id)
 VALUES ('Sales Customer Service', 60000, 3);


INSERT INTO employee (first_name, last_name, role_id,manager_id) 
VALUES ('William', 'Smith', 1,3);
INSERT INTO employee (first_name, last_name, role_id,manager_id) 
VALUES ('Richard', 'Dennis', 2,1);
INSERT INTO employee (first_name, last_name, role_id,manager_id) 
VALUES ('Barbara', 'Deros', 3,NULL);
INSERT INTO employee (first_name, last_name, role_id,manager_id) 
VALUES ('Simran', 'Choudry', 4,3);
INSERT INTO employee (first_name, last_name, role_id,manager_id) 
VALUES ('Lovepreet', 'Kaur', 5,NULL);
INSERT INTO employee (first_name, last_name, role_id,manager_id) 
VALUES ('Sukhman', 'Kumar', 2,NULL);
INSERT INTO employee (first_name, last_name, role_id,manager_id) 
VALUES ('Shiv', 'Choudry', 4,7);
INSERT INTO employee (first_name, last_name, role_id,manager_id) 
VALUES ('Pawan', 'Cruise', 1,2);