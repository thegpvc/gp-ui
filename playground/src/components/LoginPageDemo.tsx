import { LoginPage } from '@gp/ui'

export function LoginPageDemo() {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ height: '500px' }}>
      <LoginPage
        title="Demo App"
        subtitle="Testing the login page"
        onLogin={() => alert('Login clicked')}
        helperText="Sign in with your GP email"
        className="min-h-full"
      />
    </div>
  )
}
