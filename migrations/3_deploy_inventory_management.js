const InventoryManagemntContract = artifacts.require("InventoryManagement");
const UserManagementContract = artifacts.require("UserManagement");

module.exports = async function (deployer) {
  const userManagement = await UserManagementContract.deployed();
  await deployer.deploy(InventoryManagemntContract, userManagement.address);
};
