import { create } from 'zustand'

export const useCauseStore = create((set) => ({
  causes:  [],
  loading: false,
  error:   null,

  setCauses:  (causes) => set({ causes, loading: false, error: null }),
  setLoading: (loading) => set({ loading }),
  setError:   (error)   => set({ error, loading: false }),

  donate: (causeId, amount) =>
    set((s) => ({
      causes: s.causes.map((c) =>
        c.id === causeId ? { ...c, raised: c.raised + amount } : c
      ),
    })),

  addCause: (cause) =>
    set((s) => ({ causes: [cause, ...s.causes] })),
}))