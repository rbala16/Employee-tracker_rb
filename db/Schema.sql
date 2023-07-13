-- Drops the task_saver_db if it already exists --
DROP DATABASE IF EXISTS employees_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE employees_db;

USE employees_db;

-- Create the department table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

--Create Role table
CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

--Create Employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
)

