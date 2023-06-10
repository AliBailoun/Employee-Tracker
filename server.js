const inquirer = require("inquirer");
const table = require("console.table");
const mysql = require("mysql2");
const figlet = require("figlet");
const gradient = require("gradient-string");


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'employee_db'
    },
);



const questions = () =>

    inquirer.prompt([{
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Quit"
        ],

    }]).then(answers => {
        switch (answers.options) {
            case "View all departments":
                viewAllDepartments();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "View all employees":
                viewAllEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Quit":
                db.end()
                console.log("Bye")
                break;
        }
    });


const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err) console.log(err);
        console.table(res);
        questions();
    })
};


const viewAllRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, res) => {
        if (err) console.log(err);
        console.table(res);
        questions();
    })
}

const viewAllEmployees = () => {
    const sql = `SELECT * FROM employee INNER JOIN roles ON employee.role_id = roles.roles_id INNER JOIN department ON roles.department_id = department.department_id `;
    db.query(sql, (err, res) => {
        if (err) console.log(err);
        console.log("This is a list of all our current employees:");
        console.table(res);
        questions();
    })
}

const addDepartment = () =>
    inquirer.prompt([{
        type: "input",
        name: "addedDep",
        message: "What is the name of the new department?"
    }]).then(answers => {
        let sql = "INSERT INTO department (department_name) VALUES (?)"
        db.query(sql, answers.addedDep, (err, res) => {
            if (err) console.log(err);
            console.log("Department added successfully!")
            questions();
        })
    });

const addRole = () =>
    inquirer.prompt([{
        type: "input",
        name: "roleName",
        message: "What is the name of the role you would like to add?"
    },
    {
        type: "input",
        name: "salary",
        message: "What is the salary of the new role?"
    },
    ]).then(answers => {
        db.query(`INSERT INTO roles (title, salary) VALUES ("${answers.roleName}", "${answers.salary}")`, (err, res) => {
            if (err) console.log(err);
            console.log("Role added successfully!"),
                questions();
        })
    })


const addEmployee = () =>
    inquirer.prompt([{
        type: "input",
        name: "firstEmpName",
        message: "What is the first name of the new employee?"
    },
    {
        type: "input",
        name: "lastEmpName",
        message: "What is the last name of the new employee?"
    },
    {
        type: "input",
        name: "empRole",
        message: "What is the role of the new employee going to be? 1: Supervisor, 2: Senior Developer, 3: Junior Developer, 4: Hiring Interviewer, 5: Data Scientist, 6: System Adminstrator"
    },
    {
        type: "input",
        name: "empManager",
        message: "What is the manager id of the new employee?"
    },
    ]).then(function (answers) {
        db.query("INSERT INTO employee SET ?", {
            first_name: answers.firstEmpName,
            last_name: answers.lastEmpName,
            role_id: answers.empRole,
            manager_id: answers.empManager
        }, function (err) {
            if (err) throw err;
            console.log("Employee added succesfully!");
            questions();
        })
    });


figlet.text('              Welcome To Employee Tracker!', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(gradient.rainbow.multiline(data));
});

setTimeout(questions, 1000);
