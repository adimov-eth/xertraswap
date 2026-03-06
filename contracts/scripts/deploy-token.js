// Deploy a test ERC20 token
// Usage: NAME=DAI SYMBOL=DAI SUPPLY=1000000 npx hardhat run scripts/deploy-token.js --network auroria

async function main() {
  const [deployer] = await ethers.getSigners()

  const name = process.env.NAME || "Test Token"
  const symbol = process.env.SYMBOL || "TEST"
  const supply = process.env.SUPPLY || "1000000"

  console.log(`Deploying ${name} (${symbol}) with supply ${supply}`)
  console.log("Deployer:", deployer.address)

  const MyToken = await ethers.getContractFactory("contracts/token/MyToken.sol:MyToken")
  const token = await MyToken.deploy(name, symbol, supply)
  await token.deployed()

  console.log(`${symbol} deployed to:`, token.address)
  return { token: token.address, name, symbol }
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
