import { useState } from 'react'
import {
  Sidebar,
  SidebarProvider,
  SidebarLink,
  SidebarSection,
  SidebarSearch,
  SidebarUser,
} from '@gp/ui'
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  Mail,
} from 'lucide-react'

export function SidebarDemo() {
  const [activeItem, setActiveItem] = useState('home')

  return (
    <div className="space-y-8">
      {/* Standalone Sidebar Demo */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 mb-4">
          Standalone Sidebar with Children
        </h2>
        <p className="text-sm text-navy-600 mb-4">
          The Sidebar can be used outside of Layout by wrapping it in a SidebarProvider.
          Use SidebarLink and SidebarSection as children for a composable API.
        </p>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <SidebarProvider variant="inline">
            <div className="flex h-[500px] bg-gray-50">
              <Sidebar
                variant="inline"
                header={<SidebarSearch placeholder="Search..." />}
                footer={<SidebarUser name="Alex Johnson" email="alex@example.com" onClick={() => alert('User clicked')} />}
              >
                <SidebarSection label="Main">
                  <SidebarLink
                    label="Home"
                    icon={<Home className="w-5 h-5" />}
                    isActive={activeItem === 'home'}
                    onClick={() => setActiveItem('home')}
                  />
                  <SidebarLink
                    label="Users"
                    icon={<Users className="w-5 h-5" />}
                    isActive={activeItem === 'users'}
                    onClick={() => setActiveItem('users')}
                    badge={12}
                  />
                  <SidebarLink
                    label="Documents"
                    icon={<FileText className="w-5 h-5" />}
                    isActive={activeItem === 'documents'}
                    onClick={() => setActiveItem('documents')}
                  />
                </SidebarSection>

                <SidebarSection label="Analytics">
                  <SidebarLink
                    label="Reports"
                    icon={<BarChart3 className="w-5 h-5" />}
                    isActive={activeItem === 'reports'}
                    onClick={() => setActiveItem('reports')}
                  />
                  <SidebarLink
                    label="Messages"
                    icon={<Mail className="w-5 h-5" />}
                    isActive={activeItem === 'messages'}
                    onClick={() => setActiveItem('messages')}
                    badge={3}
                  />
                </SidebarSection>

                <SidebarSection>
                  <SidebarLink
                    label="Settings"
                    icon={<Settings className="w-5 h-5" />}
                    isActive={activeItem === 'settings'}
                    onClick={() => setActiveItem('settings')}
                  />
                </SidebarSection>
              </Sidebar>

              <main className="flex-1 p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-2">
                  {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
                </h3>
                <p className="text-navy-600">
                  Selected: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{activeItem}</code>
                </p>
                <p className="text-navy-500 text-sm mt-4">
                  Click the collapse button at the bottom of the sidebar to toggle between expanded and collapsed states.
                </p>
              </main>
            </div>
          </SidebarProvider>
        </div>
      </section>

      {/* Standalone Usage */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 mb-4">Standalone Usage</h2>
        <p className="text-sm text-navy-600 mb-3">
          Wrap in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">SidebarProvider</code> and use composable children:
        </p>
        <pre className="bg-navy-900 text-navy-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<SidebarProvider>
  <div className="flex">
    <Sidebar
      header={<SidebarSearch />}
      footer={<SidebarUser name="Alex" />}
    >
      <SidebarSection label="Main">
        <SidebarLink label="Home" icon={<Home />} isActive />
        <SidebarLink label="Users" icon={<Users />} badge={12} />
      </SidebarSection>
    </Sidebar>
    <main>{/* content */}</main>
  </div>
</SidebarProvider>`}
        </pre>
      </section>

      {/* Layout Integration */}
      <section>
        <h2 className="text-lg font-semibold text-navy-900 mb-4">With Layout Component</h2>
        <p className="text-sm text-navy-600 mb-3">
          Pass a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">sidebar</code> prop to Layout.
          The provider is handled automatically:
        </p>
        <pre className="bg-navy-900 text-navy-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<Layout
  title="My App"
  sidebar={{
    items: [
      { id: 'home', label: 'Home', icon: <Home />, isActive: true },
      { id: 'users', label: 'Users', icon: <Users />, badge: 12 },
    ],
    header: <SidebarSearch />,
    footer: <SidebarUser name="Alex" />,
  }}
>
  {/* page content */}
</Layout>`}
        </pre>
        <p className="text-sm text-navy-500 mt-3">
          This playground app uses this pattern — see the sidebar on the left.
        </p>
      </section>
    </div>
  )
}
