import SectionHeader from '@/components/ui/SectionHeader'
import BalanceCard   from '@/components/dashboard/BalanceCard'
import MyCausesCard  from '@/components/dashboard/MyCausesCard'
import ActivityFeed  from '@/components/dashboard/ActivityFeed'

export default function Dashboard() {
  return (
    <div className="animate-fadeUp py-16">
      <SectionHeader
        title="My Dashboard"
        sub="// your activity on polkadonate"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <BalanceCard />
        <MyCausesCard />
        <ActivityFeed />
      </div>
    </div>
  )
}
