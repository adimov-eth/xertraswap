const webpack = require('webpack')
const path = require('path')

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config) {
  // Silence noisy source-map-loader ENOENT warnings from third-party packages that
  // publish broken sourceMappingURL references. These are not actionable app issues
  // and can flood/strain the build without affecting emitted assets.
  config.ignoreWarnings = (config.ignoreWarnings || []).concat([
    function ignoreBrokenThirdPartySourceMaps(warning) {
      return (
        warning &&
        typeof warning.message === 'string' &&
        warning.message.includes('Failed to parse source map')
      )
    },
  ])

  // 0. Remove CRA's ESLintWebpackPlugin to avoid conflict with project .eslintrc
  //    CRA loads eslint-config-react-app as BaseConfig, which conflicts with
  //    @pancakeswap-libs/eslint-config-pancake (both load eslint-plugin-react from different paths).
  //    Project .eslintrc is the single source of truth; editor and `yarn lint` use it directly.
  config.plugins = (config.plugins || []).filter(
    (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin'
  )
  // 1. Polyfills for Node.js globals that Web3Auth dependencies need
  // Disable ForkTsChecker during webpack builds. In this repo it crashes under
  // CRA production builds due to checker-process memory pressure, while the
  // emitted bundle still succeeds. Type checking remains available via tsc/editor.
  config.plugins = (config.plugins || []).filter(
    (plugin) => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
  )

  // Collect all REACT_APP_* env vars for DefinePlugin
  const reactAppEnv = {}
  Object.keys(process.env).forEach(function (key) {
    if (key.startsWith('REACT_APP_') || key === 'NODE_ENV') {
      reactAppEnv['process.env.' + key] = JSON.stringify(process.env[key])
    }
  })

  config.plugins = (config.plugins || []).concat([
    new NodePolyfillPlugin(), // auto polyfills many node modules
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    // Re-define REACT_APP_* vars so they survive the process/browser polyfill
    new webpack.DefinePlugin(reactAppEnv),
  ])

  // 2. Fix the node_modules babel-loader.
  //    CRA 4's "dependencies" preset only does ESM→CJS — it does NOT transform
  //    optional chaining (?.), nullish coalescing (??), class fields, etc.
  //    Webpack 4's acorn parser can't handle these either.
  //    Fix: inject the missing transform plugins into the node_modules loader.
  var oneOfRules = config.module.rules.find(function (rule) { return rule.oneOf }).oneOf

  var nodeModulesBabelRule = oneOfRules.find(function (rule) {
    return rule.loader &&
      rule.loader.includes('babel-loader') &&
      rule.exclude
  })

  if (nodeModulesBabelRule) {
    var existingOptions = nodeModulesBabelRule.options || {}
    var extraPlugins = [
      require.resolve('@babel/plugin-proposal-optional-chaining'),
      require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      [require.resolve('@babel/plugin-proposal-private-methods'), { loose: true }],
      [require.resolve('@babel/plugin-transform-private-property-in-object'), { loose: true }],
    ]

    // Ensure .cjs in node_modules is transpiled by this dependencies babel-loader.
    nodeModulesBabelRule.test = /\.(js|mjs|cjs)$/
    existingOptions.plugins = (existingOptions.plugins || []).concat(extraPlugins)
    nodeModulesBabelRule.options = existingOptions
  }

  // 3. Aliases for node built-in polyfills
  config.resolve = config.resolve || {}
  config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    assert: require.resolve('assert'),
  })

  // 4. Handle .mjs files from @metamask/* packages.
  //    @web3auth/ethereum-provider pulls in @metamask/eth-sig-util → @metamask/utils
  //    which ships .mjs files. Webpack 4 can't bridge ESM↔CJS named imports,
  //    so we force CJS resolution and treat .mjs files as regular JS.
  // Handle ESM packages in node_modules (.mjs files and "type":"module" .js files)
  config.module.rules.push({
    test: /\.m?js$/,
    include: /node_modules/,
    type: 'javascript/auto',
    resolve: { fullySpecified: false },
  })

  // Force @metamask packages to CJS entry points if present (avoid ESM .mjs resolution via module field)
  try { config.resolve.alias['@metamask/superstruct'] = require.resolve('@metamask/superstruct') } catch (_) {}
  try { config.resolve.alias['@metamask/utils'] = require.resolve('@metamask/utils') } catch (_) {}

  return config
}
