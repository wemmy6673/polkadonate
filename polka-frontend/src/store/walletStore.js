import { create } from 'zustand'

export const useWalletStore = create((set, get) => ({
  connected: false,
  address: '',
  dot: 50.0,
  pdt: 0,

  connect: (address) => set({
    connected: true,
    address,
    dot: 50.0,
    pdt: 1250,
  }),

  disconnect: () => set({
    connected: false,
    address: '',
    dot: 50.0,
    pdt: 0,
  }),

  updateBalances: (dotDelta, pdtDelta) => set((s) => ({
    dot: s.dot + dotDelta,
    pdt: s.pdt + pdtDelta,
  })),

  deductPdt: (amount) => set((s) => ({ pdt: s.pdt - amount })),
}))
