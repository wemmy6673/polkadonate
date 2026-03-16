import { useState } from 'react'

export default function TokenInput({
  label,
  balanceLabel,
  value,
  onChange,
  readOnly = false,
  symbol,
  iconChar,
  iconBg,
  valueColor = '#e8edf5',
  placeholder = '0.0',
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div
      className="rounded-xl p-4 transition-all duration-200"
      style={{
        background: '#070b14',
        border: `1px solid ${focused ? 'rgba(255,107,26,.5)' : '#243550'}`,
      }}
    >
      {/* Label row */}
      <div className="flex justify-between items-center mb-3 font-mono text-xs text-muted">
        <span>{label}</span>
        {balanceLabel && <span>{balanceLabel}</span>}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-3">
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent border-0 outline-none text-2xl font-extrabold w-0 font-syne placeholder-muted2"
          style={{ color: valueColor }}
        />

        {/* Token pill */}
        <div className="flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-full bg-surface2 border border-border">
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
            style={{ background: iconBg }}
          >
            {iconChar}
          </span>
          <span className="font-bold text-sm text-white">{symbol}</span>
        </div>
      </div>
    </div>
  )
}
