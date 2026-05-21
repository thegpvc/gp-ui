import { useState } from 'react'
import { Chip, EyebrowLabel } from '@gp/ui'
import { Code, Coins, Users, Layers } from 'lucide-react'

const FILTERS = [
  { id: 'engineering', label: 'Engineering' },
  { id: 'eth', label: 'ETH' },
  { id: 'capital', label: 'Capital' },
  { id: 'talent', label: 'Talent' },
] as const

export function ChipDemo() {
  const [active, setActive] = useState<string[]>(['engineering'])
  const [tags, setTags] = useState<string[]>(['Pre-seed', 'AI', 'Devtools'])

  const toggle = (id: string) =>
    setActive((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">States</h2>
        <div className="demo-row">
          <Chip>Default</Chip>
          <Chip active>Active</Chip>
          <Chip disabled>Disabled</Chip>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Sizes</h2>
        <div className="demo-row">
          <Chip size="sm">Small</Chip>
          <Chip size="md">Medium</Chip>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With icon</h2>
        <div className="demo-row">
          <Chip icon={<Code />}>Engineering</Chip>
          <Chip icon={<Coins />}>Capital</Chip>
          <Chip icon={<Users />}>Talent</Chip>
          <Chip icon={<Layers />} active>ETH</Chip>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Filter group (toggleable)</h2>
        <div className="space-y-3">
          <EyebrowLabel color="orange">Filter by services provided</EyebrowLabel>
          <div className="demo-row">
            {FILTERS.map((f) => (
              <Chip key={f.id} active={active.includes(f.id)} onClick={() => toggle(f.id)}>
                {f.label}
              </Chip>
            ))}
          </div>
          <p className="text-sm text-navy-500 dark:text-navy-300">
            Selected: {active.length === 0 ? 'none' : active.join(', ')}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Removable</h2>
        <div className="demo-row">
          {tags.map((t) => (
            <Chip key={t} onRemove={() => setTags(tags.filter((x) => x !== t))}>
              {t}
            </Chip>
          ))}
          {tags.length === 0 && (
            <button
              type="button"
              onClick={() => setTags(['Pre-seed', 'AI', 'Devtools'])}
              className="text-sm text-orange-600 hover:underline"
            >
              Reset
            </button>
          )}
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">On brand surface</h2>
        <div className="rounded-card bg-navy-950 p-6">
          <div className="dark space-y-3">
            <EyebrowLabel color="orange">Filter by services provided</EyebrowLabel>
            <div className="demo-row">
              <Chip active>Engineering</Chip>
              <Chip>ETH</Chip>
              <Chip>Capital</Chip>
              <Chip>Talent</Chip>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Chip } from '@gp/ui'

<Chip>Engineering</Chip>
<Chip active>ETH</Chip>
<Chip onRemove={() => removeFilter('capital')}>Capital</Chip>
<Chip icon={<Code />} active onClick={toggle}>Engineering</Chip>`}</pre>
      </section>
    </div>
  )
}
