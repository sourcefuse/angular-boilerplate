const {writeFile} = require('fs');
const {argv} = require('yargs');

//reading env variables from .env file
require('dotenv').config();

const targetPath: string = './src/assets/json/environment.json';
//we can access the env variables
//in the process.env object

const environmentFileContent = `{
  "clientId": "${process.env['CLIENT_ID']}",
  "publicKey": "${process.env['CLIENT_SECRET']}",
  "cspApiUrl": "${process.env['CSP_API_URL']}",
  "baseApiUrl": "${process.env['BASE_API_URL']}",
  "authServiceUrl": "${process.env['AUTH_SERVICE_URL']}",
  "userServiceUrl": "${process.env['USER_SERVICE_URL']}"
}`;
// writing content to the respective file
writeFile(targetPath, environmentFileContent, (err: unknown) => {
  if (err) {
    console.log(err);
  }
  console.log(`environment variables written to ${targetPath}`);
});
