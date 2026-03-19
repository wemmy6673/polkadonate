import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { defineChain }      from 'viem'


export const polkadotHubTestnet = defineChain({
  id: 420420417,
  name: 'Polkadot Hub TestNet',
  nativeCurrency: {
    name:     'Paseo',
    symbol:   'PAS',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://eth-rpc-testnet.polkadot.io/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url:  'https://blockscout-testnet.polkadot.io',
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