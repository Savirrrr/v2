const UserManagementContract = artifacts.require("UserManagement");

module.exports = function (deployer) {
  deployer.deploy(UserManagementContract);
};
