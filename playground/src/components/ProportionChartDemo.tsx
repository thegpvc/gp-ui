import { ProportionChart, type ColorConfig } from '@gp/ui'

export function ProportionChartDemo() {
  // Example 1: Time breakdown (like the original RibbonGraph use case)
  const timeData = [
    { key: 'thinking', value: 1200 },
    { key: 'llm', value: 3500 },
    { key: 'tool', value: 2100 },
    { key: 'idle', value: 800 },
    { key: 'user', value: 1400 },
  ]

  const timeColors: Record<string, ColorConfig> = {
    thinking: { bg: 'bg-purple-500', label: 'Thinking' },
    llm: { bg: 'bg-navy-500 dark:bg-navy-300', label: 'LLM' },
    tool: { bg: 'bg-emerald-600 dark:bg-emerald-400', label: 'Tools' },
    idle: { bg: 'bg-gray-400 dark:bg-gray-500', label: 'Idle' },
    user: { bg: 'bg-cyan-500', label: 'User' },
  }

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${(ms / 60000).toFixed(1)}m`
  }

  // Example 2: Status distribution
  const statusData = [
    { key: 'completed', value: 145 },
    { key: 'in-progress', value: 62 },
    { key: 'pending', value: 28 },
    { key: 'blocked', value: 5 },
  ]

  const statusColors: Record<string, ColorConfig> = {
    completed: { bg: 'bg-emerald-600 dark:bg-emerald-400', label: 'Completed' },
    'in-progress': { bg: 'bg-navy-500 dark:bg-navy-300', label: 'In Progress' },
    pending: { bg: 'bg-amber-600 dark:bg-amber-400', label: 'Pending' },
    blocked: { bg: 'bg-rose-700 dark:bg-rose-400', label: 'Blocked' },
  }

  const formatCount = (n: number): string => `${n} tasks`

  // Example 3: Resource usage
  const resourceData = [
    { key: 'cpu', value: 45 },
    { key: 'memory', value: 68 },
    { key: 'disk', value: 23 },
    { key: 'network', value: 12 },
  ]

  const resourceColors: Record<string, ColorConfig> = {
    cpu: { bg: 'bg-orange-500', label: 'CPU' },
    memory: { bg: 'bg-purple-500', label: 'Memory' },
    disk: { bg: 'bg-navy-500 dark:bg-navy-300', label: 'Disk' },
    network: { bg: 'bg-emerald-600 dark:bg-emerald-400', label: 'Network' },
  }

  const formatPercent = (n: number): string => `${n}%`

  // Empty state data
  const emptyData = [{ key: 'none', value: 0 }]
  const emptyColors: Record<string, ColorConfig> = {
    none: { bg: 'bg-gray-400', label: 'No Data' },
  }

  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Basic Examples</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
              Time Breakdown (Default Height)
            </h3>
            <ProportionChart
              data={timeData}
              colors={timeColors}
              formatValue={formatDuration}
              ariaLabel="Time breakdown by activity type"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
              Task Status Distribution
            </h3>
            <ProportionChart
              data={statusData}
              colors={statusColors}
              formatValue={formatCount}
              ariaLabel="Task distribution by status"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
              Resource Usage
            </h3>
            <ProportionChart
              data={resourceData}
              colors={resourceColors}
              formatValue={formatPercent}
              ariaLabel="System resource usage breakdown"
            />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Different Heights</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">h-1 (4px)</p>
            <ProportionChart
              data={statusData}
              colors={statusColors}
              formatValue={formatCount}
              height="h-1"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">h-2 (8px - default)</p>
            <ProportionChart
              data={statusData}
              colors={statusColors}
              formatValue={formatCount}
              height="h-2"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">h-4 (16px)</p>
            <ProportionChart
              data={statusData}
              colors={statusColors}
              formatValue={formatCount}
              height="h-4"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">h-6 (24px)</p>
            <ProportionChart
              data={statusData}
              colors={statusColors}
              formatValue={formatCount}
              height="h-6"
            />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With Legend</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
              Time Breakdown with Legend
            </h3>
            <ProportionChart
              data={timeData}
              colors={timeColors}
              formatValue={formatDuration}
              showLegend={true}
              height="h-3"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
              Resource Usage with Legend
            </h3>
            <ProportionChart
              data={resourceData}
              colors={resourceColors}
              formatValue={formatPercent}
              showLegend={true}
              height="h-3"
            />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Empty State</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              When data totals to zero, a placeholder is shown
            </p>
            <ProportionChart
              data={emptyData}
              colors={emptyColors}
              formatValue={formatCount}
            />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Custom Styling</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              With custom className and border
            </p>
            <ProportionChart
              data={statusData}
              colors={statusColors}
              formatValue={formatCount}
              height="h-3"
              className="border border-gray-300 dark:border-navy-600 rounded-lg p-3 bg-white dark:bg-navy-800"
            />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Interactive Demo</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-navy-800/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-3">
              Hover over the chart to see details
            </h3>
            <ProportionChart
              data={timeData}
              colors={timeColors}
              formatValue={formatDuration}
              height="h-4"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              The tooltip shows each category's value and percentage of total
            </p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { ProportionChart, type ColorConfig } from '@gp/ui'

// Define your data
const data = [
  { key: 'completed', value: 145 },
  { key: 'in-progress', value: 62 },
  { key: 'pending', value: 28 }
]

// Define color configuration
const colors: Record<string, ColorConfig> = {
  completed: { bg: 'bg-green-500', label: 'Completed' },
  'in-progress': { bg: 'bg-blue-500', label: 'In Progress' },
  pending: { bg: 'bg-yellow-500', label: 'Pending' }
}

// Basic usage
<ProportionChart
  data={data}
  colors={colors}
  formatValue={(n) => \`\${n} tasks\`}
/>

// With legend and custom height
<ProportionChart
  data={data}
  colors={colors}
  formatValue={(n) => \`\${n} tasks\`}
  height="h-4"
  showLegend={true}
  ariaLabel="Task distribution by status"
/>

// Custom styling
<ProportionChart
  data={data}
  colors={colors}
  formatValue={(n) => \`\${n} tasks\`}
  className="border border-gray-300 rounded-lg p-3"
/>`}</pre>
      </section>
    </div>
  )
}
