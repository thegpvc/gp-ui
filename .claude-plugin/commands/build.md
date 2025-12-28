---
description: Build UI features and components using the @gp/ui design system
---

You are building a new UI feature or component using TheGP's @gp/ui design system.

## Your Task

Build the requested feature using @gp/ui components, following TheGP's design patterns and best practices.

## Guidelines

### Component Selection
- Use @gp/ui components exclusively - never create custom UI components
- Choose appropriate variants: `primary`, `secondary`, `ghost`, `destructive` for buttons
- Use compound components: `Card.Header`, `Card.Body`, `Modal.Content`, `Dropdown.Item`
- Leverage Layout, Sidebar, and LayoutContainer for page structure

### Styling & Theme
- Use @gp/ui theme tokens: `orange-500`, `navy-900`, `cream`, etc.
- Apply spacing: `gap-4`, `p-6`, `space-y-2` following 4px/8px grid
- Use semantic icon names: `SearchIcon`, `UserIcon`, `DeleteIcon`
- Maintain mobile-first responsive design

### Best Practices
- Keep components simple - use composition over configuration
- Pass minimal props - leverage sensible defaults
- Use `cn()` utility for conditional className merging
- Ensure keyboard navigation and WCAG 2.1 AA compliance
- Follow existing patterns in the @gp/ui library

### Common Patterns

**Forms:**
```tsx
<Input label="Email" type="email" />
<TextArea label="Description" autoResize />
```

**Actions:**
```tsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
```

**Containers:**
```tsx
<Card>
  <Card.Header>
    <h2>Title</h2>
    <Badge variant="success">Active</Badge>
  </Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

**Dialogs:**
```tsx
<Modal>
  <Modal.Trigger asChild>
    <Button>Open</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Title</Modal.Title>
    </Modal.Header>
    <Modal.Body>Content</Modal.Body>
    <Modal.Footer>
      <Button>Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

## Resources Available

Load the gp-ui skill for complete component APIs, design tokens, icons, and implementation examples.
