import type { WorkLogEntry } from '../types/workLog'

export interface PortfolioGroup {
  tag: string
  entries: WorkLogEntry[]
  startDate: string
  endDate: string
  count: number
}

export function groupEntriesByTag(entries: WorkLogEntry[]): PortfolioGroup[] {
  const byTag = new Map<string, WorkLogEntry[]>()

  for (const entry of entries) {
    for (const tag of entry.tags) {
      const list = byTag.get(tag) ?? []
      list.push(entry)
      byTag.set(tag, list)
    }
  }

  return Array.from(byTag.entries())
    .map(([tag, tagEntries]) => {
      const sorted = [...tagEntries].sort((a, b) => a.date.localeCompare(b.date))
      return {
        tag,
        entries: [...tagEntries].sort((a, b) => b.date.localeCompare(a.date)),
        startDate: sorted[0].date,
        endDate: sorted[sorted.length - 1].date,
        count: tagEntries.length,
      }
    })
    .sort((a, b) => b.count - a.count)
}
