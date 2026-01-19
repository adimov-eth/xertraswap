# Xertra Swap

Decentralized exchange (DEX) and automated market maker (AMM) for the Stratis EVM network.

## Quick Start

```bash
yarn install
NODE_OPTIONS=--openssl-legacy-provider PORT=4001 yarn start
```

## Build

```bash
TSC_COMPILE_ON_ERROR=true NODE_OPTIONS=--openssl-legacy-provider yarn build
```

## Network

| Network | Chain ID | RPC |
|---------|----------|-----|
| Mainnet | 105105 | https://rpc.stratisevm.com |
| Testnet (Auroria) | 205205 | https://auroria.rpc.stratisevm.com |

**Native Token:** STRAX
**Wrapped Token:** WSTRAX

## Architecture

```
src/
├── components/     # React components
├── pages/          # Route pages (Swap, Pool, Liquidity)
├── hooks/          # Custom React hooks
├── state/          # Redux state management
├── constants/      # Token lists, addresses
├── connectors/     # Web3 wallet connectors
└── config/         # Chain configuration

packages/
├── xertra-sdk/     # Forked SDK with Stratis chain config
└── xertra-uikit/   # Forked UIKit components
```

## Key Dependencies

- `@xertra/sdk` - Native Stratis chain configuration (replaces @pancakeswap-libs/sdk)
- `@xertra/uikit` - UI components (replaces @pancakeswap-libs/uikit)

## Contracts

| Contract | Mainnet | Testnet |
|----------|---------|---------|
| Factory | `0xDC29...` | `0x23D1...` |
| Router | See deployment docs | See deployment docs |

## License

GPL-3.0
