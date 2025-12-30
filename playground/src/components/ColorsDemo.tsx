const orangeColors = [
  { name: 'orange-50', value: '#fff7ed', light: true },
  { name: 'orange-100', value: '#ffedd5', light: true },
  { name: 'orange-200', value: '#fed7aa', light: true },
  { name: 'orange-300', value: '#fdba74', light: true },
  { name: 'orange-400', value: '#fb923c', light: true },
  { name: 'orange-500', value: '#ff6a00', light: false },
  { name: 'orange-600', value: '#ea580c', light: false },
  { name: 'orange-700', value: '#c2410c', light: false },
  { name: 'orange-800', value: '#9a3412', light: false },
  { name: 'orange-900', value: '#7c2d12', light: false },
]

const navyColors = [
  { name: 'navy-50', value: '#f0f2f5', light: true },
  { name: 'navy-100', value: '#d9dde5', light: true },
  { name: 'navy-200', value: '#b3bac9', light: true },
  { name: 'navy-300', value: '#8c97ad', light: true },
  { name: 'navy-400', value: '#667491', light: false },
  { name: 'navy-500', value: '#405175', light: false },
  { name: 'navy-600', value: '#33415e', light: false },
  { name: 'navy-700', value: '#263147', light: false },
  { name: 'navy-800', value: '#1a2030', light: false },
  { name: 'navy-900', value: '#0a1a35', light: false },
  { name: 'navy-950', value: '#050d1a', light: false },
]

function ColorSwatch({ name, value, light }: { name: string; value: string; light: boolean }) {
  return (
    <div className="text-center group relative">
      <div
        className={`h-16 rounded-md ${light ? 'text-navy-900' : 'text-white'}`}
        style={{ backgroundColor: value }}
      />
      {/* Tooltip on hover */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 bg-navy-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
        <div className="font-medium">{name}</div>
        <div className="font-mono text-navy-300">{value}</div>
      </div>
    </div>
  )
}

export function ColorsDemo() {
  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Orange Palette (Primary Brand)</h2>
        <p className="text-sm text-navy-600 mb-4">
          Primary brand color anchored on <code className="bg-gray-100 px-1 rounded">orange-500: #ff6a00</code>
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {orangeColors.map((color) => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Navy Palette (Text & UI)</h2>
        <p className="text-sm text-navy-600 mb-4">
          Dark navy for text and UI elements, anchored on <code className="bg-gray-100 px-1 rounded">navy-900: #0a1a35</code>
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-11 gap-2">
          {navyColors.map((color) => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Semantic Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="demo-label">Success</div>
            <div className="h-12 bg-emerald-700 rounded-md mb-1" />
            <div className="text-xs text-navy-600">emerald-700</div>
          </div>
          <div>
            <div className="demo-label">Warning</div>
            <div className="h-12 bg-amber-600 rounded-md mb-1" />
            <div className="text-xs text-navy-600">amber-600</div>
          </div>
          <div>
            <div className="demo-label">Error</div>
            <div className="h-12 bg-rose-700 rounded-md mb-1" />
            <div className="text-xs text-navy-600">rose-700</div>
          </div>
          <div>
            <div className="demo-label">Info</div>
            <div className="h-12 bg-navy-500 rounded-md mb-1" />
            <div className="text-xs text-navy-600">navy-500</div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Surface Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <div className="demo-label">Cream</div>
            <div className="h-12 rounded-md mb-1 border border-gray-200" style={{ backgroundColor: '#fff9f2' }} />
            <div className="text-xs text-navy-600">cream: #fff9f2</div>
          </div>
          <div>
            <div className="demo-label">White</div>
            <div className="h-12 bg-white rounded-md mb-1 border border-gray-200" />
            <div className="text-xs text-navy-600">Card backgrounds</div>
          </div>
          <div>
            <div className="demo-label">Gray-50</div>
            <div className="h-12 bg-gray-50 rounded-md mb-1 border border-gray-200" />
            <div className="text-xs text-navy-600">Page backgrounds</div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Typography</h2>
        <div className="space-y-4">
          <div>
            <div className="demo-label">Sans (DM Sans)</div>
            <p className="font-sans text-lg">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <div className="demo-label">Mono (JetBrains Mono)</div>
            <p className="font-mono text-lg">const value = 1234.56</p>
          </div>
        </div>
      </section>
    </div>
  )
}
