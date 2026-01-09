import { StatGrid } from '@gp/ui'
import {
  Check,
  X,
  AlertCircle,
  Info,
  User,
  Mail,
  Calendar,
  Clock,
  Server,
  Database,
} from 'lucide-react'

export function StatGridDemo() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Basic Example */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">Basic Example</h2>
        <StatGrid
          asCard
          items={[
            { label: 'Name', value: 'John Doe' },
            { label: 'Email', value: 'john.doe@example.com' },
            { label: 'Age', value: 32 },
            { label: 'Location', value: 'San Francisco, CA' },
          ]}
        />
      </section>

      {/* Status Colors */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">Status Colors with Icons</h2>
        <StatGrid
          asCard
          items={[
            {
              label: 'Status',
              value: 'Active',
              icon: <Check className="w-4 h-4" />,
              status: 'success',
            },
            {
              label: 'Error State',
              value: 'Failed',
              icon: <X className="w-4 h-4" />,
              status: 'error',
            },
            {
              label: 'Warning',
              value: 'Pending',
              icon: <AlertCircle className="w-4 h-4" />,
              status: 'warning',
            },
            {
              label: 'Info',
              value: 'Processing',
              icon: <Info className="w-4 h-4" />,
              status: 'info',
            },
          ]}
        />
      </section>

      {/* Copyable Values */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
          Copyable Values (hover to see copy icon)
        </h2>
        <StatGrid
          asCard
          items={[
            {
              label: 'User ID',
              value: 'usr_2kD9xL8mN3pQ',
              copyable: true,
              icon: <User className="w-4 h-4" />,
            },
            {
              label: 'Email',
              value: 'user@example.com',
              copyable: true,
              icon: <Mail className="w-4 h-4" />,
            },
            {
              label: 'API Key',
              value: 'sk_live_xyz123abc456',
              copyable: true,
            },
          ]}
        />
      </section>

      {/* Clickable Values */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
          Clickable Values (hover to see underline)
        </h2>
        <StatGrid
          asCard
          items={[
            {
              label: 'Email',
              value: 'support@example.com',
              onClick: () => alert('Opening email client...'),
              icon: <Mail className="w-4 h-4" />,
            },
            {
              label: 'Documentation',
              value: 'View Docs',
              onClick: () => alert('Opening documentation...'),
              status: 'info',
            },
            {
              label: 'User Profile',
              value: 'John Doe',
              onClick: () => alert('Opening user profile...'),
              icon: <User className="w-4 h-4" />,
            },
          ]}
        />
      </section>

      {/* Formatted Values */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">Formatted Values</h2>
        <StatGrid
          asCard
          items={[
            { label: 'Price', value: 1234.56, format: 'currency' },
            { label: 'Downloads', value: 1234567, format: 'number' },
            { label: 'File Size', value: 1234567890, format: 'bytes' },
            { label: 'Created At', value: new Date().toISOString(), format: 'date' },
            { label: 'Last Updated', value: new Date().toISOString(), format: 'datetime' },
          ]}
        />
      </section>

      {/* Server Stats Example */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
          Server Stats Example
        </h2>
        <StatGrid
          asCard
          items={[
            {
              label: 'Server Status',
              value: 'Online',
              icon: <Server className="w-4 h-4" />,
              status: 'success',
            },
            { label: 'Uptime', value: '99.9%', status: 'success' },
            { label: 'CPU Usage', value: '45%', status: 'info' },
            { label: 'Memory Usage', value: '6.2 GB', format: 'number' },
            { label: 'Disk Space', value: 523456789012, format: 'bytes' },
            {
              label: 'Database',
              value: 'Connected',
              icon: <Database className="w-4 h-4" />,
              status: 'success',
            },
            { label: 'Active Users', value: 1523, format: 'number' },
            { label: 'Requests/min', value: 8234, format: 'number' },
            { label: 'Avg Response', value: '125ms' },
          ]}
        />
      </section>

      {/* Metadata Example */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">Metadata Example</h2>
        <StatGrid
          asCard
          items={[
            { label: 'Created', value: new Date().toISOString(), format: 'datetime', icon: <Calendar className="w-3.5 h-3.5" /> },
            { label: 'Modified', value: new Date().toISOString(), format: 'datetime', icon: <Clock className="w-3.5 h-3.5" /> },
            { label: 'Status', value: 'Active', icon: <Check className="w-3.5 h-3.5" />, status: 'success' },
            { label: 'ID', value: 'rec_abc123', copyable: true },
          ]}
        />
      </section>

      {/* Complex Example */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
          Complex Example (User Profile)
        </h2>
        <StatGrid
          asCard
          items={[
            {
              label: 'User ID',
              value: 'usr_2kD9xL8mN3pQ',
              copyable: true,
              icon: <User className="w-4 h-4" />,
            },
            {
              label: 'Email',
              value: 'john.doe@example.com',
              copyable: true,
              onClick: () => alert('Send email to user'),
              icon: <Mail className="w-4 h-4" />,
            },
            {
              label: 'Account Status',
              value: 'Active',
              icon: <Check className="w-4 h-4" />,
              status: 'success',
            },
            {
              label: 'Total Spent',
              value: 12345.67,
              format: 'currency',
              onClick: () => alert('View transaction history'),
            },
            {
              label: 'Orders',
              value: 42,
              format: 'number',
              onClick: () => alert('View orders'),
            },
            {
              label: 'Member Since',
              value: new Date('2023-01-15').toISOString(),
              format: 'date',
              icon: <Calendar className="w-4 h-4" />,
            },
          ]}
        />
      </section>
    </div>
  )
}
