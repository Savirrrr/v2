const fs = require('fs');
const path = require('path');

const SupplyChainManagementContract = artifacts.require("SupplyChainManagement");
const UserManagementContract = artifacts.require("UserManagement");
const InventoryManagementContract = artifacts.require("InventoryManagement");
const ComplianceAndReportingContract = artifacts.require("ComplianceAndReporting");
const ConsumerTransparencyContract = artifacts.require("ConsumerTransparency");
const DisputeResolutionContract = artifacts.require("DisputeResolution");

function updateEnvFile(contractName, contractAddress) {
    const envPath = path.resolve(__dirname, '../.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }
    const updatedEnvContent = envContent
        .split('\n')
        .filter(line => !line.startsWith(`${contractName}_ADDRESS=`))
        .concat(`${contractName}_ADDRESS=${contractAddress}`)
        .join('\n');
    fs.writeFileSync(envPath, updatedEnvContent);
}

module.exports = async function (deployer) {
    // Deploy UserManagementContract if not already deployed
    await deployer.deploy(UserManagementContract);
    const userManagement = await UserManagementContract.deployed();
    updateEnvFile("USER_MANAGEMENT", userManagement.address);

    // Deploy InventoryManagementContract if not already deployed
    await deployer.deploy(InventoryManagementContract, userManagement.address);
    const inventoryManagement = await InventoryManagementContract.deployed();
    updateEnvFile("INVENTORY_MANAGEMENT", inventoryManagement.address);

    // Deploy SupplyChainManagementContract
    await deployer.deploy(SupplyChainManagementContract, userManagement.address, inventoryManagement.address);
    const supplyChainManagement = await SupplyChainManagementContract.deployed();
    updateEnvFile("SUPPLY_CHAIN_MANAGEMENT", supplyChainManagement.address);

    // Deploy ComplianceAndReportingContract
    await deployer.deploy(ComplianceAndReportingContract, supplyChainManagement.address, userManagement.address);
    const complianceAndReporting = await ComplianceAndReportingContract.deployed();
    updateEnvFile("COMPLIANCE_AND_REPORTING", complianceAndReporting.address);

    // Deploy ConsumerTransparencyContract
    await deployer.deploy(ConsumerTransparencyContract, supplyChainManagement.address);
    const consumerTransparency = await ConsumerTransparencyContract.deployed();
    updateEnvFile("CONSUMER_TRANSPARENCY", consumerTransparency.address);

    // Deploy DisputeResolutionContract
    await deployer.deploy(DisputeResolutionContract);
    const disputeResolution = await DisputeResolutionContract.deployed();
    updateEnvFile("DISPUTE_RESOLUTION", disputeResolution.address);

    console.log("All contracts have been deployed and addresses updated in .env file.");
};
