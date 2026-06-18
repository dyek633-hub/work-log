import type { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  bordered?: boolean
  hoverable?: boolean
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
}

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

export function Card({
  children,
  padding = 'md',
  shadow = 'sm',
  bordered = true,
  hoverable = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={[
        'bg-white rounded-xl',
        paddingClasses[padding],
        shadowClasses[shadow],
        bordered ? 'border border-neutral-200' : '',
        hoverable ? 'transition-shadow duration-200 hover:shadow-md cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', ...props }: CardHeaderProps) {
  return (
    <div
      {...props}
      className={['pb-3 border-b border-neutral-200 mb-4', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}

export function CardBody({ children, className = '', ...props }: CardBodyProps) {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '', ...props }: CardFooterProps) {
  return (
    <div
      {...props}
      className={['pt-3 border-t border-neutral-200 mt-4', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}
