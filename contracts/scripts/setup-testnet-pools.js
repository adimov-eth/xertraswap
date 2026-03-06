// Setup initial liquidity pools on Auroria testnet
// Run: npx hardhat run scripts/setup-testnet-pools.js --network auroria

const ROUTER = "0x83e88E09803FF8726A761ec25e91784872596fdB"
const FACTORY = "0xfbC6220786AE5B4c86C3F49c3bD013939186C1f2"
const WSTRAX = "0x57402359Eb6f3aB02c19EA7B98F366f324b66Aae"

const TOKENS = {
  xUSD: "0xE71d254C2F1430b597b53D83B3453d519F4C4564",
  xETH: "0xd16Cab1e481eF8401Bfd8fb3BaC42Ce2918e9ad2",
  xBTC: "0xde05775bC57cD8447e3D9F0e9dC4712641cfAB15",
}

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
]

const ROUTER_ABI = [
  "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) payable returns (uint amountToken, uint amountETH, uint liquidity)",
  "function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) returns (uint amountA, uint amountB, uint liquidity)",
]

const FACTORY_ABI = [
  "function allPairsLength() view returns (uint)",
  "function getPair(address tokenA, address tokenB) view returns (address pair)",
]

async function main() {
  const [deployer] = await ethers.getSigners()
  const router = new ethers.Contract(ROUTER, ROUTER_ABI, deployer)
  const factory = new ethers.Contract(FACTORY, FACTORY_ABI, deployer)
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20

  console.log("Deployer:", deployer.address)
  console.log("Balance:", ethers.utils.formatEther(await deployer.getBalance()), "STRAX")
  console.log("")

  // Pool 1: xUSD-WSTRAX (price: 1 STRAX = 0.05 xUSD → 20 STRAX per xUSD)
  // Add 100,000 xUSD + 5,000 STRAX (as ETH)
  {
    console.log("--- Pool 1: xUSD-WSTRAX ---")
    const token = new ethers.Contract(TOKENS.xUSD, ERC20_ABI, deployer)
    const amount = ethers.utils.parseEther("100000") // 100k xUSD
    const ethAmount = ethers.utils.parseEther("20")  // 20 STRAX

    console.log("Approving xUSD...")
    const tx1 = await token.approve(ROUTER, amount)
    await tx1.wait()

    console.log("Adding liquidity: 100,000 xUSD + 20 STRAX...")
    const tx2 = await router.addLiquidityETH(
      TOKENS.xUSD, amount, 0, 0, deployer.address, deadline,
      { value: ethAmount }
    )
    const receipt = await tx2.wait()
    console.log("TX:", receipt.transactionHash)

    const pair = await factory.getPair(TOKENS.xUSD, WSTRAX)
    console.log("Pair:", pair)
    console.log("")
  }

  // Pool 2: xETH-WSTRAX (price: 1 xETH = 10 STRAX)
  // Add 1 xETH + 10 STRAX
  {
    console.log("--- Pool 2: xETH-WSTRAX ---")
    const token = new ethers.Contract(TOKENS.xETH, ERC20_ABI, deployer)
    const amount = ethers.utils.parseEther("1")   // 1 xETH
    const ethAmount = ethers.utils.parseEther("10") // 10 STRAX

    console.log("Approving xETH...")
    const tx1 = await token.approve(ROUTER, amount)
    await tx1.wait()

    console.log("Adding liquidity: 1 xETH + 10 STRAX...")
    const tx2 = await router.addLiquidityETH(
      TOKENS.xETH, amount, 0, 0, deployer.address, deadline,
      { value: ethAmount }
    )
    const receipt = await tx2.wait()
    console.log("TX:", receipt.transactionHash)

    const pair = await factory.getPair(TOKENS.xETH, WSTRAX)
    console.log("Pair:", pair)
    console.log("")
  }

  // Pool 3: xBTC-WSTRAX (price: 1 xBTC = 100 STRAX)
  // Add 0.1 xBTC + 10 STRAX
  {
    console.log("--- Pool 3: xBTC-WSTRAX ---")
    const token = new ethers.Contract(TOKENS.xBTC, ERC20_ABI, deployer)
    const amount = ethers.utils.parseEther("0.1")   // 0.1 xBTC
    const ethAmount = ethers.utils.parseEther("10")  // 10 STRAX

    console.log("Approving xBTC...")
    const tx1 = await token.approve(ROUTER, amount)
    await tx1.wait()

    console.log("Adding liquidity: 0.1 xBTC + 10 STRAX...")
    const tx2 = await router.addLiquidityETH(
      TOKENS.xBTC, amount, 0, 0, deployer.address, deadline,
      { value: ethAmount }
    )
    const receipt = await tx2.wait()
    console.log("TX:", receipt.transactionHash)

    const pair = await factory.getPair(TOKENS.xBTC, WSTRAX)
    console.log("Pair:", pair)
    console.log("")
  }

  // Pool 4: xUSD-xETH (price: 1 xETH = 5000 xUSD)
  // Add 5,000 xUSD + 1 xETH
  {
    console.log("--- Pool 4: xUSD-xETH ---")
    const tokenA = new ethers.Contract(TOKENS.xUSD, ERC20_ABI, deployer)
    const tokenB = new ethers.Contract(TOKENS.xETH, ERC20_ABI, deployer)
    const amountA = ethers.utils.parseEther("5000") // 5k xUSD
    const amountB = ethers.utils.parseEther("1")    // 1 xETH

    console.log("Approving xUSD...")
    await (await tokenA.approve(ROUTER, amountA)).wait()
    console.log("Approving xETH...")
    await (await tokenB.approve(ROUTER, amountB)).wait()

    console.log("Adding liquidity: 5,000 xUSD + 1 xETH...")
    const tx = await router.addLiquidity(
      TOKENS.xUSD, TOKENS.xETH, amountA, amountB, 0, 0, deployer.address, deadline
    )
    const receipt = await tx.wait()
    console.log("TX:", receipt.transactionHash)

    const pair = await factory.getPair(TOKENS.xUSD, TOKENS.xETH)
    console.log("Pair:", pair)
    console.log("")
  }

  // Summary
  const totalPairs = await factory.allPairsLength()
  console.log("==============================================")
  console.log("  POOLS SETUP COMPLETE")
  console.log(`  Total pairs on factory: ${totalPairs}`)
  console.log("==============================================")
  console.log("Remaining balance:", ethers.utils.formatEther(await deployer.getBalance()), "STRAX")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
