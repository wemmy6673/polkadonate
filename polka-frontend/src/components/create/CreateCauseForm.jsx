import { useState }     from 'react'
import { useNavigate }  from 'react-router-dom'
import Button           from '@/components/ui/Button'
import RateRow          from '@/components/ui/RateRow'
import Card             from '@/components/ui/Card'
import { useWalletStore } from '@/store/walletStore'
import { useCauseStore }  from '@/store/causeStore'
import { useToastStore }  from '@/store/toastStore'
import { useIPFS }        from '@/hooks/useIPFS'

const STEPS = [
  { n: 1, name: 'Basic Info',       desc: 'Title, description, category' },
  { n: 2, name: 'Goal & Timeline',  desc: 'Target amount, deadline'       },
  { n: 3, name: 'Media & Deploy',   desc: 'Cover image, IPFS + deploy'    },
]

const INITIAL_FORM = {
  title:       '',
  desc:        '',
  cat:         '',
  goal:        '',
  deadline:    '',
  beneficiary: '',
  minDon:      '',
}

/* ── shared input styles ──────────────────────────────────────── */
const inputBase = {
  background:  '#070b14',
  border:      '1px solid #243550',
  color:       '#e8edf5',
  borderRadius: 8,
  padding:     '14px 16px',
  width:       '100%',
  fontSize:    15,
  fontFamily:  "'Syne', sans-serif",
  outline:     'none',
  transition:  'border-color .2s',
}

function FormInput({ label, children }) {
  return (
    <div className="mb-5">
      <label className="block font-mono text-xs text-muted uppercase tracking-wider mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}

/* ── Step components ──────────────────────────────────────────── */
function Step1({ form, upd, onNext }) {
  const focus = (e) => (e.target.style.borderColor = 'rgba(255,107,26,.5)')
  const blur  = (e) => (e.target.style.borderColor = '#243550')

  return (
    <div className="animate-fadeUp">
      <h3 className="font-extrabold text-2xl tracking-tight text-white mb-1">Basic Information</h3>
      <p className="font-mono text-xs text-muted mb-8">// fill in the core details of your cause</p>

      <FormInput label="Cause Title">
        <input style={inputBase} placeholder="e.g. Clean Water for Rural Nigeria"
          value={form.title} onChange={(e) => upd('title', e.target.value)}
          onFocus={focus} onBlur={blur} />
      </FormInput>

      <FormInput label="Description">
        <textarea style={{ ...inputBase, minHeight: 120, resize: 'vertical', lineHeight: 1.6 }}
          placeholder="Describe your cause, its impact, and how funds will be used…"
          value={form.desc} onChange={(e) => upd('desc', e.target.value)}
          onFocus={focus} onBlur={blur} />
      </FormInput>

      <FormInput label="Category">
        <select style={{ ...inputBase, appearance: 'none', cursor: 'pointer' }}
          value={form.cat} onChange={(e) => upd('cat', e.target.value)}
          onFocus={focus} onBlur={blur}>
          <option value="">Select a category…</option>
          {['education', 'environment', 'health', 'community', 'tech'].map((v) => (
            <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
          ))}
        </select>
      </FormInput>

      <div className="flex justify-end pt-6 border-t border-border">
        <Button onClick={onNext}>Next: Goal & Timeline →</Button>
      </div>
    </div>
  )
}

function Step2({ form, upd, onBack, onNext }) {
  const focus = (e) => (e.target.style.borderColor = 'rgba(255,107,26,.5)')
  const blur  = (e) => (e.target.style.borderColor = '#243550')

  return (
    <div className="animate-fadeUp">
      <h3 className="font-extrabold text-2xl tracking-tight text-white mb-1">Goal & Timeline</h3>
      <p className="font-mono text-xs text-muted mb-8">// set your fundraising targets</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-0">
        <FormInput label="Fundraising Goal (PDT)">
          <input type="number" style={inputBase} placeholder="e.g. 5000"
            value={form.goal} onChange={(e) => upd('goal', e.target.value)}
            onFocus={focus} onBlur={blur} />
        </FormInput>
        <FormInput label="Deadline">
          <input type="date" style={{ ...inputBase, colorScheme: 'dark' }}
            value={form.deadline} onChange={(e) => upd('deadline', e.target.value)}
            onFocus={focus} onBlur={blur} />
        </FormInput>
      </div>

      <FormInput label="Beneficiary Wallet Address">
        <input style={inputBase} placeholder="0x…"
          value={form.beneficiary} onChange={(e) => upd('beneficiary', e.target.value)}
          onFocus={focus} onBlur={blur} />
      </FormInput>

      <FormInput label="Minimum Donation (PDT)">
        <input type="number" style={inputBase} placeholder="e.g. 10"
          value={form.minDon} onChange={(e) => upd('minDon', e.target.value)}
          onFocus={focus} onBlur={blur} />
      </FormInput>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <Button onClick={onNext}>Next: Media & Deploy →</Button>
      </div>
    </div>
  )
}

function Step3({ onBack, onDeploy, loading }) {
  return (
    <div className="animate-fadeUp">
      <h3 className="font-extrabold text-2xl tracking-tight text-white mb-1">Media & Deploy</h3>
      <p className="font-mono text-xs text-muted mb-8">// upload cover image → IPFS → deploy on-chain</p>

      <div className="mb-6">
        <label className="block font-mono text-xs text-muted uppercase tracking-wider mb-2">
          Cover Image
        </label>
        <div
          className="rounded-xl p-10 text-center cursor-pointer transition-all duration-200 border-2 border-dashed border-border2"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,107,26,.4)'
            e.currentTarget.style.background  = 'rgba(255,107,26,.02)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#243550'
            e.currentTarget.style.background  = 'transparent'
          }}
        >
          <div className="text-4xl mb-3">📤</div>
          <p className="text-sm text-muted">
            Drop image here or{' '}
            <span className="text-orange">click to browse</span>
          </p>
          <p className="font-mono text-xs mt-1.5 text-muted2">
            PNG, JPG up to 10MB · Stored on IPFS via Pinata
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <RateRow label="IPFS Storage"  value="Pinata · metadata.json + image" />
        <RateRow label="Contract Call" value="DonationFactory.createCause(CID, goal)" />
      </div>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} disabled={loading}>← Back</Button>
        <Button onClick={onDeploy} disabled={loading}>
          {loading ? '⏳ Deploying…' : '🚀 Deploy Cause'}
        </Button>
      </div>
    </div>
  )
}

