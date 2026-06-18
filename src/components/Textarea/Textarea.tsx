import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'

export type TextareaSize = 'sm' | 'md' | 'lg'
export type TextareaStatus = 'default' | 'error' | 'success'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  errorMessage?: string
  size?: TextareaSize
  status?: TextareaStatus
  fullWidth?: boolean
}

const sizeClasses: Record<TextareaSize, string> = {
  sm: 'text-sm px-3 py-2',
  md: 'text-sm px-3 py-2.5',
  lg: 'text-base px-4 py-3',
}

const statusClasses: Record<TextareaStatus, string> = {
  default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
  error: 'border-error-500 focus:border-error-500 focus:ring-error-500',
  success: 'border-success-500 focus:border-success-500 focus:ring-success-500',
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    helperText,
    errorMessage,
    size = 'md',
    status = 'default',
    fullWidth = false,
    disabled,
    id,
    rows = 4,
    className = '',
    ...props
  },
  ref,
) {
  const resolvedStatus = errorMessage ? 'error' : status
  const textareaId = id ?? (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined)

  return (
    <div className={fullWidth ? 'w-full' : 'inline-flex flex-col'}>
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-1.5 text-sm font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        disabled={disabled}
        rows={rows}
        className={[
          'w-full rounded-lg border bg-white transition-colors resize-y',
          'placeholder:text-neutral-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
          sizeClasses[size],
          statusClasses[resolvedStatus],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
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
