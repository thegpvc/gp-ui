import type { ReactNode } from 'react'
import { Loader2, ExternalLink } from 'lucide-react'
import { Button } from '../Button'
import { GPLogo } from '../Logo'
import { GoogleIcon } from '../../icons'
import { cn } from '../../utils/cn'

export interface LoginPageBanner {
  message: string
  link?: {
    text: string
    url: string
  }
}

export interface LoginPageProps {
  title: string
  subtitle?: string
  onLogin: () => void
  loginButtonIcon?: ReactNode
  loginButtonText?: string
  className?: string
  loading?: boolean
  banner?: LoginPageBanner
  helperText?: string
  children?: ReactNode
}

export function LoginPage({
  title,
  subtitle,
  onLogin,
  loginButtonIcon,
  loginButtonText = 'Continue with Google',
  className,
  loading = false,
  banner,
  helperText,
  children,
}: LoginPageProps) {
  const defaultIcon = (
    <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
      <GoogleIcon />
    </span>
  )

  if (loading) {
    return (
      <div className={cn('min-h-screen bg-navy-900 flex items-center justify-center', className)}>
        <Loader2 className="w-5 h-5 text-orange-500 animate-spin" aria-label="Loading" />
      </div>
    )
  }

  return (
    <div className={cn('min-h-screen bg-navy-900 flex flex-col', className)}>
      {banner && (
        <div className="bg-orange-500 text-white text-center py-1.5 text-xs font-medium flex items-center justify-center gap-2">
          <span>{banner.message}</span>
          {banner.link && (
            <a
              href={banner.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline hover:text-orange-100 transition-colors"
            >
              {banner.link.text}
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          )}
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GPLogo />
          </div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="text-navy-400 text-sm mt-1">{subtitle}</p>
          )}
        </div>

        <Button
          onClick={onLogin}
          variant="primary"
          icon={loginButtonIcon ?? defaultIcon}
          className="gap-2.5 pl-4 pr-5"
        >
          {loginButtonText}
        </Button>

        {helperText && (
          <p className="mt-4 text-navy-500 text-xs">{helperText}</p>
        )}

        {children}
      </div>
    </div>
  )
}
