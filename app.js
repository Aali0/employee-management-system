const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const idArr = [];
const engineerTeam = [];

const interface = () => {

    const createManager = () => {
        console.log('Build your engineering team');
        inquirer.prompt([
            {
                type: 'input',
                name: 'managerName',
                message: 'What is the name of your manager?'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is the id of your manager?'
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'What is the email for your manager?'
            },
            {
                type :'input',
                name : 'managerOfficeNumber',
                message: 'What is the office number for your manager?'
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            engineerTeam.push(manager);
            idArr.push(answers.managerId);
            createTeam();
        });
    }

    const createTeam = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'memberChoice',
                message: 'Which type of team memeber would you like to pick?',
                choices: [
                    'Engineer',
                    'Intern',
                    'No more team members needed'
                ]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }


    const addEngineer = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'What is the name of your engineer?'
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'What is the ID of your engineer'
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'What is the email for your engineer?'
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: 'What is the GitHub username for your engineer?'
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            engineerTeam.push(engineer);
            idArr.push(answers.engineerId);
            createTeam();
        });
    }

    const addIntern = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'What is the name of your intern?'
            },
            {
                type: 'input',
                name: 'interId',
                message: 'What is the ID of your intern?'
            },
            {
                type: 'input',
                name: 'internEmail',
                message: 'What is the email of your intern?'
            },
            {
                type: 'input',
                name: 'internSchool',
                message: 'What is the school of your intern?'
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            engineerTeam.push(intern);
            idArr.push(answers.internId);
            createTeam();
        });
    }

    const buildTeam = () => {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(engineerTeam), 'utf-8');
    }

    createManager();
}


interface();