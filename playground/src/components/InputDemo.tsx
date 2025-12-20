import { useState } from 'react'
import { Input, TextArea, Button } from '@gp/ui'
import {
  Search,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
} from 'lucide-react'

export function InputDemo() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [autoResizeText, setAutoResizeText] = useState('')

  return (
    <div className="space-y-8">
      {/* Section 1: Basic Input Types */}
      <section className="demo-section">
        <h2 className="demo-section-title">Basic Input Types</h2>
        <div className="space-y-4">
          <Input type="text" placeholder="Text input" />
          <Input type="email" placeholder="Email input" />
          <Input type="password" placeholder="Password input" />
          <Input type="number" placeholder="Number input" />
          <Input type="search" placeholder="Search input" />
          <Input type="date" placeholder="Date input" />
          <Input type="time" placeholder="Time input" />
        </div>
      </section>

      {/* Section 2: Input Variants */}
      <section className="demo-section">
        <h2 className="demo-section-title">Input Variants</h2>
        <div className="space-y-4">
          <Input
            variant="default"
            placeholder="Default variant"
            helperText="This is the default input style"
          />
          <Input
            variant="error"
            placeholder="Error variant"
            helperText="This field has an error"
          />
          <Input
            variant="success"
            placeholder="Success variant"
            helperText="This field is valid"
          />
        </div>
      </section>

      {/* Section 3: Input Sizes */}
      <section className="demo-section">
        <h2 className="demo-section-title">Input Sizes</h2>
        <div className="space-y-4">
          <Input size="sm" placeholder="Small input" />
          <Input size="md" placeholder="Medium input (default)" />
          <Input size="lg" placeholder="Large input" />
        </div>
      </section>

      {/* Section 4: With Labels - Above */}
      <section className="demo-section">
        <h2 className="demo-section-title">With Labels - Above</h2>
        <p className="text-sm text-navy-500 mb-4">
          Vertical layout, most common for forms
        </p>
        <div className="space-y-4">
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            helperText="Enter your first and last name"
          />
        </div>
      </section>

      {/* Section 5: With Labels - Before */}
      <section className="demo-section">
        <h2 className="demo-section-title">With Labels - Before</h2>
        <p className="text-sm text-navy-500 mb-4">
          Horizontal layout, good for inline forms
        </p>
        <div className="space-y-4">
          <Input
            label="Username"
            labelVariant="before"
            type="text"
            placeholder="Enter username"
          />
          <Input
            label="Age"
            labelVariant="before"
            type="number"
            placeholder="25"
          />
        </div>
      </section>

      {/* Section 6: With Labels - After */}
      <section className="demo-section">
        <h2 className="demo-section-title">With Labels - After</h2>
        <p className="text-sm text-navy-500 mb-4">Checkbox-style layout</p>
        <div className="space-y-4">
          <Input
            label="I agree to terms"
            labelVariant="after"
            type="checkbox"
          />
          <Input
            label="Subscribe to newsletter"
            labelVariant="after"
            type="checkbox"
          />
        </div>
      </section>

      {/* Section 7: With Icons */}
      <section className="demo-section">
        <h2 className="demo-section-title">With Icons</h2>
        <div className="space-y-4">
          <Input
            placeholder="Search..."
            prefixIcon={<Search className="w-4 h-4" />}
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            suffixIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-navy-600 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
          />
          <Input
            type="email"
            placeholder="Email"
            prefixIcon={<Mail className="w-4 h-4" />}
            suffixIcon={<span className="text-xs">@example.com</span>}
          />
        </div>
      </section>

      {/* Section 8: With Helper Text */}
      <section className="demo-section">
        <h2 className="demo-section-title">With Helper Text</h2>
        <div className="space-y-4">
          <Input
            label="Username"
            placeholder="Choose a username"
            helperText="This will be your public display name"
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            variant="error"
            helperText="Please enter a valid email address"
          />
          <Input
            label="Website"
            type="url"
            placeholder="https://example.com"
            variant="success"
            helperText="URL format is correct"
          />
        </div>
      </section>

      {/* Section 9: TextArea Examples */}
      <section className="demo-section">
        <h2 className="demo-section-title">TextArea Examples</h2>
        <div className="space-y-4">
          <TextArea label="Description" placeholder="Enter description..." />
          <TextArea
            label="Small TextArea"
            size="sm"
            placeholder="Compact size..."
          />
          <TextArea
            label="Large TextArea"
            size="lg"
            placeholder="Large size..."
          />
          <TextArea
            label="Auto-Resize TextArea"
            placeholder="This textarea grows as you type..."
            autoResize
            value={autoResizeText}
            onChange={(e) => setAutoResizeText(e.target.value)}
            helperText={`${autoResizeText.length} characters`}
          />
          <TextArea
            label="Comments"
            placeholder="Leave a comment..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            helperText={`${message.length}/500 characters`}
            maxLength={500}
          />
        </div>
      </section>

      {/* Section 10: Disabled States */}
      <section className="demo-section">
        <h2 className="demo-section-title">Disabled States</h2>
        <div className="space-y-4">
          <Input
            label="Disabled Input"
            placeholder="This input is disabled"
            disabled
          />
          <Input
            label="Disabled with Value"
            value="Cannot edit this"
            disabled
          />
          <TextArea
            label="Disabled TextArea"
            placeholder="This textarea is disabled"
            disabled
          />
        </div>
      </section>

      {/* Section 11: Real-World Examples */}
      <section className="demo-section">
        <h2 className="demo-section-title">Real-World Examples</h2>

        <div className="space-y-8">
          {/* Login Form */}
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">
              Login Form
            </h3>
            <form className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                prefixIcon={<Mail className="w-4 h-4" />}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                prefixIcon={<Lock className="w-4 h-4" />}
                required
              />
              <Button variant="primary" className="w-full">
                Sign In
              </Button>
            </form>
          </div>

          {/* Contact Form */}
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">
              Contact Form
            </h3>
            <form className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                prefixIcon={<User className="w-4 h-4" />}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                prefixIcon={<Mail className="w-4 h-4" />}
                required
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                prefixIcon={<Phone className="w-4 h-4" />}
              />
              <TextArea
                label="Message"
                placeholder="Your message..."
                required
                rows={4}
              />
              <Button variant="primary" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Search Form */}
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">
              Search with Filters
            </h3>
            <form className="space-y-4">
              <Input
                type="search"
                placeholder="Search..."
                prefixIcon={<Search className="w-4 h-4" />}
                size="lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="From Date"
                  type="date"
                  size="sm"
                  prefixIcon={<Calendar className="w-4 h-4" />}
                />
                <Input
                  label="To Date"
                  type="date"
                  size="sm"
                  prefixIcon={<Calendar className="w-4 h-4" />}
                />
              </div>
              <Button variant="secondary" className="w-full">
                Apply Filters
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Section 12: Usage Examples */}
      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import { Input, TextArea } from '@gp/ui'
import { Search, Mail } from 'lucide-react'

// Basic text input
<Input
  type="text"
  placeholder="Enter text..."
/>

// With label and helper text
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
  required
/>

// With prefix icon
<Input
  placeholder="Search..."
  prefixIcon={<Search className="w-4 h-4" />}
/>

// Error state
<Input
  label="Password"
  type="password"
  variant="error"
  helperText="Password must be at least 8 characters"
/>

// Different sizes
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />

// Label variants
<Input label="Above" labelVariant="above" />
<Input label="Before" labelVariant="before" />
<Input label="After" labelVariant="after" type="checkbox" />

// TextArea
<TextArea
  label="Message"
  placeholder="Your message..."
  rows={4}
/>

// Auto-resize TextArea
<TextArea
  label="Comments"
  placeholder="Type here..."
  autoResize
  value={text}
  onChange={(e) => setText(e.target.value)}
/>`}</pre>
      </section>
    </div>
  )
}
