DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE role( 
  id INT AUTO_INCREMENT PRIMARY KEY,
    name (VARCHAR(30) NOT NULL,
   department_id INT NOT NULL, 
   salary DECIMAL NOT NULL,
    ); 

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT ,
);

CREATE TABLE department( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    name (VARCHAR(30) NOT NULL
    );

