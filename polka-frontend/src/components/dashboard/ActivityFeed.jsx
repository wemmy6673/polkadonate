import Card from '@/components/ui/Card'

export default function ActivityFeed() {
  return (
    <Card accent className="p-7 col-span-full">
      <p className="font-mono uppercase tracking-widest text-xs text-muted mb-5 flex items-center gap-2">
        <span className="w-0.5 h-3.5 rounded-full bg-orange inline-block" />
        Recent Activity
      </p>
      <div className="text-center py-12">
        <p className="text-4xl mb-4 opacity-30">📭</p>
        <p className="font-mono text-sm text-muted">No activity yet</p>
        <p className="font-mono text-xs text-muted2 mt-1">
          Your donations and created causes will appear here
        </p>
      </div>
    </Card>
  )
}