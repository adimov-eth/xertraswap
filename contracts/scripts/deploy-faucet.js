// Deploy and configure the testnet faucet
// Run: npx hardhat run scripts/deploy-faucet.js --network auroria

const TOKENS = {
  xUSD: { address: "0xE71d254C2F1430b597b53D83B3453d519F4C4564", drip: "1000" },  // 1000 xUSD per claim
  xETH: { address: "0xd16Cab1e481eF8401Bfd8fb3BaC42Ce2918e9ad2", drip: "1" },      // 1 xETH per claim
  xBTC: { address: "0xde05775bC57cD8447e3D9F0e9dC4712641cfAB15", drip: "0.01" },   // 0.01 xBTC per claim
}

const ERC20_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)",
]

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying Faucet with account:", deployer.address)

  // Deploy
  const Faucet = await ethers.getContractFactory("contracts/token/Faucet.sol:Faucet")
  const faucet = await Faucet.deploy()
  await faucet.deployed()
  console.log("Faucet deployed to:", faucet.address)

  // Configure tokens
  for (const [symbol, config] of Object.entries(TOKENS)) {
    const amount = ethers.utils.parseEther(config.drip)
    console.log(`Adding ${symbol}: ${config.drip} per claim`)
    await (await faucet.addToken(config.address, amount)).wait()
  }

  // Set cooldown to 1 hour for testnet (instead of 24h)
  console.log("Setting cooldown to 1 hour...")
  await (await faucet.setCooldown(3600)).wait()

  // Set native drip to 5 STRAX
  console.log("Setting native drip to 5 STRAX...")
  await (await faucet.setNativeDripAmount(ethers.utils.parseEther("5"))).wait()

  // Fund faucet with tokens
  console.log("\nFunding faucet with tokens...")
  for (const [symbol, config] of Object.entries(TOKENS)) {
    const token = new ethers.Contract(config.address, ERC20_ABI, deployer)
    const balance = await token.balanceOf(deployer.address)
    // Send half of deployer's balance to faucet
    const sendAmount = balance.div(2)
    console.log(`  Sending ${ethers.utils.formatEther(sendAmount)} ${symbol} to faucet`)
    await (await token.transfer(faucet.address, sendAmount)).wait()
  }

  // Fund faucet with native STRAX (20 STRAX)
  console.log("  Sending 20 STRAX to faucet")
  await (await deployer.sendTransaction({
    to: faucet.address,
    value: ethers.utils.parseEther("20")
  })).wait()

  console.log("\n==============================================")
  console.log("  FAUCET DEPLOYED AND FUNDED")
  console.log("==============================================")
  console.log(`  Address: ${faucet.address}`)
  console.log(`  Cooldown: 1 hour`)
  console.log(`  Native drip: 5 STRAX`)
  console.log(`  Token drips:`)
  for (const [symbol, config] of Object.entries(TOKENS)) {
    console.log(`    ${symbol}: ${config.drip} per claim`)
  }
  console.log("")
  console.log("Remaining deployer balance:", ethers.utils.formatEther(await deployer.getBalance()), "STRAX")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
