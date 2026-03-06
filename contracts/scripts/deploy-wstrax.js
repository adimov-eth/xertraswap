// Deploy a WETH/WSTRAX contract (standard WETH9)
// Only needed if no WSTRAX exists on the target chain
// Auroria already has WSTRAX at 0x57402359Eb6f3aB02c19EA7B98F366f324b66Aae

const WETH9_ABI = [
  "constructor()",
  "function deposit() payable",
  "function withdraw(uint256)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
]

// WETH9 bytecode (canonical)
const WETH9_SOURCE = `
// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.6.6;

contract WSTRAX {
    string public name     = "Wrapped STRAX";
    string public symbol   = "WSTRAX";
    uint8  public decimals = 18;

    event  Approval(address indexed src, address indexed guy, uint wad);
    event  Transfer(address indexed src, address indexed dst, uint wad);
    event  Deposit(address indexed dst, uint wad);
    event  Withdrawal(address indexed src, uint wad);

    mapping (address => uint)                       public  balanceOf;
    mapping (address => mapping (address => uint))  public  allowance;

    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint wad) public {
        require(balanceOf[msg.sender] >= wad);
        balanceOf[msg.sender] -= wad;
        msg.sender.transfer(wad);
        emit Withdrawal(msg.sender, wad);
    }

    function totalSupply() public view returns (uint) {
        return address(this).balance;
    }

    function approve(address guy, uint wad) public returns (bool) {
        allowance[msg.sender][guy] = wad;
        emit Approval(msg.sender, guy, wad);
        return true;
    }

    function transfer(address dst, uint wad) public returns (bool) {
        return transferFrom(msg.sender, dst, wad);
    }

    function transferFrom(address src, address dst, uint wad) public returns (bool) {
        require(balanceOf[src] >= wad);
        if (src != msg.sender && allowance[src][msg.sender] != uint(-1)) {
            require(allowance[src][msg.sender] >= wad);
            allowance[src][msg.sender] -= wad;
        }
        balanceOf[src] -= wad;
        balanceOf[dst] += wad;
        emit Transfer(src, dst, wad);
        return true;
    }
}
`

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("NOTE: Auroria already has WSTRAX at 0x57402359Eb6f3aB02c19EA7B98F366f324b66Aae")
  console.log("Only deploy a new one if needed")
  console.log("")
  console.log("Deploying WSTRAX with account:", deployer.address)

  // This uses the inline source above. For production, use the contract file instead.
  console.log("Use 'npx hardhat compile' first, then deploy from artifacts if needed")
  console.log("Or use the existing WSTRAX address in deploy-all.js")
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
