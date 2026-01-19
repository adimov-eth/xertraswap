# Xertra

Monorepo for Xertra Swap - a DEX/AMM on Stratis EVM.

## Quick Start

```bash
yarn install
yarn dev
```

## Structure

```
xertra/
├── packages/
│   ├── xertra-sdk/      # @xertra/sdk - Chain config, constants
│   └── xertra-uikit/    # @xertra/uikit - UI components
└── interface/           # Swap interface
```

## Scripts

```bash
yarn dev      # Start dev server (port 4001)
yarn build    # Production build
yarn lint     # Lint code
yarn test     # Run tests
```

## Network

| Network | Chain ID | RPC |
|---------|----------|-----|
| Mainnet | 105105 | https://rpc.stratisevm.com |
| Testnet (Auroria) | 205205 | https://auroria.rpc.stratisevm.com |

## License

GPL-3.0
