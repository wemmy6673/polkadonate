import { useEffect } from 'react'

export default function Modal({ open, onClose, children }) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-6 animate-fadeIn"
      style={{ background: 'rgba(7,11,20,.88)', backdropFilter: 'blur(10px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="animate-modalIn rounded-2xl p-9 w-full max-w-md relative"
        style={{
          background: '#0d1525',
          border: '1px solid #243550',
          boxShadow: '0 24px 80px rgba(0,0,0,.6)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, #ff6b1a, transparent)',
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-sm text-muted bg-surface2 border border-border hover:bg-orange/10 hover:text-orange transition-all"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  )
}
