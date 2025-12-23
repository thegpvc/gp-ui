import { useState } from 'react'
import { Button } from '@gp/ui'
import { Mail, Trash2, Download, ChevronRight, RefreshCw } from 'lucide-react'

export function ButtonDemo() {
  const [isSpinning, setIsSpinning] = useState(false)

  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Variants</h2>
        <div className="demo-row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Sizes</h2>
        <div className="demo-row">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With Icons (Auto-sized)</h2>
        <div className="demo-row">
          <Button icon={<Mail />}>Send Email</Button>
          <Button variant="secondary" icon={<Download />}>
            Download
          </Button>
          <Button variant="ghost" icon={<ChevronRight />} iconPosition="right">
            Next
          </Button>
          <Button variant="destructive" icon={<Trash2 />}>
            Delete
          </Button>
        </div>
        <p className="text-sm text-slate-600 mt-2">Icons are automatically sized to match the button size</p>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Icon Sizes</h2>
        <div className="demo-row">
          <Button size="sm" icon={<RefreshCw />}>Small</Button>
          <Button size="md" icon={<RefreshCw />}>Medium</Button>
          <Button size="lg" icon={<RefreshCw />}>Large</Button>
        </div>
        <p className="text-sm text-slate-600 mt-2">Icons automatically scale: sm (14px), md (16px), lg (20px)</p>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Spinning Icons</h2>
        <div className="demo-row">
          <Button
            variant="ghost"
            size="sm"
            icon={<RefreshCw />}
            spin={isSpinning}
            onClick={() => setIsSpinning(!isSpinning)}
          >
            {isSpinning ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="secondary"
            icon={<RefreshCw />}
            spin={true}
          >
            Always Spinning
          </Button>
        </div>
        <p className="text-sm text-slate-600 mt-2">Use the <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">spin</code> prop to animate icons</p>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Loading State</h2>
        <div className="demo-row">
          <Button loading>Loading...</Button>
          <Button variant="secondary" loading>
            Processing
          </Button>
          <Button variant="ghost" loading>
            Please wait
          </Button>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Disabled State</h2>
        <div className="demo-row">
          <Button disabled>Primary</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Button } from '@gp/ui'
import { Mail, RefreshCw } from 'lucide-react'

// Basic usage
<Button variant="primary">Submit</Button>

// With icon (auto-sized)
<Button icon={<Mail />}>Send Email</Button>

// Spinning icon
<Button icon={<RefreshCw />} spin={isRefreshing}>
  Refresh
</Button>

// Loading state
<Button loading>Processing...</Button>

// Different sizes (icons scale automatically)
<Button size="sm" icon={<Mail />}>Small</Button>
<Button size="md" icon={<Mail />}>Medium</Button>
<Button size="lg" icon={<Mail />}>Large</Button>`}</pre>
      </section>
    </div>
  )
}
