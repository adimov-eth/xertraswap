// Get the INIT_CODE_PAIR_HASH from compiled PancakePair bytecode
// This must match what's in the SDK for pair address computation

const { ethers } = require("hardhat")

async function main() {
  const PancakePair = await ethers.getContractFactory("contracts/core/PancakePair.sol:PancakePair")
  const bytecode = PancakePair.bytecode
  const hash = ethers.utils.keccak256(bytecode)
  console.log("INIT_CODE_PAIR_HASH:", hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
