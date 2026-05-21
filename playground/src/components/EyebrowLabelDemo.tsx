import { EyebrowLabel } from '@gp/ui'

export function EyebrowLabelDemo() {
  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Colors</h2>
        <div className="space-y-3">
          <div><EyebrowLabel>Muted (default)</EyebrowLabel></div>
          <div><EyebrowLabel color="orange">Orange — brand accent</EyebrowLabel></div>
          <div><EyebrowLabel color="navy">Navy — for light surfaces</EyebrowLabel></div>
          <div className="rounded-card bg-navy-950 p-4 inline-block">
            <div className="dark">
              <EyebrowLabel color="cream">Cream — for dark surfaces</EyebrowLabel>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With leading dot</h2>
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-4">
          The small orange dot is the brand's section-divider motif.
        </p>
        <div className="space-y-3">
          <div><EyebrowLabel dot>Case studies</EyebrowLabel></div>
          <div><EyebrowLabel dot color="orange">A new model for founders</EyebrowLabel></div>
          <div className="rounded-card bg-navy-950 p-4 inline-block">
            <div className="dark">
              <EyebrowLabel dot color="cream">The general partnership is</EyebrowLabel>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">In context</h2>
        <div className="rounded-card bg-navy-950 p-8">
          <div className="dark">
            <EyebrowLabel color="orange" dot>A new model for founders</EyebrowLabel>
            <h2 className="mt-4 text-display-lg font-extrabold leading-[1.05] tracking-tight text-cream">
              Where you build your best company.
            </h2>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { EyebrowLabel } from '@gp/ui'

<EyebrowLabel>A new model for founders</EyebrowLabel>
<EyebrowLabel dot color="orange">Case studies</EyebrowLabel>
<EyebrowLabel color="cream">Filter by services</EyebrowLabel>`}</pre>
      </section>
    </div>
  )
}
