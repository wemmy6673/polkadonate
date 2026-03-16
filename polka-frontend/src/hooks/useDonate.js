import { useWalletStore } from '@/store/walletStore'
import { useCauseStore }  from '@/store/causeStore'
import { useToastStore }  from '@/store/toastStore'

export function useDonate() {
  const wallet = useWalletStore()
  const donate = useCauseStore((s) => s.donate)
  const toast  = useToastStore((s) => s.add)

  const executeDonate = async (causeId, amount) => {
    if (!wallet.connected) throw new Error('Wallet not connected')
    if (amount <= 0)        throw new Error('Invalid amount')
    if (amount > wallet.pdt) throw new Error('Insufficient PDT balance')

    // Step 1 — approve
    toast('pending', 'Step 1/2: Approving…', `ERC20.approve(factory, ${amount})`)
    await new Promise((r) => setTimeout(r, 1600))

    // Step 2 — donate
    toast('pending', 'Step 2/2: Donating…', `DonationFactory.donate(${causeId}, ${amount})`)
    await new Promise((r) => setTimeout(r, 1800))

    wallet.deductPdt(amount)
    donate(causeId, amount)
    toast('success', 'Donation Confirmed! 🎉', `${amount} PDT donated successfully`)
  }

  return { executeDonate }
}
