---
description: Review code for @thegpvc/ui design system compliance and style guide alignment
---

You are reviewing code to ensure it follows @thegpvc/ui design system patterns and TheGP's style guide, especially for custom code not covered by the component library.

## Your Task

Perform a comprehensive design system compliance review of the code and provide actionable feedback.

## What to Review

### 1. Component Usage
- ✅ Are @thegpvc/ui components used where applicable?
- ✅ Are component variants used correctly (primary, secondary, ghost, destructive)?
- ✅ Are compound components used properly (Card.Header, Modal.Content, etc.)?
- ❌ Flag any custom UI components that duplicate @thegpvc/ui functionality

### 2. Theme Tokens & Colors
- ✅ Colors use theme tokens: `orange-500`, `navy-900`, `cream`, `gray-*`
- ❌ Flag hard-coded hex colors, rgb values, or non-theme colors
- ✅ Verify semantic color usage (orange for primary, navy for text, etc.)
- ❌ Flag use of arbitrary values like `bg-[#ff5500]`

### 3. Spacing & Layout
- ✅ Spacing follows 4px/8px grid: `gap-4`, `p-6`, `space-y-2`, `mb-8`
- ❌ Flag arbitrary spacing like `mt-[13px]` or `gap-[22px]`
- ✅ Container widths use design system: `max-w-xl`, `max-w-4xl`, `max-w-7xl`
- ✅ Proper use of LayoutContainer for consistent page margins

### 4. Typography
- ✅ Text sizes use scale: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, etc.
- ✅ Font weights: `font-medium` (500), `font-semibold` (600), `font-bold` (700)
- ✅ Headings use navy: `text-navy-900`, `text-navy-800`
- ✅ Body text uses gray: `text-gray-600`, `text-gray-700`
- ❌ Flag hard-coded font sizes or weights

### 5. Icons
- ✅ Icons imported from @thegpvc/ui: `import { SearchIcon, UserIcon } from '@thegpvc/ui'`
- ✅ Icon sizing: `className="h-4 w-4"` or `h-5 w-5` (not arbitrary)
- ❌ Flag direct lucide-react imports or custom icon components

### 6. Shadows & Effects
- ✅ Shadow scale: `shadow-sm` (cards), `shadow-md` (dropdowns), `shadow-lg` (modals)
- ✅ Rounded corners: `rounded-lg`, `rounded-md` (not arbitrary values)
- ❌ Flag custom shadow definitions or unusual border-radius values

### 7. Accessibility (WCAG 2.1 AA)
- ✅ Buttons have accessible labels
- ✅ Form inputs have associated labels
- ✅ Interactive elements have focus states
- ✅ Color contrast meets minimum ratios
- ✅ Keyboard navigation is supported
- ❌ Flag missing alt text, labels, or ARIA attributes where needed

### 8. Custom Components (Not in @thegpvc/ui)
For app-specific components that extend beyond the library:
- ✅ Follow established design patterns (compound components, className props)
- ✅ Use `cn()` utility for className merging
- ✅ Accept and forward standard HTML props
- ✅ Use theme tokens exclusively
- ✅ Maintain consistency with @thegpvc/ui component APIs
- ❌ Flag inline styles or component-scoped CSS

### 9. Anti-Patterns
Flag these common issues:
- ❌ Mixing @thegpvc/ui with other UI libraries (MUI, shadcn, etc.)
- ❌ Creating custom variants when @thegpvc/ui variants exist
- ❌ Bypassing theme with arbitrary values
- ❌ Inconsistent spacing patterns
- ❌ Missing responsive design (not mobile-first)
- ❌ Accessibility violations

## Output Format

Provide findings in this structure:

**✅ Strengths**
- List what's done well

**⚠️ Issues Found**
For each issue:
- **Location**: File and line number
- **Issue**: What's wrong
- **Impact**: Why it matters (consistency, accessibility, maintenance)
- **Fix**: Specific code change needed

**📋 Summary**
- Overall compliance score (Excellent / Good / Needs Work / Poor)
- Priority fixes
- Optional improvements

## Example Review Output

```
✅ Strengths
- Proper use of Card compound components
- Theme tokens used consistently for colors
- Good accessibility with ARIA labels

⚠️ Issues Found

1. **Hard-coded colors**
   - Location: components/Dashboard.tsx:45
   - Issue: `className="bg-[#FF5500]"`
   - Impact: Breaks theme consistency, won't adapt to theme changes
   - Fix: Use `bg-orange-500` instead

2. **Custom button component**
   - Location: components/CustomButton.tsx
   - Issue: Duplicates @thegpvc/ui Button functionality
   - Impact: Maintenance burden, inconsistent styling
   - Fix: Replace with `<Button variant="primary">` from @thegpvc/ui

📋 Summary
- Overall: Needs Work
- Priority: Fix hard-coded colors (breaks theming)
- Optional: Consider migrating CustomButton in next sprint
```

## Resources Available

Load the gp-ui skill for complete design tokens, component APIs, and style guide reference.
