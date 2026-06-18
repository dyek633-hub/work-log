import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary-600 text-white border border-primary-600',
    'hover:bg-primary-700 hover:border-primary-700',
    'active:bg-primary-800',
    'disabled:bg-primary-300 disabled:border-primary-300',
    'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  ].join(' '),
  secondary: [
    'bg-neutral-100 text-neutral-800 border border-neutral-200',
    'hover:bg-neutral-200',
    'active:bg-neutral-300',
    'disabled:bg-neutral-100 disabled:text-neutral-400',
    'focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2',
  ].join(' '),
  outline: [
    'bg-transparent text-primary-600 border border-primary-600',
    'hover:bg-primary-50',
    'active:bg-primary-100',
    'disabled:text-primary-300 disabled:border-primary-300',
    'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  ].join(' '),
  ghost: [
    'bg-transparent text-neutral-700 border border-transparent',
    'hover:bg-neutral-100',
    'active:bg-neutral-200',
    'disabled:text-neutral-400',
    'focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2',
  ].join(' '),
  destructive: [
    'bg-error-600 text-white border border-error-600',
    'hover:bg-error-700 hover:border-error-700',
    'active:bg-error-800',
    'disabled:bg-error-300 disabled:border-error-300',
    'focus-visible:ring-2 focus-visible:ring-error-500 focus-visible:ring-offset-2',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-6 text-base gap-2 rounded-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium',
        'transition-colors duration-150 cursor-pointer',
        'focus:outline-none focus-visible:outline-none',
        'disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-0.5 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  )
}
