# Xertra

Decentralized exchange and AMM on Stratis EVM, forked from PancakeSwap v1.

**Mainnet:** [straxswap.com](https://straxswap.com)
**Testnet:** [auroria.straxswap.com](https://auroria.straxswap.com)

## Quick Start

```bash
yarn install
yarn workspace @xertra/sdk build
NODE_OPTIONS=--openssl-legacy-provider yarn dev
```

Dev server runs at http://localhost:4001

## Repository Structure

```
xertra/
├── interface/             # React swap UI (CRA + TypeScript)
├── contracts/             # Solidity contracts + Hardhat deploy scripts
├── packages/
│   ├── xertra-sdk/        # SDK — chain config, pair address computation
│   └── xertra-uikit/      # UI component library (forked PancakeSwap toolkit)
└── .github/workflows/     # CI/CD
```

## Scripts

```bash
# Development
yarn dev                    # Start dev server (port 4001)
yarn build                  # Production build
yarn lint                   # Lint
yarn test                   # Unit tests

# SDK (must build before interface)
yarn workspace @xertra/sdk build

# UIKit (after modifying uikit source)
yarn workspace @xertra/uikit build

# Contracts
cd contracts && npm install
npx hardhat compile                                        # Compile
npx hardhat run scripts/deploy-all.js --network auroria    # Deploy full DEX to testnet
npx hardhat run scripts/deploy-faucet.js --network auroria # Deploy faucet
```

## Networks & Contracts

### Stratis Mainnet (105105)

| Contract | Address |
|----------|---------|
| Factory | `0xDC29A634611914ed73261A71C8F20D828cA2c09F` |
| Router | `0xE71d254C2F1430b597b53D83B3453d519F4C4564` |
| WSTRAX | `0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18` |
| Multicall | `0x23D1682b48124F9cBDF8A3a4e937759F9BB86c61` |

RPC: `https://rpc.stratisevm.com`
Explorer: [explorer.xertra.com](https://explorer.xertra.com)

### Auroria Testnet (205205)

| Contract | Address |
|----------|---------|
| Factory | `0xfbC6220786AE5B4c86C3F49c3bD013939186C1f2` |
| Router | `0x83e88E09803FF8726A761ec25e91784872596fdB` |
| WSTRAX | `0x57402359Eb6f3aB02c19EA7B98F366f324b66Aae` |
| Multicall | `0xDC29A634611914ed73261A71C8F20D828cA2c09F` |
| Faucet | `0x474E5228faF0130CfA3c9657a46de3dFA46316C9` |

RPC: `https://auroria.rpc.stratisevm.com`
Explorer: [auroria.explorer.xertra.com](https://auroria.explorer.xertra.com)

#### Test Tokens

| Token | Address | Faucet drip |
|-------|---------|-------------|
| xUSD | `0xE71d254C2F1430b597b53D83B3453d519F4C4564` | 1,000 per claim |
| xETH | `0xd16Cab1e481eF8401Bfd8fb3BaC42Ce2918e9ad2` | 1 per claim |
| xBTC | `0xde05775bC57cD8447e3D9F0e9dC4712641cfAB15` | 0.01 per claim |

The faucet also drips 5 STRAX per claim with a 1-hour cooldown. Available at [auroria.straxswap.com/#/faucet](https://auroria.straxswap.com/#/faucet).

#### Testnet Pools

| Pool | Pair Address |
|------|-------------|
| xUSD-WSTRAX | `0xAc4Fc1b2C740dB83C6A82b6eB9a3D24a40EDf684` |
| xETH-WSTRAX | `0x9f95fC89Da1DD6bbab00E609054F557969F69D48` |
| xBTC-WSTRAX | `0x138cF9832B3CC4974F793EDae0420ACD67D05942` |
| xUSD-xETH | `0xA9b70a3d233B04Ae46462c310991850EDCE1221d` |

## Deployments

CI/CD via GitHub Actions → Cloudflare Pages:

| Branch | Target | URL |
|--------|--------|-----|
| `main` | Mainnet | [straxswap.com](https://straxswap.com) |
| `develop` | Testnet (Auroria) | [auroria.straxswap.com](https://auroria.straxswap.com) |

### Deploying Contracts

To redeploy the DEX on a new chain or after a chain reset:

```bash
cd contracts
cp .env.example .env  # Add PRIVATE_KEY
npm install
npx hardhat compile

# Deploy everything (Factory + Router + Multicall)
npx hardhat run scripts/deploy-all.js --network auroria

# Then update:
#   interface/src/config/chains.ts
#   packages/xertra-sdk/src/constants.ts
```

The deploy script uses the existing WSTRAX on Auroria. The INIT_CODE_HASH in `PancakeLibrary.sol` and the SDK must match — if you recompile the Factory/Pair contracts, the hash changes due to Solidity metadata.

## Architecture

### Wallet

Web3Auth v9 modal for wallet connection. `useActiveWeb3React()` is a compatibility shim that reads from `Web3AuthContext` — all 85+ call sites use it without knowing the underlying provider changed.

### Pool & Token Discovery

Static — pools are listed in `interface/src/constants/pool/pancakeswap.json`, tokens in `interface/src/constants/token/xertra.json`. No on-chain discovery. Add new pools/tokens by editing these files.

### SDK

`@xertra/sdk` computes pair addresses via CREATE2 using per-chain `FACTORY_ADDRESS` and `INIT_CODE_HASH`. If contracts are redeployed, both must be updated in `packages/xertra-sdk/src/constants.ts`.

## License

GPL-3.0
