import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { useConnectModal }  from '@rainbow-me/rainbowkit'
import { useWalletStore }   from '@/store/walletStore'
import { ADDRESSES }        from '@/contracts/addresses'

export function useWallet() {
  const { address, isConnected, chainId } = useAccount()
  const { disconnect }       = useDisconnect()
  const { openConnectModal } = useConnectModal()

  // Native PAS balance on Polkadot Hub TestNet
  const { data: pasData } = useBalance({
    address,
    query: { enabled: !!address },
  })

  const { pdt, deductPdt } = useWalletStore()

  const pasBalance = pasData
    ? parseFloat(pasData.formatted).toFixed(4)
    : '50.0000' // demo fallback

  return {
    connected:       isConnected,
    address:         address ?? '',
    chainId,
    pas:             parseFloat(pasBalance),  // renamed from dot → pas
    pdt,
    openConnectModal,
    disconnect,
    deductPdt,
  }
}