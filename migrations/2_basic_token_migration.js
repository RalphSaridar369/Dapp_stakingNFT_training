const basicToken = artifacts.require("BasicToken");
const Swap = artifacts.require("Swap");

module.exports = async function(deployer) {
  // Deploy basicToken
  await deployer.deploy(basicToken);
  const token = await basicToken.deployed();

  // Deploy Swap
  await deployer.deploy(Swap, token.address);
  const ethSwap = await Swap.deployed();

  // Transfer all tokens to Swap (1 million)
  await token.transfer(ethSwap.address, '1000000000000000000000000');
};