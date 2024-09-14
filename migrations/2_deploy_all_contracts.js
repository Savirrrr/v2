const fs = require('fs');
const path = require('path');
const UserManagementContract = artifacts.require("UserManagement");

module.exports = async function (deployer) {
  await deployer.deploy(UserManagementContract);
  const deployedContract = await UserManagementContract.deployed();

  // Get the address of the deployed contract
  const contractAddress = deployedContract.address;

  // Path to the .env file
  const envPath = path.resolve(__dirname, '../.env');

  // Read the current .env file content
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Add or update the USER_MANAGEMENT_ADDRESS in .env
  const updatedEnvContent = envContent
    .split('\n')
    .filter(line => !line.startsWith('USER_MANAGEMENT_ADDRESS='))
    .concat(`USER_MANAGEMENT_ADDRESS=${contractAddress}`)
    .join('\n');

  // Write the updated content back to the .env file
  fs.writeFileSync(envPath, updatedEnvContent);

  console.log(`UserManagement contract deployed at address: ${contractAddress}`);
};
