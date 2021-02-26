DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(30) NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY(role_id) REFERENCES employee(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


INSERT INTO department (name) VALUES ("Engineering"),("Sales"),("Legal");
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 90000, 1), ("Junior Engineer", 70000, 1), ("Sales Lead", 55000, 2), ("Sales Associate", 40000, 2), ("Lawyer", 65000, 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("John", "Smith", 3), ("Sam", "Cohen", 1), ("Anna", "Collins", 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Chloe", "Naylor", 2, 2), ("Ben", "Johnson", 4, 1), ("Denise", "Jacobs", 2,2);

