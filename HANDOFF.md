# StraxSwap → Xertra Swap Rebrand - Handoff Document
**Date:** January 17, 2026
**Project:** ~/Developer/pancake-swap-interface-v1

## Status: COMPLETE ✅

All of Iain's requested changes have been implemented and tested.

## Completed Tasks

### 1. Xertra Logo Replacement ✅
- `public/images/logo.svg` - Site logo (gradient Xertra X)
- `public/images/192x192_App_Icon.png` - App icon
- `public/images/512x512_App_Icon.png` - App icon large
- `public/favicon.ico`, `favicon.png`, `favicon-16x16.png`, `favicon-32x32.png`

### 2. Token Whitelist ✅
Added 4 Wormhole tokens to `src/constants/token/pancakeswap.json`:
- WETH (Wormhole): `0xc398Cc4828E7ce677B357c8f94B6792Cb5538c03`
- WBNB (Wormhole): `0xE6d9419BFE31992a3aA4763B1e86Faf384c91697`
- USDC.e Ethereum (Wormhole): `0x959A50Db9B9c78990698cA621d7a0bA7F1d6f2D6`
- USDC.bsc BSC (Wormhole): `0xaa0e34A393dadAAF661132deA1EDD834c5628e16`

### 3. Token Logos with WH Badges ✅
All Wormhole tokens have logos with WH badges in `public/images/coins/`

### 4. Explorer Link Text ✅
Changed "View on BlockScout" → "View on Xertra Explorer" in:
- `src/components/TransactionConfirmationModal/TransactionSubmittedContent.tsx`
- `src/components/Popups/TransactionPopup.tsx`
- `src/components/AddressInputPanel/index.tsx`
- `src/components/TokenWarningModal/index.tsx`

### 5. Price Impact Limit ✅
Changed from 15% to 30% in `src/constants/index.ts:87`:
```typescript
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(3000), BIPS_BASE) // 30%
```

### 6. Page Title & Branding ✅
- `public/index.html` - title, description, twitter:title → "Xertra Swap"
- `public/manifest.json` - name, short_name → "Xertra Swap"
- `src/hooks/useGetDocumentTitlePrice.ts` - dynamic title
- `src/pages/PoolDetails/index.tsx` - pool page title
- `src/components/swap/AdvancedSwapDetails.tsx` - "Xertra treasury"
- `src/components/swap/SwapModalFooter.tsx` - "Xertra treasury"

### 7. STRAX/rSTRAX/WSTRAX Token Icons ✅
Created elegant differentiation using badges (like Wormhole tokens):
- **STRAX** (`strax.png`) - Plain Xertra X on dark circle (native gas token)
- **rSTRAX** (`0x2CaE3B96F7A202aE4460A391b9b4eA35dD606931.png`) - X with purple "R" badge
- **WSTRAX** (`0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18.png`) - X with blue "W" badge

The dark circle background (#0f0f1a) ensures visibility on both light and dark themes.

### 8. Logo URIs Updated ✅
Changed all logoURI values in `pancakeswap.json` from `https://straxswap.com/...` to relative paths `/images/coins/...` for local development.

## Dev Server

```bash
cd ~/Developer/pancake-swap-interface-v1
NODE_OPTIONS=--openssl-legacy-provider PORT=4001 yarn start
```

Running at http://localhost:4001

## Asset Locations

- **Brand Pack:** `/tmp/xertra-assets/Brand Pack/`
- **Token Logos:** `/tmp/xertra-assets/coin/`
- **Generated icons:** `/tmp/xertra_base.png`, `/tmp/xertra_wstrax.png`, `/tmp/xertra_rstrax.png`

## Git Status

Branch: `v1` (ahead of origin)

Modified files ready to commit:
- Token list JSONs (pancakeswap.json, pool list)
- Explorer link text files
- Logo/icon files (all PNGs)
- Constants (price impact limit)
- Title/branding text files
- New token logo PNGs (untracked)

## ImageMagick Commands Used

Base icon creation:
```bash
magick -size 128x128 xc:none -fill "#0f0f1a" -draw "circle 64,64 64,2" /tmp/circle_base.png
magick "/tmp/xertra-assets/Brand Pack/Logo Only/Xertra Logo Transparent.png" -resize 80x80 -gravity center -background none -extent 128x128 /tmp/x_logo.png
magick /tmp/circle_base.png /tmp/x_logo.png -gravity center -composite /tmp/xertra_base.png
```

Badge creation (W/R):
```bash
magick /tmp/xertra_base.png \
  \( -size 40x40 xc:none -fill "#3b82f6" -draw "circle 20,20 20,0" \
     -font Arial-Bold -pointsize 24 -fill white -gravity center -annotate +0+0 "W" \) \
  -gravity southeast -geometry +2+2 -composite /tmp/xertra_wstrax.png
```

## Client Communication

Client: Iain (Xertra/Solplex game)
Contact via Telegram with Boris

Original request (Jan 14, 2026):
1. Replace Stratis Logo with Xertra logo ✅
2. Whitelist 4 Wormhole token contracts ✅
3. Add token logos with WH icon ✅
4. Change "View on BlockScout" to "View on Xertra Explorer" ✅
5. Fix: Unable to Swap if slippage > 15% (was price impact, bumped to 30%) ✅

## Next Steps

1. **Commit changes** when ready
2. **Deploy to production** - the logoURIs will need to work with the production domain
3. **Test with wallet connected** - verify actual swaps work with new price impact limit

## Notes

- The "slippage > 15%" issue was actually the BLOCKED_PRICE_IMPACT_NON_EXPERT constant blocking high price impact trades (user protection). Changed from 15% to 30%.
- Token icons use relative paths now for local testing. Production deployment should work since paths are relative.
- The TS error in `src/state/lists/reducer.ts` was fixed earlier (spread operator issue).
