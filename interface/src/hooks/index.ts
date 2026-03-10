// All wallet state now comes from Web3AuthContext directly.
// useActiveWeb3React, useEagerConnect, and useInactiveListener
// were removed — they were @web3-react shims with zero callers.
//
// If you need wallet state in a component:
//   import { useContext } from 'react'
//   import Web3AuthContext from '../pages/Web3AuthContext'
//   const { connection, account, chainId, library } = useContext(Web3AuthContext)
