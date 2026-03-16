import { useWriteContract }        from 'wagmi'
import { useWallet }               from './useWallet'
import { useToastStore }           from '@/store/toastStore'
import { ADDRESSES }               from '@/contracts/addresses'
import SwapABI                     from '@/contracts/abis/SwapContract.json'

const RATE = 100 // 1 DOT = 100 PDT

export function useSwap() {
  const { connected, dot, addPdt } = useWallet()
  const toast = useToastStore((s) => s.add)
  const { writeContractAsync } = useWriteContract()

  const getTokensOut = (dotAmount) => dotAmount * RATE

  const swap = async (dotAmount) => {
    if (!connected)      throw new Error('Wallet not connected')
    if (dotAmount <= 0)  throw new Error('Invalid amount')
    if (dotAmount > dot) throw new Error('Insufficient DOT balance')

    toast('pending', 'Transaction Pending…', `SwapContract.swap(${dotAmount} DOT)`)

    try {
      // Production path — uncomment once contracts are deployed:
      // const hash = await writeContractAsync({
      //   address:      ADDRESSES.SWAP_CONTRACT,
      //   abi:          SwapABI,
      //   functionName: 'swap',
      //   value:        parseEther(dotAmount.toString()),
      // })
      // await waitForTransactionReceipt(wagmiConfig, { hash })

      await new Promise((r) => setTimeout(r, 2000)) // demo

      const received = dotAmount * RATE
      addPdt(received)
      toast('success', 'Swap Complete!', `Received ${received.toLocaleString()} PDT`)
      return received
    } catch (err) {
      toast('error', 'Swap Failed', err.shortMessage ?? err.message)
      throw err
    }
  }

  return { swap, getTokensOut, rate: RATE }
}