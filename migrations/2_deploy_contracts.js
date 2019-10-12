const TrsrToken = artifacts.require("TrsrToken");

module.exports = function(deployer) {
  deployer.deploy(TrsrToken, 1000000);
};
