const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


//create a sever 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "david0921",
  database: "employeeTracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  add();
});


//function to add departments, roles, employees

function add(){
inquirer
    .prompt({
      name: "add",
      type: "list",
      message: "Would you like to add DEPARTMENTS, ROLES, or EMPLOYEES?",
      choices: ["DEPARTMENTS", "ROLES", "EMPLOYEES"]
    })
    .then(function(answer) {
      if (answer.add === "DEPARTMENTS") {
        addDepartment();
      }
      else if(answer.add === "ROLES") {
        addRoles();
      } 
      else if(answer.add === "EMPLOYEES"){
        console.log("EMPLOYEES")
      }
    });
}

//function to add departments
function addDepartment(){
    inquirer
    .prompt({
      name: "addDepartment",
      type: "input",
      message: "What department would you like to add?",
        })
     .then(function(answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.addDepartment
        },
        function(err) {
          if (err) throw err;
          console.log("You successfully added your department");
          add();
        }
      );
    });
}

// function to add roles
function addRoles(){
    inquirer
    .prompt(
        {
      name: "addTitle",
      type: "input",
      message: "What's the title of the role?",
        },
        {
      name: "addSalary",
      type: "input",
      message: "What's desired salary of this role?",
        },
        {
    name: "addId",
      type: "input",
      message: "What's the department id number?",
        }
    )
     .then(function(answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.addTitle,
          salary: answer.addSalary,
          department_id:  answer.addId
        },
        function(err) {
          if (err) throw err;
          console.log("You successfully added your department");
          add();
        }
      );
    });
}



