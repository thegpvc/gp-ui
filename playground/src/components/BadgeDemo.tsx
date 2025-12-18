import { Badge } from '@gp/ui'
import { Check, AlertTriangle, X, Info, Clock } from 'lucide-react'

export function BadgeDemo() {
  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Variants</h2>
        <div className="demo-row">
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Sizes</h2>
        <div className="demo-row">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With Icons</h2>
        <div className="demo-row">
          <Badge variant="success" icon={<Check className="w-3 h-3" />}>
            Synced
          </Badge>
          <Badge variant="warning" icon={<Clock className="w-3 h-3" />}>
            Pending
          </Badge>
          <Badge variant="error" icon={<X className="w-3 h-3" />}>
            Failed
          </Badge>
          <Badge variant="info" icon={<Info className="w-3 h-3" />}>
            Updated
          </Badge>
          <Badge variant="neutral" icon={<AlertTriangle className="w-3 h-3" />}>
            Draft
          </Badge>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Real-world Examples</h2>
        <div className="space-y-4">
          <div>
            <div className="demo-label">Sync Status</div>
            <div className="demo-row">
              <Badge variant="success" icon={<Check className="w-3 h-3" />}>
                Synced
              </Badge>
              <Badge variant="warning" icon={<Clock className="w-3 h-3" />}>
                Syncing
              </Badge>
              <Badge variant="error" icon={<X className="w-3 h-3" />}>
                Sync Failed
              </Badge>
            </div>
          </div>
          <div>
            <div className="demo-label">Contact Status</div>
            <div className="demo-row">
              <Badge variant="success">Active</Badge>
              <Badge variant="neutral">Inactive</Badge>
              <Badge variant="info">New</Badge>
            </div>
          </div>
          <div>
            <div className="demo-label">Priority</div>
            <div className="demo-row">
              <Badge variant="error">High</Badge>
              <Badge variant="warning">Medium</Badge>
              <Badge variant="neutral">Low</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Badge } from '@gp/ui'
import { Check } from 'lucide-react'

// Basic usage
<Badge variant="success">Active</Badge>

// With icon
<Badge variant="success" icon={<Check />}>Synced</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>`}</pre>
      </section>
    </div>
  )
}
