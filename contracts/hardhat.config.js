require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@nomicfoundation/hardhat-verify")
require('dotenv').config()

module.exports = {
  paths: {
    sources: "./contracts",
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {},
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    ],
  },
  networks: {
    hardhat: {},
    auroria: {
      url: 'https://auroria.rpc.stratisevm.com',
      chainId: 205205,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 1000000000,
      gas: 8000000,
    },
    stratis: {
      url: 'https://rpc.stratisevm.com',
      chainId: 105105,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      auroria: "abc",
      stratis: "abc",
    },
    customChains: [
      {
        network: "auroria",
        chainId: 205205,
        urls: {
          apiURL: "https://auroria.explorer.xertra.com/api",
          browserURL: "https://auroria.explorer.xertra.com/",
        },
      },
      {
        network: "stratis",
        chainId: 105105,
        urls: {
          apiURL: "https://explorer.xertra.com/api",
          browserURL: "https://explorer.xertra.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
}
