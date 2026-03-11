async function main() {
    const [deployer] = await ethers.getSigners();
  
    const factoryAddress = "0xDC29A634611914ed73261A71C8F20D828cA2c09F";
    const WSTRAXAddress = "0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18";
  
    console.log("Deploying PancakeRouter01 with the account:", deployer.address);
  
    const PancakeRouter01 = await ethers.getContractFactory("PancakeRouter01");
    const pancakeRouter01 = await PancakeRouter01.deploy(factoryAddress, WSTRAXAddress);
  
    await pancakeRouter01.deployed();
  
    console.log("PancakeRouter01 deployed to:", pancakeRouter01.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  