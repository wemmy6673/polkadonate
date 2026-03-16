import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { useConnectModal }   from '@rainbow-me/rainbowkit'
import { useWalletStore }    from '@/store/walletStore'
import { ADDRESSES }         from '@/contracts/addresses'

export function useWallet() {
  const { address, isConnected, chainId } = useAccount()
  const { disconnect }      = useDisconnect()
  const { openConnectModal } = useConnectModal()

  // Native DOT balance on Polkadot Hub Testnet
  const { data: dotData } = useBalance({
    address,
    query: { enabled: !!address },
  })

  // ERC-20 PDT token balance — uncomment once contracts are deployed:
  // const { data: pdtData } = useBalance({
  //   address,
  //   token: ADDRESSES.ERC20_TOKEN,
  //   query: { enabled: !!address },
  // })

  const { pdt, addPdt, deductPdt } = useWalletStore()

  const dotBalance = dotData
    ? parseFloat(dotData.formatted).toFixed(4)
    : '50.0000' // demo fallback

  return {
    connected:       isConnected,
    address:         address ?? '',
    chainId,
    dot:             parseFloat(dotBalance),
    pdt,
    openConnectModal,
    disconnect,
    addPdt,
    deductPdt,
  }
}