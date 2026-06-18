import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  status?: AvatarStatus
  shape?: 'circle' | 'square'
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

const statusSizeClasses: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5 -bottom-px -right-px',
  sm: 'w-2 h-2 -bottom-px -right-px',
  md: 'w-2.5 h-2.5 bottom-0 right-0',
  lg: 'w-3 h-3 bottom-0 right-0',
  xl: 'w-3.5 h-3.5 bottom-0.5 right-0.5',
}

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-success-500',
  offline: 'bg-neutral-400',
  busy: 'bg-error-500',
  away: 'bg-warning-500',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const colorPalette = [
  'bg-primary-100 text-primary-700',
  'bg-success-50 text-success-700',
  'bg-warning-50 text-warning-700',
  'bg-error-50 text-error-700',
  'bg-neutral-200 text-neutral-700',
]

function getColorFromName(name: string): string {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

export function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  status,
  shape = 'circle',
  className = '',
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg'
  const colorClass = name ? getColorFromName(name) : 'bg-neutral-200 text-neutral-600'

  return (
    <div className={['relative inline-flex shrink-0', sizeClasses[size], className].join(' ')}>
      {src && !imgError ? (
        <img
          {...props}
          src={src}
          alt={alt ?? name ?? ''}
          onError={() => setImgError(true)}
          className={['w-full h-full object-cover', shapeClass].join(' ')}
        />
      ) : (
        <span
          className={[
            'flex items-center justify-center w-full h-full font-semibold select-none',
            shapeClass,
            colorClass,
          ].join(' ')}
        >
          {name ? getInitials(name) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-1/2 h-1/2">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          )}
        </span>
      )}
      {status && (
        <span
          className={[
            'absolute rounded-full border-2 border-white',
            statusColors[status],
            statusSizeClasses[size],
          ].join(' ')}
          aria-label={status}
        />
      )}
    </div>
  )
}

export interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  size?: AvatarSize
}

export function AvatarGroup({ children, max, size = 'md' }: AvatarGroupProps) {
  const childArray = Array.isArray(children) ? children : [children]
  const visible = max ? childArray.slice(0, max) : childArray
  const overflow = max ? childArray.length - max : 0

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((child, i) => (
        <div key={i} className="ring-2 ring-white rounded-full">
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={[
            'flex items-center justify-center rounded-full ring-2 ring-white',
            'bg-neutral-200 text-neutral-600 font-semibold',
            sizeClasses[size],
            'text-xs',
          ].join(' ')}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
