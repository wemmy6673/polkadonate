import { create } from 'zustand'
import { CAUSES_DATA } from '@/data/causes'

export const useCauseStore = create((set, get) => ({
  causes: [...CAUSES_DATA],

  donate: (causeId, amount) => set((s) => ({
    causes: s.causes.map((c) =>
      c.id === causeId ? { ...c, raised: c.raised + amount } : c
    ),
  })),

  addCause: (cause) => set((s) => ({
    causes: [cause, ...s.causes],
  })),
}))
