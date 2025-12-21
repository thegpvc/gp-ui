import { useState, useEffect, useMemo } from 'react'
import { Modal, AlertModal, ConfirmModal, Button } from '@gp/ui'
import { Info, Trash2, Save, AlertCircle, Maximize2 } from 'lucide-react'

// Procedural art component
function ProceduralArt() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Generate a grid of cells with procedural colors
  const cells = useMemo(() => {
    const gridSize = 20
    const cells = []
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        cells.push({ x, y })
      }
    }
    return cells
  }, [])

  const getColor = (x: number, y: number) => {
    const hue = ((x * 17 + y * 23 + time * 2) % 360)
    const saturation = 60 + (Math.sin(x * 0.5 + time * 0.05) * 20)
    const lightness = 50 + (Math.cos(y * 0.5 + time * 0.05) * 15)
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  const getScale = (x: number, y: number) => {
    const wave = Math.sin(x * 0.3 + y * 0.3 + time * 0.1)
    return 0.5 + wave * 0.5
  }

  return (
    <div className="w-full h-full bg-navy-950 p-8 overflow-hidden relative">
      <div
        className="grid gap-2 h-full"
        style={{ gridTemplateColumns: 'repeat(20, 1fr)' }}
      >
        {cells.map(({ x, y }) => (
          <div
            key={`${x}-${y}`}
            className="rounded-md transition-all duration-300 ease-out"
            style={{
              backgroundColor: getColor(x, y),
              transform: `scale(${getScale(x, y)})`,
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-8 left-8 text-white bg-black/40 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-2xl font-bold mb-2">Generative Art Grid</h3>
        <p className="text-navy-300 text-sm">
          A procedural animation using HSL color transformations and trigonometric waves.
        </p>
        <p className="text-navy-400 text-xs mt-2">
          Frame: {time}
        </p>
      </div>
    </div>
  )
}

export function ModalDemo() {
  const [basicOpen, setBasicOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>('')

  const handleLoadingConfirm = async () => {
    setIsLoading(true)
    setResult('Saving...')
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setLoadingOpen(false)
    setResult('Saved successfully!')
    setTimeout(() => setResult(''), 3000)
  }

  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Basic Modal (Controlled)</h2>
        <div className="demo-row">
          <Button onClick={() => setBasicOpen(true)}>
            Open Modal
          </Button>
          <Modal open={basicOpen} onOpenChange={setBasicOpen}>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Modal Title</Modal.Title>
                <Modal.Description>
                  This is a basic modal with a title and description.
                </Modal.Description>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-gray-700">
                  This is the modal body content. You can put any content here,
                  including forms, images, or other components.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </Modal.Close>
                <Button onClick={() => {
                  alert('Confirmed!')
                  setBasicOpen(false)
                }}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Modal with Trigger</h2>
        <div className="demo-row">
          <Modal>
            <Modal.Trigger asChild>
              <Button variant="secondary" icon={<Info className="w-4 h-4" />}>
                Open with Trigger
              </Button>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Information</Modal.Title>
                <Modal.Description>
                  This modal is opened using a trigger element.
                </Modal.Description>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-gray-700">
                  You can use the Modal.Trigger component with the asChild prop
                  to use any element as a trigger.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close asChild>
                  <Button>Got it</Button>
                </Modal.Close>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Modal Sizes</h2>
        <div className="demo-row">
          <Modal>
            <Modal.Trigger asChild>
              <Button variant="ghost" size="sm">Small</Button>
            </Modal.Trigger>
            <Modal.Content size="sm">
              <Modal.Header>
                <Modal.Title>Small Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-gray-700">This is a small modal (max-w-sm).</p>
              </Modal.Body>
            </Modal.Content>
          </Modal>

          <Modal>
            <Modal.Trigger asChild>
              <Button variant="ghost" size="sm">Medium (Default)</Button>
            </Modal.Trigger>
            <Modal.Content size="md">
              <Modal.Header>
                <Modal.Title>Medium Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-gray-700">This is a medium modal (max-w-md).</p>
              </Modal.Body>
            </Modal.Content>
          </Modal>

          <Modal>
            <Modal.Trigger asChild>
              <Button variant="ghost" size="sm">Large</Button>
            </Modal.Trigger>
            <Modal.Content size="lg">
              <Modal.Header>
                <Modal.Title>Large Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-gray-700">This is a large modal (max-w-lg).</p>
              </Modal.Body>
            </Modal.Content>
          </Modal>

          <Modal>
            <Modal.Trigger asChild>
              <Button variant="ghost" size="sm">Extra Large</Button>
            </Modal.Trigger>
            <Modal.Content size="xl">
              <Modal.Header>
                <Modal.Title>Extra Large Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-gray-700">This is an extra large modal (max-w-xl).</p>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">AlertModal</h2>
        <div className="demo-row">
          <Button
            variant="secondary"
            icon={<AlertCircle className="w-4 h-4" />}
            onClick={() => setAlertOpen(true)}
          >
            Show Alert
          </Button>
          <AlertModal
            open={alertOpen}
            onOpenChange={setAlertOpen}
            title="Success!"
            description="Your changes have been saved successfully."
            okText="Great!"
            onOk={() => setAlertOpen(false)}
          />

          <AlertModal
            title="Welcome"
            description={
              <div className="space-y-2">
                <p>Welcome to the design system!</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Browse components</li>
                  <li>View code examples</li>
                  <li>Test interactions</li>
                </ul>
              </div>
            }
            trigger={<Button variant="ghost">Alert with Custom Content</Button>}
          />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">ConfirmModal</h2>
        <div className="demo-row">
          <Button onClick={() => setConfirmOpen(true)}>
            Show Confirmation
          </Button>
          <ConfirmModal
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="Confirm Action"
            description="Are you sure you want to proceed with this action?"
            confirmText="Yes, proceed"
            cancelText="No, cancel"
            onConfirm={() => {
              alert('Confirmed!')
              setConfirmOpen(false)
            }}
            onCancel={() => setConfirmOpen(false)}
          />

          <Button
            variant="destructive"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => setDeleteOpen(true)}
          >
            Delete Item
          </Button>
          <ConfirmModal
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone."
            confirmText="Delete"
            confirmVariant="destructive"
            onConfirm={() => {
              alert('Deleted!')
              setDeleteOpen(false)
            }}
            onCancel={() => setDeleteOpen(false)}
          />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">ConfirmModal with Loading State</h2>
        <div className="demo-row">
          <Button
            variant="primary"
            icon={<Save className="w-4 h-4" />}
            onClick={() => setLoadingOpen(true)}
          >
            Save Changes
          </Button>
          <ConfirmModal
            open={loadingOpen}
            onOpenChange={setLoadingOpen}
            title="Save Changes"
            description="Do you want to save your changes? This will update the configuration."
            confirmText="Save"
            cancelText="Cancel"
            loading={isLoading}
            onConfirm={handleLoadingConfirm}
            onCancel={() => setLoadingOpen(false)}
          />
          {result && (
            <p className="text-sm text-navy-600 font-medium">{result}</p>
          )}
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Full-Size Modal</h2>
        <div className="demo-row">
          <Modal>
            <Modal.Trigger asChild>
              <Button variant="primary" icon={<Maximize2 className="w-4 h-4" />}>
                Open Full Screen
              </Button>
            </Modal.Trigger>
            <Modal.Content size="full">
              <ProceduralArt />
            </Modal.Content>
          </Modal>
        </div>
        <p className="text-sm text-navy-500 mt-2">
          Full-size modals take up most of the viewport, perfect for image viewers, document previews, or data visualizations.
        </p>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Modal without Overlay Dismiss</h2>
        <div className="demo-row">
          <Modal>
            <Modal.Trigger asChild>
              <Button variant="secondary">No Dismiss on Click</Button>
            </Modal.Trigger>
            <Modal.Content dismissOnOverlayClick={false}>
              <Modal.Header>
                <Modal.Title>Important Decision</Modal.Title>
                <Modal.Description>
                  You must make a choice to continue. Clicking outside or pressing ESC won't close this modal.
                </Modal.Description>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-gray-700">
                  This modal can only be closed by clicking one of the buttons below.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close asChild>
                  <Button variant="secondary">Option A</Button>
                </Modal.Close>
                <Modal.Close asChild>
                  <Button>Option B</Button>
                </Modal.Close>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Modal, AlertModal, ConfirmModal, Button } from '@gp/ui'

// Basic Modal with trigger
<Modal>
  <Modal.Trigger asChild>
    <Button>Open Modal</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Title</Modal.Title>
      <Modal.Description>Description</Modal.Description>
    </Modal.Header>
    <Modal.Body>
      <p>Content goes here</p>
    </Modal.Body>
    <Modal.Footer>
      <Modal.Close asChild>
        <Button variant="secondary">Cancel</Button>
      </Modal.Close>
      <Button>Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>

// Modal sizes: sm, md, lg, xl, full
<Modal.Content size="full">
  {/* Takes up most of the viewport */}
</Modal.Content>

// Controlled Modal
const [open, setOpen] = useState(false)

<Modal open={open} onOpenChange={setOpen}>
  <Modal.Content size="lg">
    {/* ... */}
  </Modal.Content>
</Modal>

// AlertModal
<AlertModal
  open={open}
  onOpenChange={setOpen}
  title="Success!"
  description="Your changes have been saved."
  onOk={() => setOpen(false)}
/>

// ConfirmModal with trigger
<ConfirmModal
  title="Delete Item"
  description="Are you sure? This cannot be undone."
  confirmText="Delete"
  confirmVariant="destructive"
  trigger={<Button variant="destructive">Delete</Button>}
  onConfirm={handleDelete}
/>

// ConfirmModal with loading
const [loading, setLoading] = useState(false)

<ConfirmModal
  title="Save Changes"
  description="Do you want to save?"
  loading={loading}
  onConfirm={async () => {
    setLoading(true)
    await save()
    setLoading(false)
  }}
/>`}</pre>
      </section>
    </div>
  )
}
