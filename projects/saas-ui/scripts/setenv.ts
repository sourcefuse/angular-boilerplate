const {writeFile} = require('fs');
const {argv} = require('yargs');

//reading env variables from .env file
require('dotenv').config();

const targetPath: string =
  './projects/arc-lib/src/lib/assets/json/environment.json';
//we can access the env variables
//in the process.env object

const environmentFileContent = `{
  "logLevel": "${process.env['LOG_LEVEL'] ?? 5}",  
  "baseApiUrl": "${process.env['BASE_API_URL']}",
  "clientId": "${process.env['CLIENT_ID']}",
  "client_secret": "${process.env['CLIENT_SECRET']}",
  "publicKey": "${process.env['PUBLIC_KEY']}",
  "authServiceUrl": "${process.env['AUTH_SERVICE_URL']}",
  "userServiceUrl": "${process.env['USER_SERVICE_URL']}",
  "homePath": "${process.env['HOME_PATH']}",
  "home": "${process.env['HOME']}",
  "tenantMgmtFacadeUrl": "${process.env['TENANT_MGMT_FACADE_URL']}",
  "tenantmgmtServiceUrl": "${process.env['TENANT_MGMT_SERVICE_URL']}",
  "subscriptionServiceUrl": "${process.env['SUBSCRIPTION_SERVICE_URL']}",
  "cognitoLogoutUrl": "${process.env['COGNITO_LOGOUT_URL']}"
}`;
// writing content to the respective file
writeFile(targetPath, environmentFileContent, (err: unknown) => {
  if (err) {
    console.log(err);
  }
  console.log(`environment variables written to ${targetPath}`);
});
