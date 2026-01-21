# Cloudflare Pages Deployment

Xertra Swap is automatically deployed to Cloudflare Pages on every push to `main`.

## Deployment Configuration

- **Project Name:** xertraswap
- **Production Branch:** main
- **Build Command:** `cd interface && yarn build`
- **Build Output Directory:** `interface/build`
- **Root Directory:** `/` (monorepo root)

## Environment Variables

Set these in Cloudflare Pages dashboard:

```
NODE_VERSION=18
NODE_OPTIONS=--openssl-legacy-provider
TSC_COMPILE_ON_ERROR=true
```

## Manual Deployment

If needed, you can deploy manually using Wrangler:

```bash
# Build the project
cd interface
yarn build

# Deploy to Cloudflare Pages
wrangler pages deploy build --project-name=xertraswap
```

## Preview Deployments

All branches get automatic preview deployments at:
`https://<branch>.<project>.pages.dev`

## Production URL

Main branch deploys to production:
`https://xertraswap.pages.dev`

(Custom domain: TBD)
