---
description: Plan and execute migration to @gp/ui design system components
---

You are helping migrate an existing React application to use TheGP's @gp/ui design system.

## Your Task

1. **Audit Current UI**: Analyze the existing codebase to identify:
   - Custom button, card, input, modal, dropdown, and other UI components
   - Inline Tailwind styling that could use @gp/ui components
   - Color values that should use @gp/ui theme tokens
   - Custom icons that could be replaced with @gp/ui icon exports

2. **Create Migration Plan**: Generate a detailed plan that includes:
   - Which components to migrate first (prioritize commonly used components)
   - Mapping of current components to @gp/ui equivalents
   - Required peer dependencies to install
   - Tailwind v4 integration steps
   - Theme token replacements (colors, spacing, typography)
   - Breaking changes and compatibility concerns

3. **Implementation Strategy**:
   - Start with setup (install dependencies, configure Tailwind v4)
   - Migrate one component type at a time
   - Update imports and component usage
   - Replace custom styling with @gp/ui variants and props
   - Test after each migration step

4. **Generate Migration Checklist**: Create a task list using TodoWrite to track:
   - Setup and configuration
   - Each component type to migrate
   - Testing and verification steps

## Key Considerations

- Maintain existing functionality during migration
- Use @gp/ui variants (primary, secondary, ghost, etc.) instead of custom styles
- Replace hard-coded colors with theme tokens (orange-500, navy-900, etc.)
- Leverage compound components (Card.Header, Dropdown.Item, etc.)
- Ensure accessibility is maintained or improved

## Resources Available

Load the gp-ui skill for detailed component APIs, setup instructions, and migration examples.
