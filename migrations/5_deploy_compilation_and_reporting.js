const CompilationAndReporting = artifacts.require("ComplianceAndReporting");
const SupplyChainManagementContract = artifacts.require("SupplyChainManagement");
const UserManagementContract = artifacts.require("UserManagement");

module.exports = async function (deployer) {
  const supplyChainManagement = await SupplyChainManagementContract.deployed();
  const userManagement = await UserManagementContract.deployed();
  await deployer.deploy(CompilationAndReporting, supplyChainManagement.address, userManagement.address);
};
