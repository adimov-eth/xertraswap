# Xertra

Decentralized exchange and AMM on Stratis EVM.

**Live:** [xertraswap.pages.dev](https://xertraswap.pages.dev)

## Quick Start

```bash
yarn install
NODE_OPTIONS=--openssl-legacy-provider yarn dev
```

Dev server runs at http://localhost:4001

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

# Deploy
wrangler pages deploy interface/build --project-name=xertraswap
```

## Network

| Network | Chain ID | RPC |
|---------|----------|-----|
| Mainnet | 105105 | https://rpc.stratisevm.com |
| Testnet (Auroria) | 205205 | https://auroria.rpc.stratisevm.com |

Native token: STRAX

## UIKit

The UI component library is forked from PancakeSwap's pancake-toolkit with full Xertra branding.

```bash
cd packages/xertra-uikit && yarn build
```

## License

GPL-3.0
