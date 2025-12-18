import { StatCard } from '@gp/ui'
import { Mail, Users, Clock, TrendingUp } from 'lucide-react'

export function StatCardDemo() {
  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Default Variant</h2>
        <div className="demo-grid">
          <StatCard label="Total Emails" value={1234} />
          <StatCard label="Contacts" value={567} />
          <StatCard label="Response Rate" value="89%" />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Compact Variant</h2>
        <div className="demo-grid">
          <StatCard label="Sent" value={42} variant="compact" />
          <StatCard label="Received" value={38} variant="compact" />
          <StatCard label="Drafts" value={5} variant="compact" />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Inline Variant</h2>
        <p className="text-sm text-navy-600 mb-4">
          Label on top, value below, left-aligned. Good for debug panels and compact displays.
        </p>
        <div className="demo-grid">
          <StatCard label="Emails" value="1,234" variant="inline" />
          <StatCard label="Last Sync" value="2m ago" variant="inline" />
          <StatCard label="Status" value="Active" variant="inline" />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Centered Variant</h2>
        <p className="text-sm text-navy-600 mb-4">
          Label on top, value below, centered. Good for contact cards and summary displays.
        </p>
        <div className="demo-grid">
          <StatCard label="Sent" value={42} variant="centered" />
          <StatCard label="Received" value={38} variant="centered" />
          <StatCard label="Total" value={80} variant="centered" />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With Icons</h2>
        <div className="demo-grid">
          <StatCard
            label="Total Emails"
            value={1234}
            icon={<Mail className="w-4 h-4 text-navy-400" />}
          />
          <StatCard
            label="Contacts"
            value={567}
            icon={<Users className="w-4 h-4 text-navy-400" />}
          />
          <StatCard
            label="Avg Response Time"
            value="2.5h"
            icon={<Clock className="w-4 h-4 text-navy-400" />}
          />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With Trend</h2>
        <div className="demo-grid">
          <StatCard
            label="This Month"
            value={1234}
            trend={{ direction: 'up', value: '+12%', label: 'vs last month' }}
          />
          <StatCard
            label="Response Time"
            value="2.5h"
            trend={{ direction: 'down', value: '-15%' }}
          />
          <StatCard
            label="Open Rate"
            value="45%"
            icon={<TrendingUp className="w-4 h-4 text-navy-400" />}
            trend={{ direction: 'up', value: '+5%' }}
          />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Accent Color</h2>
        <p className="text-sm text-navy-600 mb-4">
          Orange accent theme for active or syncing states.
        </p>
        <div className="demo-grid">
          <StatCard label="Syncing" value="150" variant="inline" color="accent" />
          <StatCard label="Messages" value={42} variant="inline" color="accent" />
          <StatCard label="Progress" value="75%" variant="centered" color="accent" />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Real-world Example</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm max-w-md">
          <h3 className="font-semibold text-navy-900 mb-3">Contact Summary</h3>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Sent" value={142} variant="centered" />
            <StatCard label="Received" value={98} variant="centered" />
            <StatCard label="Threads" value={45} variant="centered" />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { StatCard } from '@gp/ui'
import { Mail } from 'lucide-react'

// Basic usage
<StatCard label="Total Emails" value={1234} />

// Different variants
<StatCard label="Sent" value={42} variant="compact" />
<StatCard label="Emails" value="1,234" variant="inline" />
<StatCard label="Total" value={80} variant="centered" />

// With icon
<StatCard
  label="Emails"
  value={1234}
  icon={<Mail />}
/>

// With trend
<StatCard
  label="This Month"
  value={1234}
  trend={{ direction: 'up', value: '+12%' }}
/>

// Accent color (for active states)
<StatCard
  label="Syncing"
  value="150"
  variant="inline"
  color="accent"
/>`}</pre>
      </section>
    </div>
  )
}
