import { Hero, Button, EyebrowLabel } from '@gp/ui'

export function HeroDemo() {
  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Brand-surface hero (xl)</h2>
        <div className="rounded-card bg-navy-950 p-10">
          <div className="dark">
            <Hero
              size="xl"
              eyebrow="The general partnership is"
              eyebrowDot
              title={
                <>
                  Where you build your <br className="hidden md:block" />
                  <span>best company.</span>
                </>
              }
              lede={
                <>
                  We're the only VC structurally built to trade in two currencies:{' '}
                  <span className="text-orange-500 font-semibold">capital + work.</span>
                </>
              }
              actions={
                <>
                  <Button variant="outline" shape="pill" mode="dark">The Model</Button>
                  <Button variant="outline" shape="pill" mode="dark">The Team</Button>
                </>
              }
              stats={[
                { value: 99, label: 'Founders partnered with' },
                { value: 500, label: 'Key hires placed' },
                { value: '80%', label: 'Founders who use our services' },
                { value: '300,000', label: 'Hours spent embedded' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Empty-state hero (lg)</h2>
        <div className="rounded-card bg-cream dark:bg-navy-900 border border-gray-200 dark:border-navy-700 p-10">
          <Hero
            size="lg"
            eyebrow="No portfolio yet"
            title="Add your first company"
            lede="Track founders, hires, and outcomes alongside your investments."
            actions={
              <>
                <Button variant="primary" shape="pill">Add company</Button>
                <Button variant="outline" shape="pill">Import CSV</Button>
              </>
            }
          />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Centered hero, no stats</h2>
        <div className="rounded-card bg-navy-950 p-12">
          <div className="dark">
            <Hero
              align="center"
              size="lg"
              eyebrow={<EyebrowLabel color="orange" dot>Case studies</EyebrowLabel>}
              title="Read how founders ship faster with TheGP."
              lede="Three deep-dives on portfolio companies and the work behind the cap table."
              actions={<Button variant="outline" shape="pill" mode="dark">View Portfolio</Button>}
            />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Hero, Button } from '@gp/ui'

<Hero
  eyebrow="A new model for founders"
  eyebrowDot
  title="Where you build your best company."
  lede="We're the only VC structurally built to trade in two currencies: capital + work."
  actions={
    <>
      <Button variant="primary" shape="pill">The Model</Button>
      <Button variant="outline" shape="pill">The Team</Button>
    </>
  }
  stats={[
    { value: 99, label: 'Founders partnered with' },
    { value: 500, label: 'Key hires placed' },
  ]}
/>`}</pre>
      </section>
    </div>
  )
}
