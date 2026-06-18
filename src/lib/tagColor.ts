import type { BadgeVariant } from '../components/Badge/Badge'

const TAG_COLORS: BadgeVariant[] = ['primary', 'success', 'warning', 'error', 'info']

export function getTagColor(tag: string): BadgeVariant {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0
  }
  return TAG_COLORS[hash % TAG_COLORS.length]
}
