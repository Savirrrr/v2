const SupplyChainManagementContract = artifacts.require("SupplyChainManagement");
const UserManagementContract = artifacts.require("UserManagement");
const InventoryManagemntContract = artifacts.require("InventoryManagement");

module.exports = async function (deployer) {
  const userManagement = await UserManagementContract.deployed();
  const inventoryManagement = await InventoryManagemntContract.deployed();
  await deployer.deploy(SupplyChainManagementContract, userManagement.address, inventoryManagement.address);
};
