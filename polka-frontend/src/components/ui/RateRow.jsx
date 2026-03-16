export default function RateRow({ label, value }) {
  return (
    <div
      className="flex justify-between items-center font-mono text-xs px-4 py-3 rounded-lg"
      style={{
        background: 'rgba(255,107,26,.05)',
        border: '1px solid rgba(255,107,26,.12)',
      }}
    >
      <span className="text-muted">{label}</span>
      <span className="text-orange">{value}</span>
    </div>
  )
}
