import { useState } from 'react'
import { Layout, LayoutContainer, Button, Card, Alert } from '@gp/ui'
import { Settings, HelpCircle } from 'lucide-react'

export function LayoutDemo() {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="space-y-8">
      <Alert variant="info">
        The Layout component is already being used on this page. The examples below
        show different configurations.
      </Alert>

      <section className="demo-section">
        <h2 className="demo-section-title">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <h3 className="font-semibold text-navy-900 dark:text-navy-100 mb-2">Header</h3>
            <ul className="text-sm text-navy-600 dark:text-navy-400 space-y-1">
              <li>• GP logo with title</li>
              <li>• Optional back button</li>
              <li>• Custom header right content</li>
              <li>• User dropdown menu</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy-900 dark:text-navy-100 mb-2">Banner</h3>
            <ul className="text-sm text-navy-600 dark:text-navy-400 space-y-1">
              <li>• Optional announcement banner</li>
              <li>• Optional link with external icon</li>
              <li>• Orange background with white text</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy-900 dark:text-navy-100 mb-2">Menu Items</h3>
            <ul className="text-sm text-navy-600 dark:text-navy-400 space-y-1">
              <li>• Custom menu items with icons</li>
              <li>• Default and danger variants</li>
              <li>• Built-in logout option</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy-900 dark:text-navy-100 mb-2">Content</h3>
            <ul className="text-sm text-navy-600 dark:text-navy-400 space-y-1">
              <li>• Configurable max-width</li>
              <li>• Optional sticky search bar</li>
              <li>• LayoutContainer helper</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Interactive Preview</h2>
        <Button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? 'Hide Preview' : 'Show Layout Preview'}
        </Button>

        {showPreview && (
          <div className="mt-4 border border-gray-200 dark:border-navy-700 rounded-lg overflow-hidden">
            <div className="scale-75 origin-top-left" style={{ width: '133.33%', height: '400px' }}>
              <Layout
                title="Preview App"
                user={{ name: 'John Doe', email: 'john@example.com' }}
                banner={{
                  message: 'New feature available!',
                  link: { text: 'Learn more', url: '#' },
                }}
                showBackButton
                onNavigateHome={() => alert('Navigate home')}
                menuItems={[
                  {
                    label: 'Settings',
                    icon: <Settings className="w-4 h-4" />,
                    onClick: () => alert('Settings clicked'),
                  },
                  {
                    label: 'Help',
                    icon: <HelpCircle className="w-4 h-4" />,
                    onClick: () => alert('Help clicked'),
                  },
                ]}
                onLogout={() => alert('Logout clicked')}
              >
                <LayoutContainer>
                  <Card>
                    <p className="text-navy-700 dark:text-navy-300">
                      This is a preview of the Layout component with all features
                      enabled.
                    </p>
                  </Card>
                </LayoutContainer>
              </Layout>
            </div>
          </div>
        )}
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Max Width Options</h2>
        <div className="space-y-2">
          <div className="demo-label">LayoutContainer maxWidth</div>
          <div className="text-sm text-navy-600 dark:text-navy-400 space-y-1">
            <p><code className="bg-gray-100 dark:bg-navy-800 px-1 rounded">narrow</code> - max-w-lg (32rem / 512px) - default</p>
            <p><code className="bg-gray-100 dark:bg-navy-800 px-1 rounded">medium</code> - max-w-3xl (48rem / 768px)</p>
            <p><code className="bg-gray-100 dark:bg-navy-800 px-1 rounded">wide</code> - max-w-5xl (64rem / 1024px)</p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Layout, LayoutContainer } from '@gp/ui'
import { Settings } from 'lucide-react'

<Layout
  title="My App"
  user={{ name: 'John', email: 'john@example.com' }}

  // Optional banner
  banner={{
    message: 'New feature!',
    link: { text: 'Learn more', url: '/features' }
  }}

  // Navigation
  showBackButton
  onNavigateHome={() => navigate('/')}
  isHomePage={false}

  // Custom menu items
  menuItems={[
    {
      label: 'Settings',
      icon: <Settings />,
      onClick: () => openSettings()
    }
  ]}
  onLogout={() => signOut()}

  // Content width: "narrow" (default), "medium", or "wide"
  maxWidth="narrow"
>
  <LayoutContainer>
    <p>Page content goes here</p>
  </LayoutContainer>
</Layout>`}</pre>
      </section>
    </div>
  )
}
