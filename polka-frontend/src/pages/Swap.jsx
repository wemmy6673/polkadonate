import SwapCard from '@/components/swap/SwapCard'

const INFO_POINTS = [
  'Fixed rate: 1 DOT = 100 PDT',
  'Tokens arrive instantly after tx confirmation',
  'PDT is required to donate and create causes',
  'Built on OpenZeppelin ERC-20 standard',
  'Contract verified on Polkadot Hub Testnet',
]

export default function Swap() {
  return (
    <div className="animate-fadeUp py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* Left — info */}
        <div>
          <h1
            className="font-extrabold tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-.02em', lineHeight: 1.1 }}
          >
            Swap DOT<br />for PDT Tokens
          </h1>
          <p className="text-sm text-muted leading-7 mb-8">
            Exchange your testnet DOT for PolkaDonate (PDT) tokens. PDT is the
            native ERC-20 currency used across all fundraising campaigns on this
            platform.
          </p>
          <ul className="flex flex-col gap-3">
            {INFO_POINTS.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-muted">
                <span className="text-orange font-mono flex-shrink-0 mt-0.5">→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — swap card */}
        <SwapCard />
      </div>
    </div>
  )
}
