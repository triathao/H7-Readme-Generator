const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
    return inquirer.prompt([ 
    {
        type: 'input',
        name: 'title',
        message: 'Enter Project Title or Name.'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Explain and describe project details.'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How to Install'
    }, 
    {
        type: 'input',
        name: 'usage',
        message: 'What are the benefits of this app?'
    },
    {
        type: 'checkbox',
        name: 'license',
        choices: [
            'GNU_AGPLv3',
            'GNU_GPLv3',
            'Mozilla',
            'Apache',
            'MIT',
            'Boost',
            'The_unlicense'],
        message: 'Select License' 
    },
    {
        type: 'input',
        name: 'contributors',
        message: 'List the contributors in your project.'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'How should a user run tests on your project?'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username.'  
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email.'  
    }
]);
};

const generateREADME = (resp) =>
`
# ${resp.title}
## Description
![License](https://img.shields.io/badge/license-${resp.license}-blue.svg)
\n${resp.description}
## Table of content
${resp.contents} \n
* [Title](#title)
* [Description](#description)
* [Contents](#contents)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributors](#contributors)
* [Tests](#tests)
* [Q&A](#QandA)
## Installation
${resp.installation}
## Usage
${resp.usage}
## License
${resp.license}
## Contributors
${resp.contributors}
\nFor more information about the project you can contact me @ triathao@gmail.com
## Tests
${resp.tests}
## Questions
${resp.Questions}
Check out my [GitHub profile](https://github.com/${resp.github}) for more projects and information. 
\nIf you have additional questions, please email me at ${resp.email}.
`;

promptUser()
.then((resp) => writeFileAsync(`README.md`, generateREADME(resp)))
.then(() => console.log('Successfully created README.md'))
.catch((err) => console.error(err))
