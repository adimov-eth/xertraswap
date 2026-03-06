// scripts/deploy_dai.js

const hre = require("hardhat");

async function main() {
  // Retrieve the deployer's account
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Define token parameters
  const name = "DAI";
  const symbol = "DAI";
  const initialSupply = 1000000; // 1,000,000 tokens
  
  // Get the contract factory
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  
  // Deploy the contract
  const myToken = await MyToken.deploy(name, symbol, initialSupply);
  
  // Wait for deployment to complete
  await myToken.deployed();
  
  console.log("MyToken deployed to:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying MyToken:", error);
    process.exit(1);
  });
