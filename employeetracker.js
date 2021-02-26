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
  optionMenu();
});



function optionMenu(){
    inquirer
        .prompt({
            name: 'option',
            type: 'list',
            message: 'Add or View departments, roles, or employees?',
            choices:["ADD", "VIEW", "UPDATE"]
        })
        .then(function(answer){
            if(answer.option === "ADD"){
                addChoices();
            }
            else if(answer.option === "VIEW"){
                viewOption();
            }
            else if(answer.option === "UPDATE"){
                updateEmployee();
            }
        })
        // .then(function)
            
};



viewOption = () =>{
    {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, title, department.name AS department, salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM
  employee INNER JOIN role ON employee.role_id = role.id 
  INNER JOIN department ON role.department_id = department.id 
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id
 ORDER BY employee.id` , (err,data)=>{
        if (err) throw err;
        console.log('read')
        console.table(data);
       optionMenu();
        
    })
    }
}


//function to add departments, roles, employees
function addChoices(){
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
        addEmployee();
      }
    });
}

//function to add departments
function addDepartment(){
    inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?",
        })
     .then(function(answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department
        },
        function(err) {
          if (err) throw err;
          console.log("You successfully added your department");
          optionMenu();
        }
      );
    })
}


// function to add roles
function addRoles(){
    inquirer
    .prompt(
        [{
       name: "title",
       type: "input",
       message: "What's the title of the role?",
        },
        {
       name: "salary",
       type: "input",
       message: "What's desired salary of this role?",
       validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
            }
        },
        {
        name: "id",
        type: "input",
        message: "What's the department id number?",
        }]
    )
     .then(function(answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id:  answer.id
        },
        function(err) {
          if (err) throw err;
          console.log("You successfully added your department");
            optionMenu();
        }
      );
    });
}

// function to add Employee
function addEmployee(){
    inquirer
    .prompt(
        [{
       name: "name",
       type: "input",
       message: "What's the new employee first name?",
        },
        {
       name: "lastName",
       type: "input",
       message: "Whats the new employee last name?",
        },
        {
        name: "roleId",
        type: "input",
        message: "What's the new employee role id?",
        },
        {
        name: "managerId",
        type: "input",
        message: "What's the new employee manager role id?",
        }]
    )
     .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.name,
          last_name: answer.lastName,
          role_id:  answer.roleId,
          manager_id: answer.managerId
        },
        function(err) {
          if (err) throw err;
          console.log("You successfully added your new employee");
          optionMenu();
        }
      );
    });
}

function updateEmployee(){
    connection.query('SELECT * FROM employee', (err,data) => {
    if(err) throw err;
    let employee = data;
    console.log(employee)
    inquirer
        .prompt([
        {
        name: "edit",
        type: "list",
        message: "What would you like to edit?",
        choices: employee.map(data =>{
             return  data.first_name + " " + data.last_name;
            }) 
        }
        ])
    .then(answers => {
        optionMenu();
            })
    
        });
}
    
        
    
