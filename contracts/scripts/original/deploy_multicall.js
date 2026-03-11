// scripts/deploy_multicall.js

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying Multicall2 with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Multicall2 = await hre.ethers.getContractFactory("Multicall2");
  const multicall = await Multicall2.deploy();

  await multicall.deployed();

  console.log("Multicall2 deployed to:", multicall.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying Multicall2:", error);
    process.exit(1);
  });
