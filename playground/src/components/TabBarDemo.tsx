import { useState } from 'react'
import { TabBar, Card } from '@gp/ui'

export function TabBarDemo() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Basic Usage</h2>
        <div className="border-b border-gray-200 dark:border-navy-700 -mb-px">
          <TabBar
            items={[
              { id: 'overview', label: 'Overview' },
              { id: 'details', label: 'Details' },
              { id: 'settings', label: 'Settings' },
            ]}
            activeId={activeTab}
            onChange={setActiveTab}
          />
        </div>
        <Card className="rounded-t-none border-t-0 mt-0">
          <p className="text-navy-600 dark:text-navy-400">
            Active tab: <span className="font-semibold text-navy-900 dark:text-navy-100">{activeTab}</span>
          </p>
        </Card>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Many Tabs (Scrollable)</h2>
        <div className="border-b border-gray-200 dark:border-navy-700 max-w-md">
          <TabBar
            items={[
              { id: 'tab1', label: 'Dashboard' },
              { id: 'tab2', label: 'Analytics' },
              { id: 'tab3', label: 'Reports' },
              { id: 'tab4', label: 'Notifications' },
              { id: 'tab5', label: 'Settings' },
              { id: 'tab6', label: 'Help' },
            ]}
            activeId="tab1"
            onChange={() => {}}
          />
        </div>
        <p className="text-sm text-navy-500 dark:text-navy-400 mt-2">
          Tabs scroll horizontally when they overflow the container.
        </p>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { TabBar } from '@gp/ui'

const [activeTab, setActiveTab] = useState('overview')

<TabBar
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings' },
  ]}
  activeId={activeTab}
  onChange={setActiveTab}
/>`}</pre>
      </section>
    </div>
  )
}
