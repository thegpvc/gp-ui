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
        <h2 className="demo-section-title">In-Situ Examples</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-navy-100">Contact Sync Service</h3>
                <p className="text-xs text-gray-500 dark:text-navy-400 mt-0.5">Last synced 2 minutes ago</p>
              </div>
              <Badge variant="success" icon={<Check className="w-3 h-3" />}>
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-navy-100">Email Campaign #23</h3>
                <p className="text-xs text-gray-500 dark:text-navy-400 mt-0.5">Scheduled for tomorrow</p>
              </div>
              <Badge variant="warning" icon={<Clock className="w-3 h-3" />}>
                Pending
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-navy-100">Database Backup</h3>
                <p className="text-xs text-gray-500 dark:text-navy-400 mt-0.5">Failed at 3:42 AM</p>
              </div>
              <Badge variant="error" icon={<X className="w-3 h-3" />}>
                Failed
              </Badge>
            </div>
          </div>

          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-navy-900 border-b border-gray-200 dark:border-navy-700">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-navy-300">Task</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-navy-300">Assignee</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-navy-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
                <tr>
                  <td className="px-4 py-2 text-gray-900 dark:text-navy-100">Update documentation</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-navy-400">Sarah Chen</td>
                  <td className="px-4 py-2">
                    <Badge variant="success">Complete</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-900 dark:text-navy-100">Review pull request #142</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-navy-400">Alex Kumar</td>
                  <td className="px-4 py-2">
                    <Badge variant="warning">In Review</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-900 dark:text-navy-100">Fix login bug</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-navy-400">Jordan Lee</td>
                  <td className="px-4 py-2">
                    <Badge variant="error">Blocked</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-900 dark:text-navy-100">Design new dashboard</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-navy-400">Morgan Taylor</td>
                  <td className="px-4 py-2">
                    <Badge variant="info">Planning</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
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
