import { useState, useEffect } from 'react'
import { Layout, LayoutContainer, Button, SidebarSearch, SidebarUser, type SidebarGroup } from '@gp/ui'
import {
  Github,
  Palette,
  MousePointer2,
  Tag,
  CreditCard,
  AlertCircle,
  BarChart3,
  Loader,
  PanelTop,
  LayoutTemplate,
  LogIn,
} from 'lucide-react'
import { ButtonDemo } from './components/ButtonDemo'
import { BadgeDemo } from './components/BadgeDemo'
import { CardDemo } from './components/CardDemo'
import { AlertDemo } from './components/AlertDemo'
import { StatCardDemo } from './components/StatCardDemo'
import { SkeletonDemo } from './components/SkeletonDemo'
import { TabBarDemo } from './components/TabBarDemo'
import { LayoutDemo } from './components/LayoutDemo'
import { ColorsDemo } from './components/ColorsDemo'
import { LoginPageDemo } from './components/LoginPageDemo'

const sectionDescriptions: Record<string, string> = {
  colors: 'Brand colors and semantic palette',
  button: 'Interactive button components with variants and states',
  badge: 'Status indicators and labels',
  card: 'Container component with compound pattern',
  alert: 'Contextual feedback messages',
  statcard: 'Metric displays and statistics',
  skeleton: 'Loading placeholders',
  tabbar: 'Horizontal navigation tabs',
  layout: 'Page structure and navigation',
  loginpage: 'Full-page login with GP branding',
}

// Sidebar header with search - uses SidebarSearch component
function SidebarHeader() {
  return (
    <SidebarSearch
      placeholder="Search..."
      onSubmit={(value) => alert(`Search: ${value}`)}
    />
  )
}

// Sidebar footer with user profile - uses SidebarUser component
function SidebarFooter() {
  return (
    <SidebarUser
      name="Alex Johnson"
      email="alex@example.com"
      onClick={() => console.log('User clicked')}
    />
  )
}

export function App() {
  const [activeSection, setActiveSection] = useState('colors')

  // Reset scroll position when section changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeSection])

  const sidebarGroups: SidebarGroup[] = [
    {
      label: 'Components',
      items: [
        {
          id: 'colors',
          label: 'Colors',
          icon: <Palette className="w-5 h-5" />,
          onClick: () => setActiveSection('colors'),
          isActive: activeSection === 'colors',
        },
        {
          id: 'button',
          label: 'Button',
          icon: <MousePointer2 className="w-5 h-5" />,
          onClick: () => setActiveSection('button'),
          isActive: activeSection === 'button',
        },
        {
          id: 'badge',
          label: 'Badge',
          icon: <Tag className="w-5 h-5" />,
          onClick: () => setActiveSection('badge'),
          isActive: activeSection === 'badge',
        },
        {
          id: 'card',
          label: 'Card',
          icon: <CreditCard className="w-5 h-5" />,
          onClick: () => setActiveSection('card'),
          isActive: activeSection === 'card',
        },
        {
          id: 'alert',
          label: 'Alert',
          icon: <AlertCircle className="w-5 h-5" />,
          onClick: () => setActiveSection('alert'),
          isActive: activeSection === 'alert',
        },
        {
          id: 'statcard',
          label: 'StatCard',
          icon: <BarChart3 className="w-5 h-5" />,
          onClick: () => setActiveSection('statcard'),
          isActive: activeSection === 'statcard',
        },
        {
          id: 'skeleton',
          label: 'Skeleton',
          icon: <Loader className="w-5 h-5" />,
          onClick: () => setActiveSection('skeleton'),
          isActive: activeSection === 'skeleton',
        },
        {
          id: 'tabbar',
          label: 'TabBar',
          icon: <PanelTop className="w-5 h-5" />,
          onClick: () => setActiveSection('tabbar'),
          isActive: activeSection === 'tabbar',
        },
      ],
    },
    {
      label: 'Layouts',
      items: [
        {
          id: 'layout',
          label: 'Layout',
          icon: <LayoutTemplate className="w-5 h-5" />,
          onClick: () => setActiveSection('layout'),
          isActive: activeSection === 'layout',
        },
        {
          id: 'loginpage',
          label: 'LoginPage',
          icon: <LogIn className="w-5 h-5" />,
          onClick: () => setActiveSection('loginpage'),
          isActive: activeSection === 'loginpage',
        },
      ],
    },
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'colors':
        return <ColorsDemo />
      case 'button':
        return <ButtonDemo />
      case 'badge':
        return <BadgeDemo />
      case 'card':
        return <CardDemo />
      case 'alert':
        return <AlertDemo />
      case 'statcard':
        return <StatCardDemo />
      case 'skeleton':
        return <SkeletonDemo />
      case 'tabbar':
        return <TabBarDemo />
      case 'layout':
        return <LayoutDemo />
      case 'loginpage':
        return <LoginPageDemo />
    }
  }

  // Find the active item label from all groups
  const activeLabel = sidebarGroups
    .flatMap(g => g.items)
    .find(item => item.id === activeSection)?.label

  return (
    <Layout
      title="Design System"
      isHomePage
      maxWidth="2xl"
      sidebar={{
        items: sidebarGroups,
        header: <SidebarHeader />,
        footer: <SidebarFooter />,
      }}
      headerRight={
        <Button
          variant="ghost"
          size="sm"
          icon={<Github className="w-4 h-4" />}
          onClick={() => window.open('https://github.com/thegpvc/gp-ui', '_blank')}
          className="text-navy-300 hover:text-white hover:bg-navy-800"
        >
          GitHub
        </Button>
      }
    >
      <LayoutContainer maxWidth="2xl">
        {/* Page header */}
        <div className="mb-8 pt-2">
          <h1 className="text-2xl font-bold text-navy-900 mb-1">
            {activeLabel}
          </h1>
          <p className="text-navy-500">
            {sectionDescriptions[activeSection]}
          </p>
        </div>

        {/* Active section content */}
        <div key={activeSection} className="animate-content-in">
          {renderSection()}
        </div>
      </LayoutContainer>
    </Layout>
  )
}
