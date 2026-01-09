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

// Surface color mapping for light/dark modes
const surfaceColors = {
  light: [
    { label: 'Page Background', color: 'bg-gray-50', name: 'gray-50' },
    { label: 'Card Background', color: 'bg-white', name: 'white' },
    { label: 'Borders', color: 'bg-gray-200', name: 'gray-200' },
  ],
  dark: [
    { label: 'Page Background', color: 'bg-navy-950', name: 'navy-950' },
    { label: 'Card Background', color: 'bg-navy-800', name: 'navy-800' },
    { label: 'Borders', color: 'bg-navy-700', name: 'navy-700' },
  ],
}

const textColors = {
  light: [
    { label: 'Primary Text', color: 'text-navy-900', bg: 'bg-white', name: 'navy-900' },
    { label: 'Secondary Text', color: 'text-navy-500', bg: 'bg-white', name: 'navy-500' },
    { label: 'Muted Text', color: 'text-navy-400', bg: 'bg-white', name: 'navy-400' },
  ],
  dark: [
    { label: 'Primary Text', color: 'text-navy-100', bg: 'bg-navy-900', name: 'navy-100' },
    { label: 'Secondary Text', color: 'text-navy-400', bg: 'bg-navy-900', name: 'navy-400' },
    { label: 'Muted Text', color: 'text-navy-500', bg: 'bg-navy-900', name: 'navy-500' },
  ],
}

export function ColorsDemo() {
  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Orange Palette (Primary Brand)</h2>
        <p className="text-sm text-navy-600 dark:text-navy-400 mb-4">
          Primary brand color anchored on <code className="bg-gray-100 dark:bg-navy-800 px-1 rounded">orange-500: #ff6a00</code>
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {orangeColors.map((color) => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Navy Palette (Text & UI)</h2>
        <p className="text-sm text-navy-600 dark:text-navy-400 mb-4">
          Dark navy for text and UI elements, anchored on <code className="bg-gray-100 dark:bg-navy-800 px-1 rounded">navy-900: #0a1a35</code>
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-11 gap-2">
          {navyColors.map((color) => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Surface Colors</h2>
        <p className="text-sm text-navy-600 dark:text-navy-400 mb-4">
          Background and border colors adapt automatically based on light/dark mode.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Light mode surfaces */}
          <div>
            <div className="demo-label">Light Mode</div>
            <div className="space-y-2">
              {surfaceColors.light.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded border border-gray-300 ${item.color}`} />
                  <div>
                    <div className="text-sm font-medium text-navy-900 dark:text-navy-100">{item.label}</div>
                    <div className="text-xs text-navy-500 dark:text-navy-400">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dark mode surfaces */}
          <div>
            <div className="demo-label">Dark Mode</div>
            <div className="space-y-2">
              {surfaceColors.dark.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded border border-navy-600 ${item.color}`} />
                  <div>
                    <div className="text-sm font-medium text-navy-900 dark:text-navy-100">{item.label}</div>
                    <div className="text-xs text-navy-500 dark:text-navy-400">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Text Colors</h2>
        <p className="text-sm text-navy-600 dark:text-navy-400 mb-4">
          Text colors shift to maintain contrast in each mode.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Light mode text */}
          <div>
            <div className="demo-label">Light Mode</div>
            <div className="space-y-2">
              {textColors.light.map((item) => (
                <div key={item.name} className={`${item.bg} rounded px-3 py-2 border border-gray-200`}>
                  <span className={`${item.color} text-sm`}>{item.label}</span>
                  <span className="text-xs text-navy-400 ml-2">({item.name})</span>
                </div>
              ))}
            </div>
          </div>
          {/* Dark mode text */}
          <div>
            <div className="demo-label">Dark Mode</div>
            <div className="space-y-2">
              {textColors.dark.map((item) => (
                <div key={item.name} className={`${item.bg} rounded px-3 py-2 border border-navy-700`}>
                  <span className={`${item.color} text-sm`}>{item.label}</span>
                  <span className="text-xs text-navy-500 ml-2">({item.name})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Semantic Colors</h2>
        <p className="text-sm text-navy-600 dark:text-navy-400 mb-4">
          Status colors with light/dark mode variants for proper contrast.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="demo-label">Success</div>
            <div className="h-12 bg-emerald-700 dark:bg-emerald-400 rounded-md mb-1" />
            <div className="text-xs text-navy-600 dark:text-navy-400">
              <span className="hidden dark:inline">emerald-400</span>
              <span className="dark:hidden">emerald-700</span>
            </div>
          </div>
          <div>
            <div className="demo-label">Warning</div>
            <div className="h-12 bg-amber-600 dark:bg-amber-400 rounded-md mb-1" />
            <div className="text-xs text-navy-600 dark:text-navy-400">
              <span className="hidden dark:inline">amber-400</span>
              <span className="dark:hidden">amber-600</span>
            </div>
          </div>
          <div>
            <div className="demo-label">Error</div>
            <div className="h-12 bg-rose-700 dark:bg-rose-400 rounded-md mb-1" />
            <div className="text-xs text-navy-600 dark:text-navy-400">
              <span className="hidden dark:inline">rose-400</span>
              <span className="dark:hidden">rose-700</span>
            </div>
          </div>
          <div>
            <div className="demo-label">Info</div>
            <div className="h-12 bg-navy-500 dark:bg-navy-300 rounded-md mb-1" />
            <div className="text-xs text-navy-600 dark:text-navy-400">
              <span className="hidden dark:inline">navy-300</span>
              <span className="dark:hidden">navy-500</span>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Typography</h2>
        <div className="space-y-4">
          <div>
            <div className="demo-label">Sans (DM Sans)</div>
            <p className="font-sans text-lg text-navy-900 dark:text-navy-100">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <div className="demo-label">Mono (JetBrains Mono)</div>
            <p className="font-mono text-lg text-navy-900 dark:text-navy-100">const value = 1234.56</p>
          </div>
        </div>
      </section>
    </div>
  )
}
