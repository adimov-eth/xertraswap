async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying PancakeFactory with the account:", deployer.address);
  
    const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
    const pancakeFactory = await PancakeFactory.deploy(deployer.address);
  
    await pancakeFactory.deployed();
  
    console.log("PancakeFactory deployed to:", pancakeFactory.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  