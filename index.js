const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");
init();

function init() {

promptUser    ();
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
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add An Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Remove An Employee",
          value: "REMOVE_EMPLOYEE"
        },
        
        {
          name: "Update a Reporting Manager",
          value: "UPDATE_MANAGER"
        },
        {
          name: "Delete A Role",
          value: "DELETE_ROLE"
        },
        {
          name: "View Departments",
          value: "VIEW_DEPARTMENTS"
        },
  
        {
          name: "Exit",
          value: "Exit"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    switch (choice) {
      case "VIEW_EMPLOYEES":
        findEmployees();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
   
      default:
        quit();
    }
  }
  )
}

function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is their First Name?"
    },
    {
      name: "last_name",
      message: "What is their Last Name? "
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.findRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          prompt({
            type: "list",
            name: "roleId",
            message: "What role do they have?",
            choices: roleChoices
          })
            
        .then(() => promptUser())
                })
            })
        }
    


function quit() {
  console.log("See you later!");
  process.exit();
}
