// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import colors from 'colors';
import fs from 'fs';
// TODO: Create an array of questions for user input
const questions = [

        {
          type: 'input',
          message: colors.magenta('What is the title of your project?'),
          name: 'title',
        },
        {
          type: 'input',
          message: colors.magenta('Provide a description of your project:'),
          name: 'description',
        },
        {
          type: 'input',
          message: colors.magenta('Provide installation instructions:'),
          name: 'installation',
        },
        {
          type: 'input',
          message: colors.magenta('Provide usage information:'),
          name: 'usage',
        },
        {
          type: 'list',
          message: colors.magenta('Choose a license for your project:'),
          name: 'license',
          choices: ['MIT', 'GPL 3.0', 'Apache 2.0', 'BSD 3-Clause', 'None'],
        },
        {
          type: 'input',
          message: colors.magenta('Provide contribution guidelines:'),
          name: 'contributing',
        },
        {
          type: 'input',
          message: colors.magenta('Provide test instructions:'),
          name: 'tests',
        },
        {
          type: 'input',
          message: colors.magenta('What is your GitHub username?'),
          name: 'github',
        },
        {
          type: 'input',
          message: colors.magenta('What is your email address?'),
          name: 'email',
        }

];
//Function to Generate a README file 
function generateREADME(data) {
    return `
  # ${data.title}
  
  ![License](https://img.shields.io/badge/license-${data.license}-blue)
  
  ## Description
  ${data.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  ${data.installation}
  
  ## Usage
  ${data.usage}
  
  ## License
  This project is licensed under the ${data.license} license.
  
  ## Contributing
  ${data.contributing}
  
  ## Tests
  ${data.tests}
  
  ## Questions
  If you have any questions, feel free to contact me at [${data.email}](mailto:${data.email}) or visit my GitHub profile: [${data.github}](https://github.com/${data.github}).
    `;
  }
// TODO: Create a function to write README file
function writeToFile(fileName, data) {

    fs.writeFileSync(fileName, data, 'utf-8');
  console.log(colors.green(`${fileName} has been generated successfully!`));

}

// TODO: Create a function to initialize app
function init() {

    inquirer
    .prompt(questions)
    .then((response) => {
      // Generate README content using the user's responses
      const readmeContent = generateREADME(response);

      // Write the README content to a file
      writeToFile('README.md', readmeContent);

      // Optionally, save the user input data for later use
      fs.writeFileSync('userData.json', JSON.stringify(response, null, 2));

      console.log('User data has been saved to userData.json');
    })
    .catch((error) => {
      console.error(colors.red('An error occurred:', error));
    });
}

// Function call to initialize app
init();
