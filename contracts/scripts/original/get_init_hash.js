async function main() {
    const pancakeFactoryAddress = "0xDC29A634611914ed73261A71C8F20D828cA2c09F";
  
    const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
    const pancakeFactory = await PancakeFactory.attach(pancakeFactoryAddress);
  
    const INIT_CODE_PAIR_HASH = await pancakeFactory.INIT_CODE_PAIR_HASH();
    console.log("INIT_CODE_PAIR_HASH:", INIT_CODE_PAIR_HASH);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  