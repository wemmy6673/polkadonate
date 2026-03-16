import { useWriteContract }  from 'wagmi'
import { useWallet }         from './useWallet'
import { useCauseStore }     from '@/store/causeStore'
import { useToastStore }     from '@/store/toastStore'
import { ADDRESSES }         from '@/contracts/addresses'
import ERC20ABI              from '@/contracts/abis/ERC20Token.json'
import FactoryABI            from '@/contracts/abis/DonationFactory.json'

export function useDonate() {
  const { connected, pdt, deductPdt } = useWallet()
  const donate = useCauseStore((s) => s.donate)
  const toast  = useToastStore((s) => s.add)
  const { writeContractAsync } = useWriteContract()

  const executeDonate = async (causeId, amount) => {
    if (!connected)   throw new Error('Wallet not connected')
    if (amount <= 0)  throw new Error('Invalid amount')
    if (amount > pdt) throw new Error('Insufficient PDT balance')

    toast('pending', 'Step 1/2: Approving…', `ERC20.approve(factory, ${amount})`)

    try {
      // Production path — uncomment once contracts are deployed:
      // const approveHash = await writeContractAsync({
      //   address:      ADDRESSES.ERC20_TOKEN,
      //   abi:          ERC20ABI,
      //   functionName: 'approve',
      //   args:         [ADDRESSES.DONATION_FACTORY, parseUnits(amount.toString(), 18)],
      // })
      // await waitForTransactionReceipt(wagmiConfig, { hash: approveHash })

      await new Promise((r) => setTimeout(r, 1600)) // demo

      toast('pending', 'Step 2/2: Donating…', `DonationFactory.donate(${causeId}, ${amount})`)

      // const donateHash = await writeContractAsync({
      //   address:      ADDRESSES.DONATION_FACTORY,
      //   abi:          FactoryABI,
      //   functionName: 'donate',
      //   args:         [BigInt(causeId), parseUnits(amount.toString(), 18)],
      // })
      // await waitForTransactionReceipt(wagmiConfig, { hash: donateHash })

      await new Promise((r) => setTimeout(r, 1800)) // demo

      deductPdt(amount)
      donate(causeId, amount)
      toast('success', 'Donation Confirmed! 🎉', `${amount} PDT donated successfully`)
    } catch (err) {
      toast('error', 'Transaction Failed', err.shortMessage ?? err.message)
      throw err
    }
  }

  return { executeDonate }
}