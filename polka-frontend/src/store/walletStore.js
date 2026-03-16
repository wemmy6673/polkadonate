import { create } from 'zustand'

/**
 * walletStore only tracks PDT token balance and swap deltas.
 * All wallet connection state (address, chainId, isConnected)
 * comes directly from wagmi's useAccount() and useBalance() hooks.
 */
export const useWalletStore = create((set) => ({
  pdt: 1250, // demo — replace with ERC20.balanceOf(address) once live

  setPdt:    (amount) => set({ pdt: amount }),
  addPdt:    (amount) => set((s) => ({ pdt: s.pdt + amount })),
  deductPdt: (amount) => set((s) => ({ pdt: s.pdt - amount })),
}))