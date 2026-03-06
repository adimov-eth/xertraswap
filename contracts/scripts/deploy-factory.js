async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying PancakeFactory with account:", deployer.address)
  console.log("Account balance:", (await deployer.getBalance()).toString())

  const PancakeFactory = await ethers.getContractFactory("contracts/core/PancakeFactory.sol:PancakeFactory")
  const factory = await PancakeFactory.deploy(deployer.address)
  await factory.deployed()

  console.log("PancakeFactory deployed to:", factory.address)

  // Get and log the init code hash (needed for SDK pair address computation)
  const initCodeHash = await factory.INIT_CODE_PAIR_HASH()
  console.log("INIT_CODE_PAIR_HASH:", initCodeHash)

  return { factory: factory.address, initCodeHash }
}

module.exports = main

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
