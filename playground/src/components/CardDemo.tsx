import { Card, Button, Badge } from '@gp/ui'

export function CardDemo() {
  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Basic Card</h2>
        <div className="max-w-md">
          <Card>
            <p className="text-navy-700">
              This is a basic card with some content. Cards provide a container for
              related content and actions.
            </p>
          </Card>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Compound Pattern</h2>
        <div className="max-w-md">
          <Card>
            <Card.Header>
              <h3 className="font-semibold text-navy-900">Card Title</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-navy-700">
                Use Card.Header, Card.Body, and Card.Footer for structured content.
                Each section has appropriate borders and spacing.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex gap-2">
                <Button variant="primary" size="sm">
                  Save
                </Button>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Interactive Card</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <Card interactive>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-navy-900">Contact Name</h3>
                <p className="text-sm text-navy-500">contact@example.com</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </Card>
          <Card interactive>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-navy-900">Another Contact</h3>
                <p className="text-sm text-navy-500">another@example.com</p>
              </div>
              <Badge variant="neutral">Inactive</Badge>
            </div>
          </Card>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Card with Rich Content</h2>
        <div className="max-w-lg">
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-navy-900">Email Statistics</h3>
                <Badge variant="info">Last 30 days</Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-semibold font-mono text-navy-900">1,234</div>
                  <div className="text-xs text-navy-500">Sent</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold font-mono text-navy-900">982</div>
                  <div className="text-xs text-navy-500">Received</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold font-mono text-emerald-600">89%</div>
                  <div className="text-xs text-navy-500">Response Rate</div>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button variant="ghost" size="sm" className="w-full">
                View Details
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Card, Button } from '@gp/ui'

// Simple card
<Card>
  <p>Card content</p>
</Card>

// With sections
<Card>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Content</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// Interactive (clickable)
<Card interactive onClick={handleClick}>
  Clickable card content
</Card>`}</pre>
      </section>
    </div>
  )
}
