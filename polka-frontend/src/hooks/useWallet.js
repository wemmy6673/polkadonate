import { useWalletStore } from '@/store/walletStore'
import { useToastStore } from '@/store/toastStore'
import { CHAIN_ID } from '@/contracts/addresses'

// Mock wallet addresses per provider for demo
const MOCK_ADDRESSES = {
  polkadot:      '0x3f8A…b2c9',
  walletconnect: '0x9d1F…e4a7',
  metamask:      '0x5c2B…f8d1',
}

export function useWallet() {
  const store   = useWalletStore()
  const toast   = useToastStore((s) => s.add)

  const connect = async (providerType) => {
    toast('pending', 'Connecting…', 'Awaiting wallet signature')

    // In production: use ethers.js BrowserProvider / WalletConnect
    // Here we simulate the async handshake
    await new Promise((r) => setTimeout(r, 1400))

    const address = MOCK_ADDRESSES[providerType] ?? '0xUnknown'
    store.connect(address)
    toast('success', 'Wallet Connected', `${address} · Polkadot Hub Testnet`)
  }

  const disconnect = () => {
    store.disconnect()
    toast('success', 'Disconnected', 'Wallet safely disconnected')
  }

  return {
    ...store,
    connect,
    disconnect,
  }
}
