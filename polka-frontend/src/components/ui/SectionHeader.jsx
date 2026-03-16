export default function SectionHeader({ title, sub, action }) {
  return (
    <div className="flex items-end justify-between flex-wrap gap-5 mb-10">
      <div>
        <h2
          className="font-extrabold text-3xl tracking-tight mb-1.5"
          style={{ color: '#e8edf5', letterSpacing: '-.02em' }}
        >
          {title}
        </h2>
        {sub && (
          <p className="font-mono text-xs text-muted">{sub}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
