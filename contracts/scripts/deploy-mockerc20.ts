// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";

import {getDeployedAddresses} from "./../migrations-ts/deployed_addresses";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // deploy MockErc20 contract
  const MockErc20Factory = await hre.ethers.getContractFactory("MockErc20");

  const mockErc20Instance = await MockErc20Factory.deploy("Test ERC20 Token", "tToken", 18);

  console.log("Deployment success!\nMockErc20 address:", mockErc20Instance.address);

  if (!hre.hardhatArguments.network) { return }

  console.log("Waiting for etherscan to catch up for 3 confirmations")

  // wait for the contract to be mined with 3 confirmations
  await mockErc20Instance.deployTransaction.wait(3); // confirmations

  await hre.run("verify:verify", {
    address: mockErc20Instance.address,
    constructorArguments: [],
  });

  // output message that verification is successful
  console.log("Verification successful!");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
