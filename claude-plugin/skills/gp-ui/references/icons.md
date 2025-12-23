# @gp/ui Icon Reference

Semantic icon re-exports from lucide-react. Named by purpose, not appearance.

## Import

```tsx
import { SearchIcon, UserIcon, DeleteIcon } from '@gp/ui';
```

---

## Design System Icons

Used internally by @gp/ui components.

| Export | Lucide Icon | Purpose |
|--------|-------------|---------|
| `SpinnerIcon` | Loader2 | Loading states in buttons, async operations |
| `TrendUpIcon` | TrendingUp | StatCard positive trend |
| `TrendDownIcon` | TrendingDown | StatCard negative trend |
| `InfoIcon` | Info | Info alerts |
| `WarningIcon` | AlertTriangle | Warning alerts |
| `ErrorIcon` | XCircle | Error alerts |
| `SuccessIcon` | CheckCircle | Success alerts |
| `CloseIcon` | X | Dismissing modals, alerts, dialogs |

---

## Navigation Icons

| Export | Lucide Icon | Purpose |
|--------|-------------|---------|
| `BackIcon` | ArrowLeft | Back navigation |
| `ForwardIcon` | ArrowRight | Forward navigation |
| `ExpandIcon` | ChevronRight | Expandable section indicator |
| `CollapseIcon` | ChevronDown | Collapsible section indicator |
| `ExternalLinkIcon` | ExternalLink | External link indicator |

---

## Action Icons

| Export | Lucide Icon | Purpose |
|--------|-------------|---------|
| `MenuIcon` | Menu | Hamburger menu |
| `SearchIcon` | Search | Search input |
| `LogoutIcon` | LogOut | Sign out action |
| `RefreshIcon` | RefreshCw | Reload action |
| `CopyIcon` | Copy | Copy to clipboard |
| `CheckIcon` | Check | Confirm/checkmark |
| `DeleteIcon` | Trash2 | Delete/remove |
| `AddIcon` | Plus | Create new |
| `EditIcon` | Edit2 | Modify action |
| `DownloadIcon` | Download | Download file |
| `UploadIcon` | Upload | Upload file |
| `FilterIcon` | Filter | Filter/sort action |
| `MoreIcon` | MoreVertical | More options (vertical dots) |
| `MoreHorizontalIcon` | MoreHorizontal | More options (horizontal dots) |

---

## Entity/Object Icons

| Export | Lucide Icon | Purpose |
|--------|-------------|---------|
| `UserIcon` | User | User profile/account |
| `EmailIcon` | Mail | Email/message |
| `CalendarIcon` | Calendar | Date/schedule |
| `TimeIcon` | Clock | Time/duration |
| `SettingsIcon` | Settings | Settings/configuration |
| `TerminalIcon` | Terminal | CLI/console |

---

## Visibility Icons

| Export | Lucide Icon | Purpose |
|--------|-------------|---------|
| `ShowIcon` | Eye | Visible state |
| `HideIcon` | EyeOff | Hidden state |

---

## Brand Icons

| Export | Type | Purpose |
|--------|------|---------|
| `GoogleIcon` | Custom SVG function | Google "G" for OAuth buttons |

Usage:
```tsx
import { GoogleIcon } from '@gp/ui';
<Button icon={<GoogleIcon />}>Sign in with Google</Button>
```

---

## Type Export

```tsx
import type { LucideIcon } from '@gp/ui';
```

Use for typing icon props:
```tsx
interface Props {
  icon?: LucideIcon;
}
```

---

## Sizing Guidelines

| Context | Size | Tailwind |
|---------|------|----------|
| Button icons | 16-18px | `size-4` to `size-[18px]` |
| Input prefix/suffix | 16px | `size-4` |
| Navigation | 20px | `size-5` |
| Standalone | 20-24px | `size-5` to `size-6` |

Icons auto-size based on component (Button, Badge, etc.). For standalone usage:

```tsx
<SearchIcon className="size-5 text-gray-500" />
```

---

## Adding New Icons

If you need an icon not exported by @gp/ui, import directly from lucide-react:

```tsx
import { Zap } from 'lucide-react';
```

Consider requesting addition to @gp/ui if the icon has broad use cases.
