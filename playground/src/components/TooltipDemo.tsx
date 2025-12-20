import { Tooltip, Button, Badge } from '@gp/ui'
import {
  Info,
  HelpCircle,
  Settings,
  Star,
  Heart,
  Save,
} from 'lucide-react'

export function TooltipDemo() {
  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Basic Tooltip</h2>
        <div className="demo-row">
          <Tooltip.Provider>
            <Tooltip>
              <Tooltip.Trigger asChild>
                <Button variant="secondary">Hover me</Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                This is a helpful tooltip
              </Tooltip.Content>
            </Tooltip>
          </Tooltip.Provider>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With Icons</h2>
        <div className="demo-row">
          <Tooltip.Provider>
            <div className="flex items-center gap-4">
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="ghost" size="sm" icon={<Info className="w-4 h-4" />} />
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Information
                </Tooltip.Content>
              </Tooltip>

              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="ghost" size="sm" icon={<HelpCircle className="w-4 h-4" />} />
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Get help
                </Tooltip.Content>
              </Tooltip>

              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />} />
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Settings
                </Tooltip.Content>
              </Tooltip>
            </div>
          </Tooltip.Provider>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Without Arrow</h2>
        <div className="demo-row">
          <Tooltip.Provider>
            <Tooltip>
              <Tooltip.Trigger asChild>
                <Button variant="primary" icon={<Star className="w-4 h-4" />}>
                  Star this
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content showArrow={false}>
                Add to favorites (no arrow)
              </Tooltip.Content>
            </Tooltip>
          </Tooltip.Provider>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Different Sides</h2>
        <div className="demo-row">
          <Tooltip.Provider>
            <div className="flex items-center gap-4">
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="secondary">Top</Button>
                </Tooltip.Trigger>
                <Tooltip.Content side="top">
                  Tooltip on top
                </Tooltip.Content>
              </Tooltip>

              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="secondary">Right</Button>
                </Tooltip.Trigger>
                <Tooltip.Content side="right">
                  Tooltip on right
                </Tooltip.Content>
              </Tooltip>

              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="secondary">Bottom</Button>
                </Tooltip.Trigger>
                <Tooltip.Content side="bottom">
                  Tooltip on bottom
                </Tooltip.Content>
              </Tooltip>

              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="secondary">Left</Button>
                </Tooltip.Trigger>
                <Tooltip.Content side="left">
                  Tooltip on left
                </Tooltip.Content>
              </Tooltip>
            </div>
          </Tooltip.Provider>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With Different Triggers</h2>
        <div className="demo-row">
          <Tooltip.Provider>
            <div className="flex items-center gap-4">
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Like
                </Tooltip.Content>
              </Tooltip>

              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Badge variant="success">Active</Badge>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Service is running
                </Tooltip.Content>
              </Tooltip>

              <Tooltip>
                <Tooltip.Trigger asChild>
                  <span className="text-sm text-navy-500 underline decoration-dotted cursor-help">
                    What's this?
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  This is an example of inline help text with a tooltip
                </Tooltip.Content>
              </Tooltip>
            </div>
          </Tooltip.Provider>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Custom Delay</h2>
        <div className="demo-row">
          <Tooltip.Provider delayDuration={100}>
            <div className="flex items-center gap-4">
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="ghost" size="sm" icon={<Save className="w-4 h-4" />}>
                    Fast
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Shows quickly (100ms delay)
                </Tooltip.Content>
              </Tooltip>
            </div>
          </Tooltip.Provider>

          <Tooltip.Provider delayDuration={1000}>
            <div className="flex items-center gap-4">
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="ghost" size="sm" icon={<Save className="w-4 h-4" />}>
                    Slow
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Shows slowly (1000ms delay)
                </Tooltip.Content>
              </Tooltip>
            </div>
          </Tooltip.Provider>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Multi-line Content</h2>
        <div className="demo-row">
          <Tooltip.Provider>
            <Tooltip>
              <Tooltip.Trigger asChild>
                <Button variant="secondary">Detailed Info</Button>
              </Tooltip.Trigger>
              <Tooltip.Content className="max-w-xs">
                This tooltip contains multiple lines of text to demonstrate how longer content is displayed.
                It will wrap naturally based on the max-width.
              </Tooltip.Content>
            </Tooltip>
          </Tooltip.Provider>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Tooltip, Button } from '@gp/ui'

// Basic tooltip (shows instantly with arrow by default)
<Tooltip.Provider>
  <Tooltip>
    <Tooltip.Trigger asChild>
      <Button>Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      Helpful tooltip text
    </Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>

// Without arrow
<Tooltip.Content showArrow={false}>
  More information
</Tooltip.Content>

// Different sides
<Tooltip.Content side="right">
  Tooltip on right
</Tooltip.Content>

// Custom delay (default is 0ms)
<Tooltip.Provider delayDuration={500}>
  <Tooltip>
    <Tooltip.Trigger>Delayed</Tooltip.Trigger>
    <Tooltip.Content>Shows after 500ms</Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>

// With any element using asChild
<Tooltip.Trigger asChild>
  <span>Custom element</span>
</Tooltip.Trigger>`}</pre>
      </section>
    </div>
  )
}
