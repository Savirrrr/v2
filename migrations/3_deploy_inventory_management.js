const fs = require('fs');
const path = require('path');
const InventoryManagementContract = artifacts.require("InventoryManagement");
const UserManagementContract = artifacts.require("UserManagement");

module.exports = async function (deployer) {
  // Deploy UserManagementContract first if it hasn't been deployed
  await deployer.deploy(UserManagementContract);
  const userManagement = await UserManagementContract.deployed();

  // Deploy InventoryManagementContract, passing the UserManagement address
  await deployer.deploy(InventoryManagementContract, userManagement.address);
  const inventoryManagement = await InventoryManagementContract.deployed();

  // Get the addresses of the deployed contracts
  const userManagementAddress = userManagement.address;
  const inventoryManagementAddress = inventoryManagement.address;

  // Path to the .env file
  const envPath = path.resolve(__dirname, '../.env');

  // Read the current .env file content
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Add or update the addresses in .env
  const updatedEnvContent = envContent
    .split('\n')
    .filter(line => !line.startsWith('USER_MANAGEMENT_ADDRESS=') && !line.startsWith('INVENTORY_MANAGEMENT_ADDRESS='))
    .concat(`USER_MANAGEMENT_ADDRESS=${userManagementAddress}`)
    .concat(`INVENTORY_MANAGEMENT_ADDRESS=${inventoryManagementAddress}`)
    .join('\n');

  // Write the updated content back to the .env file
  fs.writeFileSync(envPath, updatedEnvContent);

  console.log(`UserManagement contract deployed at address: ${userManagementAddress}`);
  console.log(`InventoryManagement contract deployed at address: ${inventoryManagementAddress}`);
};
