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
  Grid3x3,
  Loader,
  PanelTop,
  LayoutTemplate,
  LogIn,
  PanelLeft,
  Menu,
  Type,
  MessageSquare,
  Square,
  Layers,
} from 'lucide-react'
import { ButtonDemo } from './components/ButtonDemo'
import { BadgeDemo } from './components/BadgeDemo'
import { CardDemo } from './components/CardDemo'
import { AlertDemo } from './components/AlertDemo'
import { StatCardDemo } from './components/StatCardDemo'
import { StatGridDemo } from './components/StatGridDemo'
import { SkeletonDemo } from './components/SkeletonDemo'
import { TabBarDemo } from './components/TabBarDemo'
import { LayoutDemo } from './components/LayoutDemo'
import { ColorsDemo } from './components/ColorsDemo'
import { LoginPageDemo } from './components/LoginPageDemo'
import { SidebarDemo } from './components/SidebarDemo'
import { DropdownDemo } from './components/DropdownDemo'
import { InputDemo } from './components/InputDemo'
import { TooltipDemo } from './components/TooltipDemo'
import { ModalDemo } from './components/ModalDemo'
import { ContentLayoutsDemo } from './components/ContentLayoutsDemo'

const sectionDescriptions: Record<string, string> = {
  colors: 'Brand colors and semantic palette',
  button: 'Interactive button components with variants and states',
  badge: 'Status indicators and labels',
  card: 'Container component with compound pattern',
  alert: 'Contextual feedback messages',
  statcard: 'Metric displays and statistics',
  statgrid: 'Key-value grid with formatting and copy support',
  skeleton: 'Loading placeholders',
  tabbar: 'Horizontal navigation tabs',
  dropdown: 'Context menus with sub-menus and selections',
  input: 'Form inputs with labels, icons, and validation states',
  tooltip: 'Contextual information on hover',
  modal: 'Dialog modals with alerts and confirmations',
  sidebar: 'Collapsible navigation sidebar',
  layout: 'Page structure and navigation',
  contentlayouts: 'Content area primitives for tabs, sidebars, and canvases',
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
          id: 'statgrid',
          label: 'StatGrid',
          icon: <Grid3x3 className="w-5 h-5" />,
          onClick: () => setActiveSection('statgrid'),
          isActive: activeSection === 'statgrid',
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
        {
          id: 'dropdown',
          label: 'Dropdown',
          icon: <Menu className="w-5 h-5" />,
          onClick: () => setActiveSection('dropdown'),
          isActive: activeSection === 'dropdown',
        },
        {
          id: 'input',
          label: 'Input',
          icon: <Type className="w-5 h-5" />,
          onClick: () => setActiveSection('input'),
          isActive: activeSection === 'input',
        },
        {
          id: 'tooltip',
          label: 'Tooltip',
          icon: <MessageSquare className="w-5 h-5" />,
          onClick: () => setActiveSection('tooltip'),
          isActive: activeSection === 'tooltip',
        },
        {
          id: 'modal',
          label: 'Modal',
          icon: <Square className="w-5 h-5" />,
          onClick: () => setActiveSection('modal'),
          isActive: activeSection === 'modal',
        },
      ],
    },
    {
      label: 'Layouts',
      items: [
        {
          id: 'sidebar',
          label: 'Sidebar',
          icon: <PanelLeft className="w-5 h-5" />,
          onClick: () => setActiveSection('sidebar'),
          isActive: activeSection === 'sidebar',
        },
        {
          id: 'layout',
          label: 'Layout',
          icon: <LayoutTemplate className="w-5 h-5" />,
          onClick: () => setActiveSection('layout'),
          isActive: activeSection === 'layout',
        },
        {
          id: 'contentlayouts',
          label: 'Content Layouts',
          icon: <Layers className="w-5 h-5" />,
          onClick: () => setActiveSection('contentlayouts'),
          isActive: activeSection === 'contentlayouts',
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
      case 'statgrid':
        return <StatGridDemo />
      case 'skeleton':
        return <SkeletonDemo />
      case 'tabbar':
        return <TabBarDemo />
      case 'dropdown':
        return <DropdownDemo />
      case 'input':
        return <InputDemo />
      case 'tooltip':
        return <TooltipDemo />
      case 'modal':
        return <ModalDemo />
      case 'sidebar':
        return <SidebarDemo />
      case 'layout':
        return <LayoutDemo />
      case 'contentlayouts':
        return <ContentLayoutsDemo />
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
      <LayoutContainer>
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
