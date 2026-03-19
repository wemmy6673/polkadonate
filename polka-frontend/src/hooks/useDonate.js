import { useWriteContract }  from 'wagmi'
import { parseEther }        from 'viem'
import { useWallet }         from './useWallet'
import { useCauseStore }     from '@/store/causeStore'
import { useToastStore }     from '@/store/toastStore'
import { ADDRESSES }         from '@/contracts/addresses'
import FactoryABI            from '@/contracts/abis/DonationFactory.json'

export function useDonate() {
  const { connected, pas, deductPdt } = useWallet()
  const donate = useCauseStore((s) => s.donate)
  const toast  = useToastStore((s) => s.add)
  const { writeContractAsync } = useWriteContract()

  const executeDonate = async (causeId, amount) => {
    if (!connected)    throw new Error('Wallet not connected')
    if (amount <= 0)   throw new Error('Invalid amount')
    if (amount > pas)  throw new Error('Insufficient PAS balance')

    toast('pending', 'Transaction Pending…', `DonationFactory.donate(${causeId}, ${amount} PAS)`)

    try {
      // Production path — uncomment once contracts are deployed:
      // const hash = await writeContractAsync({
      //   address:      ADDRESSES.DONATION_FACTORY,
      //   abi:          FactoryABI,
      //   functionName: 'donate',
      //   args:         [BigInt(causeId)],
      //   value:        parseEther(amount.toString()),
      // })
      // await waitForTransactionReceipt(wagmiConfig, { hash })

      await new Promise((r) => setTimeout(r, 2000)) // demo

      donate(causeId, amount)
      toast('success', 'Donation Confirmed! 🎉', `${amount} PAS donated successfully`)
    } catch (err) {
      toast('error', 'Transaction Failed', err.shortMessage ?? err.message)
      throw err
    }
  }

  return { executeDonate }
}