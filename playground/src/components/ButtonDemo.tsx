import { Button } from '@gp/ui'
import { Mail, Trash2, Download, ChevronRight } from 'lucide-react'

export function ButtonDemo() {
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
        <h2 className="demo-section-title">With Icons</h2>
        <div className="demo-row">
          <Button icon={<Mail className="w-4 h-4" />}>Send Email</Button>
          <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
            Download
          </Button>
          <Button variant="ghost" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
            Next
          </Button>
          <Button variant="destructive" icon={<Trash2 className="w-4 h-4" />}>
            Delete
          </Button>
        </div>
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

// Basic usage
<Button variant="primary">Submit</Button>

// With icon
<Button icon={<Mail />}>Send Email</Button>

// Loading state
<Button loading>Processing...</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}</pre>
      </section>
    </div>
  )
}
