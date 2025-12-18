import { useState } from 'react'
import { Alert } from '@gp/ui'

export function AlertDemo() {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])

  const handleDismiss = (id: string) => {
    setDismissedAlerts((prev) => [...prev, id])
  }

  const resetAlerts = () => {
    setDismissedAlerts([])
  }

  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Variants</h2>
        <div className="space-y-3 max-w-xl">
          <Alert variant="info">
            This is an informational message with helpful context.
          </Alert>
          <Alert variant="success">
            Your changes have been saved successfully.
          </Alert>
          <Alert variant="warning">
            Please review your settings before proceeding.
          </Alert>
          <Alert variant="error">
            An error occurred while processing your request.
          </Alert>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">With Title</h2>
        <div className="space-y-3 max-w-xl">
          <Alert variant="info" title="Did you know?">
            You can customize your dashboard by clicking the settings icon.
          </Alert>
          <Alert variant="success" title="Sync Complete">
            All 1,234 emails have been synchronized with your account.
          </Alert>
          <Alert variant="warning" title="Action Required">
            Your API token will expire in 7 days. Please renew it.
          </Alert>
          <Alert variant="error" title="Connection Failed">
            Unable to connect to the email server. Please check your credentials.
          </Alert>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Dismissible</h2>
        <div className="space-y-3 max-w-xl">
          {!dismissedAlerts.includes('info') && (
            <Alert
              variant="info"
              title="Tip"
              dismissible
              onDismiss={() => handleDismiss('info')}
            >
              Click the X to dismiss this alert.
            </Alert>
          )}
          {!dismissedAlerts.includes('success') && (
            <Alert
              variant="success"
              dismissible
              onDismiss={() => handleDismiss('success')}
            >
              Operation completed. You can dismiss this message.
            </Alert>
          )}
          {!dismissedAlerts.includes('warning') && (
            <Alert
              variant="warning"
              title="Heads up"
              dismissible
              onDismiss={() => handleDismiss('warning')}
            >
              This warning can be dismissed when you're ready.
            </Alert>
          )}
          {dismissedAlerts.length > 0 && (
            <button
              onClick={resetAlerts}
              className="text-sm text-navy-500 hover:text-navy-700"
            >
              Reset dismissed alerts
            </button>
          )}
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Real-world Examples</h2>
        <div className="space-y-3 max-w-xl">
          <Alert variant="info" title="Email Sync in Progress">
            We're importing your emails. This may take a few minutes depending on
            the size of your mailbox.
          </Alert>
          <Alert variant="warning" title="Incomplete Profile">
            Your profile is 70% complete. Add a profile photo and bio to help
            others recognize you.
          </Alert>
          <Alert variant="error" title="Authentication Error">
            Your session has expired. Please sign in again to continue using the
            application.
          </Alert>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Alert } from '@gp/ui'

// Basic usage
<Alert variant="info">
  Informational message
</Alert>

// With title
<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>

// Dismissible
<Alert
  variant="warning"
  title="Warning"
  dismissible
  onDismiss={() => setShowAlert(false)}
>
  This can be dismissed.
</Alert>`}</pre>
      </section>
    </div>
  )
}
