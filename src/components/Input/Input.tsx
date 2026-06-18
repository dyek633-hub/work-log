import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'
export type InputStatus = 'default' | 'error' | 'success'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  errorMessage?: string
  size?: InputSize
  status?: InputStatus
  leftAddon?: ReactNode
  rightAddon?: ReactNode
  fullWidth?: boolean
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-8 text-sm px-3',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
}

const statusClasses: Record<InputStatus, string> = {
  default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
  error: 'border-error-500 focus:border-error-500 focus:ring-error-500',
  success: 'border-success-500 focus:border-success-500 focus:ring-success-500',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helperText,
    errorMessage,
    size = 'md',
    status = 'default',
    leftAddon,
    rightAddon,
    fullWidth = false,
    disabled,
    id,
    className = '',
    ...props
  },
  ref,
) {
  const resolvedStatus = errorMessage ? 'error' : status
  const inputId = id ?? (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined)

  return (
    <div className={fullWidth ? 'w-full' : 'inline-flex flex-col'}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 text-sm font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftAddon && (
          <span className="pointer-events-none absolute left-3 text-neutral-500">
            {leftAddon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={[
            'w-full rounded-lg border bg-white transition-colors',
            'placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
            sizeClasses[size],
            statusClasses[resolvedStatus],
            leftAddon ? 'pl-9' : '',
            rightAddon ? 'pr-9' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {rightAddon && (
          <span className="pointer-events-none absolute right-3 text-neutral-500">
            {rightAddon}
          </span>
        )}
      </div>
      {(errorMessage || helperText) && (
        <p
          className={[
            'mt-1.5 text-xs',
            errorMessage ? 'text-error-600' : 'text-neutral-500',
          ].join(' ')}
        >
          {errorMessage ?? helperText}
        </p>
      )}
    </div>
  )
})
