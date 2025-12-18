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
// Brand Icons
// ============================================

/** Google "G" icon for OAuth buttons */
export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

// ============================================
// Type Export
// ============================================

export type { LucideIcon } from 'lucide-react'
