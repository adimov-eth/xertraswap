// Deploy full DEX stack to Auroria testnet in one shot
// Usage: npx hardhat run scripts/deploy-all.js --network auroria
//
// Uses existing WSTRAX on Auroria: 0x57402359Eb6f3aB02c19EA7B98F366f324b66Aae
// Override with WSTRAX_ADDRESS env var if deploying fresh

const deployFactory = require("./deploy-factory")
const deployRouter = require("./deploy-router")
const deployMulticall = require("./deploy-multicall")

// Known WSTRAX on Auroria (6 holders, 1162 STRAX wrapped)
const AURORIA_WSTRAX = "0x57402359Eb6f3aB02c19EA7B98F366f324b66Aae"

async function main() {
  const network = await ethers.provider.getNetwork()
  console.log("==============================================")
  console.log(`  Deploying Xertra DEX to chain ${network.chainId}`)
  console.log("==============================================\n")

  const wstrax = process.env.WSTRAX_ADDRESS || AURORIA_WSTRAX
  console.log("Using WSTRAX:", wstrax)
  console.log("")

  // 1. Factory
  console.log("--- Step 1: PancakeFactory ---")
  const { factory, initCodeHash } = await deployFactory()
  console.log("")

  // 2. Router
  console.log("--- Step 2: PancakeRouter ---")
  const { router } = await deployRouter(factory, wstrax)
  console.log("")

  // 3. Multicall (skip if already deployed)
  console.log("--- Step 3: Multicall2 ---")
  const existingMulticall = process.env.MULTICALL_ADDRESS
  let multicall
  if (existingMulticall) {
    console.log("Using existing Multicall2:", existingMulticall)
    multicall = existingMulticall
  } else {
    const result = await deployMulticall()
    multicall = result.multicall
  }
  console.log("")

  // Summary
  console.log("==============================================")
  console.log("  DEPLOYMENT COMPLETE")
  console.log("==============================================")
  console.log("")
  console.log(`  WSTRAX:              ${wstrax}`)
  console.log(`  PancakeFactory:      ${factory}`)
  console.log(`  INIT_CODE_PAIR_HASH: ${initCodeHash}`)
  console.log(`  PancakeRouter:       ${router}`)
  console.log(`  Multicall2:          ${multicall}`)
  console.log("")
  console.log("Next steps:")
  console.log("  1. Update interface/src/config/chains.ts with these addresses")
  console.log("  2. Update packages/xertra-sdk/src/constants.ts FACTORY_ADDRESS")
  console.log("  3. If INIT_CODE_PAIR_HASH changed, update it in the SDK too")
  console.log("  4. Create initial pairs (e.g. WSTRAX-rSTRAX)")
  console.log("")
  console.log("Verify contracts:")
  console.log(`  npx hardhat verify --network auroria ${factory} <deployer_address>`)
  console.log(`  npx hardhat verify --network auroria ${router} ${factory} ${wstrax}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
