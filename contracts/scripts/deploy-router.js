async function main(factoryAddress, wstraxAddress) {
  const [deployer] = await ethers.getSigners()

  // Allow override from env, function args, or hardcoded known addresses
  const factory = factoryAddress || process.env.FACTORY_ADDRESS
  const wstrax = wstraxAddress || process.env.WSTRAX_ADDRESS

  if (!factory || !wstrax) {
    console.error("Missing FACTORY_ADDRESS or WSTRAX_ADDRESS")
    console.error("Set them as env vars or pass to deploy-all.js")
    process.exit(1)
  }

  console.log("Deploying PancakeRouter with account:", deployer.address)
  console.log("  Factory:", factory)
  console.log("  WSTRAX:", wstrax)

  const PancakeRouter = await ethers.getContractFactory("contracts/periphery/PancakeRouter.sol:PancakeRouter")
  const router = await PancakeRouter.deploy(factory, wstrax)
  await router.deployed()

  console.log("PancakeRouter deployed to:", router.address)
  return { router: router.address }
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
