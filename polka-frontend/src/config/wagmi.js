import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { defineChain }      from 'viem'

// Polkadot Hub Testnet as a custom viem chain
export const polkadotHubTestnet = defineChain({
  id:   420420421,
  name: 'Polkadot Hub Testnet',
  nativeCurrency: {
    name:     'DOT',
    symbol:   'DOT',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-passet-hub-eth-rpc.polkadot.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url:  'https://blockscout-passet-hub.parity-testnet.parity.io',
    },
  },
  testnet: true,
})

// Get yours free at https://cloud.walletconnect.com
const WALLETCONNECT_PROJECT_ID =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

export const wagmiConfig = getDefaultConfig({
  appName:   'PolkaDonate',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains:    [polkadotHubTestnet],
  ssr:       false,
})