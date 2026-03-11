async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying Multicall2 with account:", deployer.address)

  const Multicall2 = await ethers.getContractFactory("contracts/periphery/libraries/Multicall2.sol:Multicall2")
  const multicall = await Multicall2.deploy()
  await multicall.deployed()

  console.log("Multicall2 deployed to:", multicall.address)
  return { multicall: multicall.address }
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
