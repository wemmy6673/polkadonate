import { useWalletStore } from '@/store/walletStore'
import { useToastStore }  from '@/store/toastStore'

const RATE = 100 // 1 DOT = 100 PDT

export function useSwap() {
  const wallet = useWalletStore()
  const toast  = useToastStore((s) => s.add)

  const getTokensOut = (dotAmount) => dotAmount * RATE

  const swap = async (dotAmount) => {
    if (!wallet.connected) throw new Error('Wallet not connected')
    if (dotAmount > wallet.dot) throw new Error('Insufficient DOT balance')

    toast('pending', 'Transaction Pending…', `SwapContract.swap(${dotAmount} DOT)`)

    // In production: call SwapContract.swap() via ethers.js
    await new Promise((r) => setTimeout(r, 2000))

    wallet.updateBalances(-dotAmount, dotAmount * RATE)
    toast('success', 'Swap Complete!', `Received ${(dotAmount * RATE).toLocaleString()} PDT`)
    return dotAmount * RATE
  }

  return { swap, getTokensOut, rate: RATE }
}
