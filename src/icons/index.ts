/**
 * Semantic icon re-exports from lucide-react
 *
 * Icons are named by their intended use case, not their visual appearance.
 * This provides a consistent vocabulary across consuming apps.
 */

import {
  // Design system component icons
  Loader2,
  TrendingUp,
  TrendingDown,
  Info,
  AlertTriangle,
  X,
  CheckCircle,
  XCircle,
  // Common app-level icons
  Search,
  User,
  Mail,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Menu,
  LogOut,
  Terminal,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Trash2,
  Plus,
  Settings,
  Edit2,
  Eye,
  EyeOff,
  Download,
  Upload,
  Clock,
  Filter,
  MoreVertical,
  MoreHorizontal,
} from 'lucide-react'

// ============================================
// Design System Component Icons
// These are used internally by @gp/ui components
// ============================================

/** Spinner icon for loading states (Button, async operations) */
export { Loader2 as SpinnerIcon }

/** Trend indicators for StatCard */
export { TrendingUp as TrendUpIcon, TrendingDown as TrendDownIcon }

/** Alert variant icons */
export {
  Info as InfoIcon,
  AlertTriangle as WarningIcon,
  XCircle as ErrorIcon,
  CheckCircle as SuccessIcon,
}

/** Dismiss/close icon for modals, alerts, dialogs */
export { X as CloseIcon }

// ============================================
// Navigation Icons
// ============================================

/** Back navigation (Layout back button) */
export { ArrowLeft as BackIcon }

/** Forward navigation */
export { ArrowRight as ForwardIcon }

/** Expandable section indicator */
export { ChevronRight as ExpandIcon }

/** Collapsible section indicator */
export { ChevronDown as CollapseIcon }

/** External link indicator */
export { ExternalLink as ExternalLinkIcon }

// ============================================
// Action Icons
// ============================================

/** Hamburger menu trigger */
export { Menu as MenuIcon }

/** Search input icon */
export { Search as SearchIcon }

/** Sign out / logout action */
export { LogOut as LogoutIcon }

/** Refresh / reload action */
export { RefreshCw as RefreshIcon }

/** Copy to clipboard action */
export { Copy as CopyIcon }

/** Confirm / checkmark action */
export { Check as CheckIcon }

/** Delete / remove action */
export { Trash2 as DeleteIcon }

/** Add / create new action */
export { Plus as AddIcon }

/** Edit / modify action */
export { Edit2 as EditIcon }

/** Download action */
export { Download as DownloadIcon }

/** Upload action */
export { Upload as UploadIcon }

/** Filter / sort action */
export { Filter as FilterIcon }

/** More options (vertical dots) */
export { MoreVertical as MoreIcon }

/** More options (horizontal dots) */
export { MoreHorizontal as MoreHorizontalIcon }

// ============================================
// Entity / Object Icons
// ============================================

/** User / profile / account */
export { User as UserIcon }

/** Email / message */
export { Mail as EmailIcon }

/** Date / schedule */
export { Calendar as CalendarIcon }

/** Time / duration */
export { Clock as TimeIcon }

/** Settings / preferences / configuration */
export { Settings as SettingsIcon }

/** Terminal / console / CLI */
export { Terminal as TerminalIcon }

// ============================================
// Visibility Icons
// ============================================

/** Show / visible state */
export { Eye as ShowIcon }

/** Hide / hidden state */
export { EyeOff as HideIcon }

// ============================================
// Type Export
// ============================================

export type { LucideIcon } from 'lucide-react'
