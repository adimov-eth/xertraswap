// Seed testnet with realistic swap activity
// Run: npx hardhat run scripts/seed-activity.js --network auroria

const ROUTER = "0x83e88E09803FF8726A761ec25e91784872596fdB"
const WSTRAX = "0x57402359Eb6f3aB02c19EA7B98F366f324b66Aae"

const TOKENS = {
  xUSD: "0xE71d254C2F1430b597b53D83B3453d519F4C4564",
  xETH: "0xd16Cab1e481eF8401Bfd8fb3BaC42Ce2918e9ad2",
  xBTC: "0xde05775bC57cD8447e3D9F0e9dC4712641cfAB15",
}

const ROUTER_ABI = [
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) payable returns (uint[] memory amounts)",
  "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) returns (uint[] memory amounts)",
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) returns (uint[] memory amounts)",
  "function getAmountsOut(uint amountIn, address[] calldata path) view returns (uint[] memory amounts)",
]

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)",
]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  const [deployer] = await ethers.getSigners()
  const router = new ethers.Contract(ROUTER, ROUTER_ABI, deployer)
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20

  console.log("Seeding activity from:", deployer.address)
  console.log("Balance:", ethers.utils.formatEther(await deployer.getBalance()), "STRAX\n")

  let txCount = 0

  // --- Swaps: STRAX → tokens ---
  const straxSwaps = [
    { token: "xUSD", amount: "0.5" },
    { token: "xETH", amount: "0.3" },
    { token: "xBTC", amount: "0.2" },
    { token: "xUSD", amount: "1.0" },
    { token: "xETH", amount: "0.5" },
    { token: "xUSD", amount: "0.25" },
    { token: "xBTC", amount: "0.15" },
    { token: "xUSD", amount: "2.0" },
  ]

  for (const swap of straxSwaps) {
    try {
      const path = [WSTRAX, TOKENS[swap.token]]
      const amountIn = ethers.utils.parseEther(swap.amount)

      console.log(`Swap ${swap.amount} STRAX → ${swap.token}...`)
      const tx = await router.swapExactETHForTokens(
        0, path, deployer.address, deadline,
        { value: amountIn, gasLimit: 300000 }
      )
      await tx.wait()
      txCount++
      console.log(`  ✓ tx ${tx.hash.slice(0, 10)}...`)
      await sleep(1000)
    } catch (e) {
      console.error(`  ✗ ${swap.token}: ${e.reason || e.message}`)
    }
  }

  // --- Approve tokens for reverse swaps ---
  console.log("\nApproving tokens for reverse swaps...")
  for (const [symbol, addr] of Object.entries(TOKENS)) {
    const token = new ethers.Contract(addr, ERC20_ABI, deployer)
    const bal = await token.balanceOf(deployer.address)
    if (bal.gt(0)) {
      await (await token.approve(ROUTER, ethers.constants.MaxUint256)).wait()
      console.log(`  ${symbol}: approved (balance: ${ethers.utils.formatEther(bal)})`)
    }
  }

  // --- Swaps: tokens → STRAX ---
  const tokenSwaps = [
    { token: "xUSD", amount: "500" },
    { token: "xETH", amount: "0.05" },
    { token: "xUSD", amount: "200" },
    { token: "xBTC", amount: "0.001" },
    { token: "xUSD", amount: "100" },
    { token: "xETH", amount: "0.02" },
  ]

  for (const swap of tokenSwaps) {
    try {
      const path = [TOKENS[swap.token], WSTRAX]
      const amountIn = ethers.utils.parseEther(swap.amount)

      console.log(`Swap ${swap.amount} ${swap.token} → STRAX...`)
      const tx = await router.swapExactTokensForETH(
        amountIn, 0, path, deployer.address, deadline,
        { gasLimit: 300000 }
      )
      await tx.wait()
      txCount++
      console.log(`  ✓ tx ${tx.hash.slice(0, 10)}...`)
      await sleep(1000)
    } catch (e) {
      console.error(`  ✗ ${swap.token}: ${e.reason || e.message}`)
    }
  }

  // --- Swaps: token → token (via WSTRAX) ---
  const crossSwaps = [
    { from: "xUSD", to: "xETH", amount: "100" },
    { from: "xETH", to: "xUSD", amount: "0.01" },
    { from: "xUSD", to: "xBTC", amount: "200" },
    { from: "xBTC", to: "xUSD", amount: "0.001" },
  ]

  for (const swap of crossSwaps) {
    try {
      const path = [TOKENS[swap.from], WSTRAX, TOKENS[swap.to]]
      const amountIn = ethers.utils.parseEther(swap.amount)

      console.log(`Swap ${swap.amount} ${swap.from} → ${swap.to}...`)
      const tx = await router.swapExactTokensForTokens(
        amountIn, 0, path, deployer.address, deadline,
        { gasLimit: 400000 }
      )
      await tx.wait()
      txCount++
      console.log(`  ✓ tx ${tx.hash.slice(0, 10)}...`)
      await sleep(1000)
    } catch (e) {
      console.error(`  ✗ ${swap.from}→${swap.to}: ${e.reason || e.message}`)
    }
  }

  console.log(`\n=== Done: ${txCount} swaps executed ===`)
  console.log("Balance:", ethers.utils.formatEther(await deployer.getBalance()), "STRAX")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
