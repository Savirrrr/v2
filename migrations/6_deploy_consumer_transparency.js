const ConsumerTransparencyContract = artifacts.require("ConsumerTransparency");
const SupplyChainManagementContract = artifacts.require("SupplyChainManagement");

module.exports = async function (deployer) {
  const supplyChainManagement = await SupplyChainManagementContract.deployed();
  await deployer.deploy(ConsumerTransparencyContract, supplyChainManagement.address);
};
