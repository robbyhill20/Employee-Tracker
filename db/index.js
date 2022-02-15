const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  addEmployee(employee) {
    return this.connection.promise.query(
      "INSERT INTO employee SET ?",
      employee
    );
  }
  addRole(role) {
    return this.connection.promise.query("INSERT INTO role SET ?", role);
  }

  addDepartment(department) {
    return this.connection.promise.query(
      "INSERT INTO department SET? ",
      department
    );
  }
  findEmployees() {
    return this.connection.promise.query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title, role.salary, manager.first_name, manager.last_name, department.name, department.id;"
    );
  }
  findDepartments() {
    return this.connection.promise.query(
      "SELECT department.id, department.name, FROM department;"
    );
  }
  findManagers(employeeId){
    return this.connection.promise().query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
    );
  }

  findByDepartment(departmentID) {
    return this.connection.promise.query(
      "SELECT employee.id, employee.firstname, employee.last_name, role.title, FROM employee WHERE department.id = ?;",
      departmentID
    );
  }
  findByManager(managerID) {
    "SELECT employee.id, employee.firstname, employee.last_name, role.title, FROM employee WHERE manager.id = ?;",
      managerID;
  }
  deleteEmployee(employeeID) {
    return this.connection.promise.query(
      "DELETE FROM employee WHERE id = ?",
      employeeID
    );
  }
  findManagers(employeeId) {
    return this.connection.promise.query(
      "SELECT id, first_name, last_name FROM employee WHERE id !=?",
      employeeId
    );
  }
}
