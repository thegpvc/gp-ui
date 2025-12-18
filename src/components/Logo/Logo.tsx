import { cn } from '../../utils/cn'

export interface GPLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LOGO_SIZES = {
  sm: { width: 24, height: 12 },
  md: { width: 45, height: 22 },
  lg: { width: 91, height: 44 },
}

export function GPLogo({ size = 'lg', className }: GPLogoProps) {
  const { width, height } = LOGO_SIZES[size]
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 91 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-orange-500', className)}
      aria-label="TheGP logo"
    >
      <path
        d="M76.6917 0.0014681L22.5792 0C10.024 0 0 9.85013 0 22C0 34.1499 10.024 44 22.5792 44H44.4738V16.5H19.3532V27.5H33.5258V33C33.5258 33 22.5792 33 22.5777 33C16.0148 33 11.1611 28.0749 11.1611 22C11.1611 15.9251 16.0148 11 22.5777 11C22.5792 11 76.9559 11 76.9588 11C78.6696 11 79.8666 12.1601 79.8666 13.75C79.8666 15.3384 78.6681 16.5 76.9588 16.5C76.9559 16.5 49.9464 16.5 49.9464 16.5L49.9478 44H60.8944V27.5H76.6814C84.818 27.5 91 21.3444 91 13.75C91 6.16 84.818 0.0014681 76.6917 0.0014681Z"
        fill="currentColor"
      />
    </svg>
  )
}
