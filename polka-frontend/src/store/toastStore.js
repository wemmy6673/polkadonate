import { create } from 'zustand'

let nextId = 0

export const useToastStore = create((set) => ({
  toasts: [],

  add: (type, title, msg) => {
    const id = ++nextId
    set((s) => ({ toasts: [...s.toasts, { id, type, title, msg }] }))
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, 3800)
  },

  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
