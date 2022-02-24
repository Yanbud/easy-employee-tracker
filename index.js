const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { Department, allDepts } = require('./lib/Department');
const { Employee, allEmps } = require('./lib/Employee');
const { Role, allRoles } = require('./lib/Role');



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'newone',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);


function menu() {
    inquirer.prompt([{
                type: `list`,
                name: `type`,
                message: `What would you like to do?`,
                choices: [
                    `View All Employees`,
                    `Add Employee`,
                    `Update Employee Role`,
                    `View All Roles`,
                    `Add Role`,
                    `View All Departments`,
                    `Add Department`,
                    'Quit'
                ]
            }

        ])
        .then(data => menuCheck(data))
}



function viewEmployees() {
    const sql = `SELECT
    e.id, e.first_name, e.last_name, r.title, d.name AS department,
    r.salary, 
    CONCAT(m.first_name, ' ',m.last_name) AS manager 
     FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id=d.id 
    LEFT JOIN employee m ON m.id = e.manager_id`;
    db.query(sql, function(err, result) {
        console.table(result);
    });
    nextMenu();
}

function viewRoles() {
    const sql = 'SELECT role.id, role.title, department.name as department, role.salary From role JOIN department ON role.department_id=department.id';
    db.query(sql, function(err, result) {
        console.table(result);
    });
    nextMenu();
}

function viewDepartments() {
    const sql = 'SELECT * FROM department ORDER BY id';
    db.query(sql, function(err, result) {
        console.table(result);
    });
    nextMenu();
}

var nameDepts = allDepts.map(item => item.name);
var nameRoles = allRoles.map(item => item.title);

function addDepartment() {
    inquirer.prompt([{
            type: `input`,
            name: `name`,
            message: `What is the name of the department?`
        }])
        .then((data) => {
            const sql = `INSERT INTO department (name) VALUES(?)`;
            const params = [data.name];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.log(`Added ${data.name} to the database`)
            });
            const newOne = new Department(allDepts.length + 1, data.name)
            allDepts.push(newOne)
            nameDepts = allDepts.map(item => item.name)
        })
        .then(nextMenu);
}


function addRole(option) {
    inquirer.prompt([{
                type: `input`,
                name: `title`,
                message: `What is the name of the role?`
            }, {
                type: `input`,
                name: `salary`,
                message: `What is the salary of the role?`
            }, {
                type: `list`,
                name: `dept`,
                message: `Which department does the role belong to?`,
                choices: option
            }

        ])
        .then((data) => {
            const idDept = nameDepts.indexOf(data.dept) + 1;
            const sql = `INSERT INTO role (title,salary,department_id) VALUES(${JSON.stringify(data.title)},${(data.salary)},${idDept})`;
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.log(`Added ${data.title} to the database`)
            });
            const newOne = new Role(allRoles.length + 1, data.title, data.salary, idDept)
            allRoles.push(newOne)
            nameRoles = allRoles.map(item => item.title)
        })
        .then(nextMenu);
}

var nameEmps = allEmps.map(item => item.first_name + ' ' + item.last_name)
var empty = new Employee(0, 'None', '', 0, 'NULL');
var allMans = allEmps;
allMans.unshift(empty);
var nameMans = allMans.map(item => item.first_name + ' ' + item.last_name);

function addEmployee(option1, option2) {
    inquirer.prompt([{
                type: `input`,
                name: `first_name`,
                message: `What is the employee's first name?`
            }, {
                type: `input`,
                name: `last_name`,
                message: `What is the employee's last name?`
            }, {
                type: `list`,
                name: `role`,
                message: `What is the employee's role?`,
                choices: option1
            }, {
                type: `list`,
                name: `manager`,
                message: `What is the employee's manager?`,
                choices: option2
            }

        ])
        .then((data) => {
            const idRole = nameRoles.indexOf(data.role) + 1;
            const idMan = nameMans.indexOf(data.manager);
            const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES(${JSON.stringify(data.first_name)},${JSON.stringify(data.last_name)},${idRole},${idMan})`;
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.log(`Added ${data.first_name} ${data.last_name} to the database`)
            });
            const newOne = new Employee(allEmps.length, data.first_name, data.last_name, idRole, idMan)
            allEmps.push(newOne);
            allEmps.shift()
            nameEmps = allEmps.map(item => item.first_name + ' ' + item.last_name)
        })
        .then(nextMenu);
}

function updateEmpRole(option1, option2) {
    inquirer.prompt([{
                type: `list`,
                name: `employee`,
                message: `Which employee's role do you want to update?`,
                choices: option1
            }, {
                type: `list`,
                name: `role`,
                message: `Which role do you want to assign the selected employee?`,
                choices: option2
            }

        ])
        .then((data) => {
            const idEmp = nameEmps.indexOf(data.employee) + 1;
            const idRole = nameRoles.indexOf(data.role) + 1;
            const sql = `UPDATE employee SET role_id=${idRole} WHERE id=${idEmp}`;
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.log(`Updated employee's role`)
            });
            allEmps.map(item => {
                if (item.id === idEmp) {
                    return item.role_id = idRole
                }
            })

        })
        .then(nextMenu);
}

function menuCheck(data) {
    switch (data.type) {
        case `View All Employees`:
            viewEmployees();
            break;
        case `View All Roles`:
            viewRoles();
            break;
        case `View All Departments`:
            viewDepartments();
            break;
        case `Add Department`:
            addDepartment();
            break;
        case `Add Role`:
            addRole(nameDepts);
            break;
        case `Add Employee`:
            addEmployee(nameRoles, nameMans);
            break;
        case `Update Employee Role`:
            updateEmpRole(nameEmps, nameRoles);
            break;
        case `Quit`:
            db.end();
            break;
    }
}

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(``);
});
const welcome = () => console.log(`\n◣    WELCOME TO THE TEAM GENERATOR!   ◢\n `)
const nextMenu = () => {
    setTimeout(() => {
        menu();
    }, 50);
}



const init = () => {
    welcome();
    menu();

}

init()