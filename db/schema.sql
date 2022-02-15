DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT ,
    INDEX role_ident (role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dept_id (department_id),
  CONSTRAINT id_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);


