const StoreCustomers = artifacts.require("StoreCustomers");

module.exports = function(deployer) {
  deployer.deploy(StoreCustomers);
};