/* ── Sidebar step indicator ───────────────────────────────────── */
function StepIndicator({ currentStep }) {
  return (
    <div className="flex flex-col">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex items-start gap-4 pb-8 relative">
          {/* Connector line */}
          {i < STEPS.length - 1 && (
            <div
              className="absolute w-0.5 top-8 bottom-0 transition-all duration-300"
              style={{ left: 14, background: currentStep > s.n ? '#ff6b1a' : '#1a2a45' }}
            />
          )}

          {/* Dot */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 relative z-10 transition-all duration-300"
            style={{
              background:  currentStep === s.n ? '#ff6b1a' : currentStep > s.n ? 'rgba(255,107,26,.15)' : '#111e33',
              border:      `2px solid ${currentStep >= s.n ? '#ff6b1a' : '#243550'}`,
              color:       currentStep === s.n ? '#fff' : currentStep > s.n ? '#ff6b1a' : '#5a6a85',
              boxShadow:   currentStep === s.n ? '0 0 20px rgba(255,107,26,.5)' : 'none',
            }}
          >
            {currentStep > s.n ? '✓' : s.n}
          </div>

          {/* Label */}
          <div className="pt-1">
            <p className="text-sm font-bold" style={{ color: currentStep >= s.n ? '#e8edf5' : '#5a6a85' }}>
              {s.name}
            </p>
            <p className="font-mono text-xs mt-0.5 text-muted2">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Main CreateCauseForm ─────────────────────────────────────── */
export default function CreateCauseForm() {
  const [step,    setStep]    = useState(1)
  const [form,    setForm]    = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)

  const { connected } = useWalletStore()
  const addCause      = useCauseStore((s) => s.addCause)
  const toast         = useToastStore((s) => s.add)
  const { uploadMetadata } = useIPFS()
  const navigate = useNavigate()

  const upd = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleDeploy = async () => {
    if (!connected) { toast('error', 'Not Connected', 'Connect your wallet first'); return }

    setLoading(true)
    try {
      const cid = await uploadMetadata(form, null)

      toast('pending', 'Deploying Contract…', `DonationFactory.createCause(${cid}, ${form.goal})`)
      await new Promise((r) => setTimeout(r, 2200))

      // Optimistically add to store
      addCause({
        id:       Date.now(),
        title:    form.title     || 'New Cause',
        desc:     form.desc      || '',
        cat:      form.cat       || 'community',
        goal:     parseFloat(form.goal) || 1000,
        raised:   0,
        donors:   0,
        deadline: form.deadline  || 'TBD',
        emoji:    '🚀',
        gradFrom: '#1a0d2e',
        gradTo:   '#2d1a4a',
        ipfsCid:  cid,
      })

      toast('success', 'Cause Deployed! 🚀', 'Now live on Polkadot Hub Testnet')
      setStep(1)
      setForm(INITIAL_FORM)
      navigate('/causes')
    } catch (err) {
      toast('error', 'Deploy Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-4 gap-12 items-start py-16">
      {/* Sidebar */}
      <aside className="md:col-span-1 sticky top-20">
        <h2 className="font-extrabold text-2xl tracking-tight text-white mb-1"
          style={{ letterSpacing: '-.02em' }}>
          Launch a Cause
        </h2>
        <p className="font-mono text-xs text-muted mb-8">// 3 steps to go live</p>
        <StepIndicator currentStep={step} />
      </aside>

      {/* Form card */}
      <Card accent className="md:col-span-3 p-10">
        {step === 1 && <Step1 form={form} upd={upd} onNext={() => setStep(2)} />}
        {step === 2 && <Step2 form={form} upd={upd} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <Step3 onBack={() => setStep(2)} onDeploy={handleDeploy} loading={loading} />}
      </Card>
    </div>
  )
}
