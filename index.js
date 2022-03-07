const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");
init();

function init() {
  promptUser();
}
function promptUser() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Welcome! Please make a selection",
      choices: [
        {
          name: "View Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add An Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove an Employee",
          value: "REMOVE_AN_EMPLOYEE",
        },
        {
          name: "Update an Employees Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add A Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove A Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_ALL_DEPARTMENTS",
        },
        {
          name: "View Total Budget By Department",
          value: "VIEW_BUDGET_BY_DEPT",
        },
        {
          name: "Add A Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove A Department",
          value: "REMOVE_DEPARTMENT",
        },

        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;

    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
        case "UPDATE_EMPLOYEE_MANAGER":
          updateEmpMgr();
          break;
        case "VIEW_ALL_DEPARTMENTS":
          viewDepts();
          break;
        case "ADD_DEPARTMENT":
          addDepts();
          break;
        case "REMOVE_DEPARTMENT":
          removeDepts();
          break;
        case "VIEW_BUDGET_BY_DEPT":
          viewBudgetByDept();
          break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDept();
        break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByMgr();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "REMOVE_AN_EMPLOYEE":
        removeEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmpRole();
        break;
   
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      default:
        exit();
    }
  });
}

function viewEmployeesByDept() {
  db.findAllDepts().then(([rows]) => {
    let departments = rows;
    const deptOptions = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department?",
        choices: deptOptions,
      },
    ])
      .then((res) => db.findAllByDept(res.departmentId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => promptUser());
  });
}



function viewEmployeesByMgr() {
  db.findAllEmployees().then(([rows]) => {
    let managers = rows;
    const mgrOptions = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which employees?",
        choices: mgrOptions,
      },
    ])
      .then((res) => db.findAllByManager(res.managerId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log("No current reports");
        } else {
          console.table(employees);
        }
      })
      .then(() => promptUser());
  });
}

function removeEmployee() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which to Remove",
        choices: employeeOptions,
      },
    ])
      .then((res) => db.removeEmployee(res.employeeId))
      .then(() => console.log("Removed"))
      .then(() => promptUser());
  });
}
function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => promptUser());
}



function updateEmpMgr() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Whose manager do you want to change?",
        choices: employeeOptions,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.findAllMgrs(employeeId).then(([rows]) => {
        let managers = rows;
        const mgrOptions = managers.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        }));

        prompt([
          {
            type: "list",
            name: "managerId",
            message:
              "Whose manaer is this?",
            choices: mgrOptions,
          },
        ])
          .then((res) => db.updateEmpMgr(employeeId, res.managerId))
          .then(() => console.log("Updated!"))
          .then(() => promptUser());
      });
    });
  });
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => promptUser());
}

function updateEmpRole() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Who do you want to update?",
        choices: employeeOptions,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.findAllRoles().then(([rows]) => {
        let roles = rows;
        const roleOptions = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        prompt([
          {
            type: "list",
            name: "roleId",
            message: "What role do you want to update?",
            choices: roleOptions,
          },
        ])
          .then((res) => db.updateEmpRole(employeeId, res.roleId))
          .then(() => console.log("Updated"))
          .then(() => promptUser());
      });
    });
  });
}


function addRole() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const deptOptions = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        name: "title",
        message: "What is the role?",
      },
      {
        name: "salary",
        message: "What is the salary of this role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does it belong to?",
        choices: deptOptions,
      },
    ]).then((role) => {
      db.createRole(role)
        .then(() => console.log(`added to the database`))
        .then(() => promptUser());
    });
  });
}

function removeRole() {
  db.findAllRoles().then(([rows]) => {
    let roles = rows;
    const roleOptions = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "roleId",
        message:
          "Which to remove?",
        choices: roleOptions,
      },
    ])
      .then((res) => db.removeRole(res.roleId))
      .then(() => console.log("Removed"))
      .then(() => promptUser());
  });
}

function viewDepts() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => promptUser());
}

function addDepts() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then((res) => {
    let name = res;
    db.createDepartment(name)
      .then(() => console.log(`Added`))
      .then(() => promptUser());
  });
}

function removeDepts() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const deptOptions = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which would you like to remove",
      choices: deptOptions,
    })
      .then((res) => db.removeDepartment(res.departmentId))
      .then(() => console.log(`Removed`))
      .then(() => promptUser());
  });
}

function viewBudgetByDept() {
  db.viewDeptBudgets()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => promptUser());
}

function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is their first name?",
    },
    {
      name: "last_name",
      message: "What is their last name?",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.findAllRoles().then(([rows]) => {
      let roles = rows;
      const roleOptions = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt({
        type: "list",
        name: "roleId",
        message: "What is their role?",
        choices: roleOptions,
      }).then((res) => {
        let roleId = res.roleId;

        db.findAllEmployees().then(([rows]) => {
          let employees = rows;
          const mgrOptions = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }));

          mgrOptions.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "Who is the manager?",
            choices: mgrOptions,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };

              db.createEmployee(employee);
            })
            .then(() =>
              console.log(`Added to database`)
            )
            .then(() => promptUser());
        });
      });
    });
  });
}

function exit() {
  console.log("Thanks for coming");
  process.exit();
}
