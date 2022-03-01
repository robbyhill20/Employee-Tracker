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
  viewDepartments() {
    return this.connection.promise.query(
      "SELECT department.id, department.name, SUM(role.salary) AS total_budget FROM employee;"
    );
  }
  findBudget(){
    return this.connection.promise.query(
        "SELECT department.id, department.name, FROM department;")
  }
  findManagers(employeeId){
    return this.connection.promise().query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
    );
  }
  findRoles(){
    return this.connection.promise().query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
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
 
  findManagers(employeeId) {
    return this.connection.promise.query(
      "SELECT id, first_name, last_name FROM employee WHERE id !=?",
      employeeId
    );
  }
  deleteEmployee(employeeID) {
    return this.connection.promise.query(
      "DELETE FROM employee WHERE id = ?",
      employeeID
    );
  }
  deleteRole(roleID){
  return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
  }
  deleteDept(departmentID){
    return this.connection.promise().query("DELETE FROM department WHERE id = ?", roleId)
  }
}
module.exports = new DB(connection)