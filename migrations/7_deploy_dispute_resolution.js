const DisputeResolutionContract = artifacts.require("DisputeResolution");

module.exports = function (deployer) {
  deployer.deploy(DisputeResolutionContract);
};
