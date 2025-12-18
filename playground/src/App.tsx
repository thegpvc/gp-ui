import { useState } from 'react'
import { Layout, LayoutContainer, Button, TabBar } from '@gp/ui'
import { Github } from 'lucide-react'
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

const sections = [
  { id: 'colors', label: 'Colors' },
  { id: 'button', label: 'Button' },
  { id: 'badge', label: 'Badge' },
  { id: 'card', label: 'Card' },
  { id: 'alert', label: 'Alert' },
  { id: 'statcard', label: 'StatCard' },
  { id: 'skeleton', label: 'Skeleton' },
  { id: 'tabbar', label: 'TabBar' },
  { id: 'layout', label: 'Layout' },
  { id: 'loginpage', label: 'LoginPage' },
]

export function App() {
  const [activeSection, setActiveSection] = useState('colors')

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

  return (
    <Layout
      title="Design System"
      isHomePage
      maxWidth="2xl"
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
      {/* Navigation tabs - sticky below header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 flex justify-center">
          <TabBar
            items={sections}
            activeId={activeSection}
            onChange={setActiveSection}
          />
        </div>
      </div>

      <LayoutContainer maxWidth="2xl">
        {/* Page header */}
        <div className="mb-8 pt-2">
          <h1 className="text-2xl font-bold text-navy-900 mb-1">
            {sections.find(s => s.id === activeSection)?.label}
          </h1>
          <p className="text-navy-500">
            {activeSection === 'colors' && 'Brand colors and semantic palette'}
            {activeSection === 'button' && 'Interactive button components with variants and states'}
            {activeSection === 'badge' && 'Status indicators and labels'}
            {activeSection === 'card' && 'Container component with compound pattern'}
            {activeSection === 'alert' && 'Contextual feedback messages'}
            {activeSection === 'statcard' && 'Metric displays and statistics'}
            {activeSection === 'skeleton' && 'Loading placeholders'}
            {activeSection === 'tabbar' && 'Horizontal navigation tabs'}
            {activeSection === 'layout' && 'Page structure and navigation'}
            {activeSection === 'loginpage' && 'Full-page login with GP branding'}
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
