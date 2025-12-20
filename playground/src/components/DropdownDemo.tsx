import { useState } from 'react'
import { Dropdown, Button } from '@gp/ui'
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  FileText,
  Archive,
  Trash2,
  Tag,
  Users,
  Bell,
  Mail,
} from 'lucide-react'

export function DropdownDemo() {
  const [showGrid, setShowGrid] = useState(true)
  const [showRuler, setShowRuler] = useState(false)
  const [theme, setTheme] = useState('light')

  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Basic Dropdown</h2>
        <div className="demo-row">
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button variant="secondary" icon={<ChevronDown className="w-4 h-4" />} iconPosition="right">
                User Menu
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>
                <User className="w-4 h-4" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item>
                <Settings className="w-4 h-4" />
                Settings
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item variant="danger">
                <LogOut className="w-4 h-4" />
                Logout
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With Labels & Shortcuts</h2>
        <div className="demo-row">
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button variant="ghost">Actions</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Label>File Operations</Dropdown.Label>
              <Dropdown.Item>
                <FileText className="w-4 h-4" />
                New File
                <Dropdown.Shortcut>⌘N</Dropdown.Shortcut>
              </Dropdown.Item>
              <Dropdown.Item>
                <Archive className="w-4 h-4" />
                Archive
                <Dropdown.Shortcut>⌘⇧A</Dropdown.Shortcut>
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Label>Danger Zone</Dropdown.Label>
              <Dropdown.Item variant="danger">
                <Trash2 className="w-4 h-4" />
                Delete
                <Dropdown.Shortcut>⌘⌫</Dropdown.Shortcut>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With Sub-menus</h2>
        <div className="demo-row">
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button variant="secondary">More Options</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>
                <Mail className="w-4 h-4" />
                Messages
              </Dropdown.Item>
              <Dropdown.Item>
                <Bell className="w-4 h-4" />
                Notifications
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Sub>
                <Dropdown.SubTrigger>
                  <Tag className="w-4 h-4" />
                  Apply Label
                </Dropdown.SubTrigger>
                <Dropdown.SubContent>
                  <Dropdown.Item>Bug</Dropdown.Item>
                  <Dropdown.Item>Feature</Dropdown.Item>
                  <Dropdown.Item>Documentation</Dropdown.Item>
                  <Dropdown.Item>Enhancement</Dropdown.Item>
                </Dropdown.SubContent>
              </Dropdown.Sub>
              <Dropdown.Sub>
                <Dropdown.SubTrigger>
                  <Users className="w-4 h-4" />
                  Assign to
                </Dropdown.SubTrigger>
                <Dropdown.SubContent>
                  <Dropdown.Item>Alice Johnson</Dropdown.Item>
                  <Dropdown.Item>Bob Smith</Dropdown.Item>
                  <Dropdown.Item>Carol Williams</Dropdown.Item>
                </Dropdown.SubContent>
              </Dropdown.Sub>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Checkbox Items</h2>
        <div className="demo-row">
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button variant="ghost">View Options</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Label>Display Settings</Dropdown.Label>
              <Dropdown.CheckboxItem
                checked={showGrid}
                onCheckedChange={setShowGrid}
              >
                Show Grid
              </Dropdown.CheckboxItem>
              <Dropdown.CheckboxItem
                checked={showRuler}
                onCheckedChange={setShowRuler}
              >
                Show Ruler
              </Dropdown.CheckboxItem>
            </Dropdown.Content>
          </Dropdown>
        </div>
        <p className="text-sm text-navy-500 mt-2">
          Grid: {showGrid ? 'On' : 'Off'} | Ruler: {showRuler ? 'On' : 'Off'}
        </p>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Radio Items</h2>
        <div className="demo-row">
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button variant="ghost">Theme: {theme}</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Label>Appearance</Dropdown.Label>
              <Dropdown.RadioGroup value={theme} onValueChange={setTheme}>
                <Dropdown.RadioItem value="light">Light</Dropdown.RadioItem>
                <Dropdown.RadioItem value="dark">Dark</Dropdown.RadioItem>
                <Dropdown.RadioItem value="system">System</Dropdown.RadioItem>
              </Dropdown.RadioGroup>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Inset Items</h2>
        <div className="demo-row">
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button variant="secondary">Document Menu</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>
                <FileText className="w-4 h-4" />
                Open
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Label inset>Recent Files</Dropdown.Label>
              <Dropdown.Item inset>Project Proposal.pdf</Dropdown.Item>
              <Dropdown.Item inset>Meeting Notes.md</Dropdown.Item>
              <Dropdown.Item inset>Budget 2024.xlsx</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Dropdown, Button } from '@gp/ui'

// Basic dropdown
<Dropdown>
  <Dropdown.Trigger asChild>
    <Button>Open Menu</Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item>Profile</Dropdown.Item>
    <Dropdown.Item variant="danger">Logout</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>

// With sub-menu
<Dropdown>
  <Dropdown.Trigger>More</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Sub>
      <Dropdown.SubTrigger>Labels</Dropdown.SubTrigger>
      <Dropdown.SubContent>
        <Dropdown.Item>Bug</Dropdown.Item>
        <Dropdown.Item>Feature</Dropdown.Item>
      </Dropdown.SubContent>
    </Dropdown.Sub>
  </Dropdown.Content>
</Dropdown>

// With checkbox items
<Dropdown.CheckboxItem
  checked={checked}
  onCheckedChange={setChecked}
>
  Show Grid
</Dropdown.CheckboxItem>

// With radio items
<Dropdown.RadioGroup value={value} onValueChange={setValue}>
  <Dropdown.RadioItem value="light">Light</Dropdown.RadioItem>
  <Dropdown.RadioItem value="dark">Dark</Dropdown.RadioItem>
</Dropdown.RadioGroup>`}</pre>
      </section>
    </div>
  )
}
