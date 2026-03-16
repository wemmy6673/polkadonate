import { useToastStore } from '@/store/toastStore'

const ICONS = { success: '✅', pending: '⏳', error: '❌' }
const BARS  = { success: '#00f5a0', pending: '#ff6b1a', error: '#e6007a' }

function Toast({ toast }) {
  return (
    <div
      className="animate-toastIn flex items-center gap-3 rounded-xl px-4 py-3.5 min-w-72 shadow-2xl"
      style={{
        background: '#111e33',
        border: '1px solid #243550',
        borderLeft: `3px solid ${BARS[toast.type]}`,
      }}
    >
      <span className="text-xl flex-shrink-0">{ICONS[toast.type]}</span>
      <div>
        <p className="text-sm font-bold text-white">{toast.title}</p>
        <p className="font-mono text-xs mt-0.5 text-muted">{toast.msg}</p>
      </div>
    </div>
  )
}

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} />
      ))}
    </div>
  )
}
