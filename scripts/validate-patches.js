#!/usr/bin/env node

/**
 * Validate that @xertra/sdk is correctly configured
 * Runs after postinstall to catch issues early
 */

const fs = require('fs')
const path = require('path')

const EXPECTED_CHECKS = [
  {
    name: '@xertra/sdk',
    file: 'node_modules/@xertra/sdk/dist/sdk.cjs.development.js',
    checks: [
      { pattern: /ChainId\["MAINNET"\]\s*=\s*105105/, description: 'MAINNET chain ID = 105105' },
      { pattern: /ChainId\["TESTNET"\]\s*=\s*205205/, description: 'TESTNET chain ID = 205205' },
      { pattern: /0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18/, description: 'WSTRAX mainnet address' },
      { pattern: /0x6f39A32C3E7A54164e1C6E201979aec276B0Da8E/, description: 'WSTRAX testnet address' },
      { pattern: /0xDC29A634611914ed73261A71C8F20D828cA2c09F/, description: 'Factory mainnet address' },
    ],
  },
]

let hasErrors = false

console.log('Validating @xertra/sdk configuration...\n')

for (const check of EXPECTED_CHECKS) {
  const filePath = path.join(__dirname, '..', check.file)

  if (!fs.existsSync(filePath)) {
    console.error(`\u2717 ${check.name}: File not found - ${check.file}`)
    hasErrors = true
    continue
  }

  const content = fs.readFileSync(filePath, 'utf8')
  let valid = true

  for (const item of check.checks) {
    if (!item.pattern.test(content)) {
      console.error(`\u2717 ${check.name}: Missing expected content - ${item.description}`)
      valid = false
      hasErrors = true
    }
  }

  if (valid) {
    console.log(`\u2713 ${check.name}: All checks passed`)
  }
}

console.log('')

if (hasErrors) {
  console.error('SDK validation FAILED!')
  console.error('Try: rm -rf node_modules && yarn install')
  process.exit(1)
} else {
  console.log('SDK validated successfully!')
}
