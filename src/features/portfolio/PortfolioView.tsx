import { Badge } from '../../components/Badge'
import { Card, CardBody, CardHeader } from '../../components/Card'
import { groupEntriesByTag } from '../../lib/portfolio'
import type { WorkLogEntry } from '../../types/workLog'

export interface PortfolioViewProps {
  entries: WorkLogEntry[]
}

export function PortfolioView({ entries }: PortfolioViewProps) {
  const groups = groupEntriesByTag(entries)

  if (groups.length === 0) {
    return (
      <p className="text-sm text-neutral-500 text-center py-8">
        태그가 달린 업무 기록이 없습니다. 기록을 추가하면 태그별로 자동 정리됩니다.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {groups.map((group) => (
        <Card key={group.tag}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-neutral-900">{group.tag}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="neutral" size="sm">
                  {group.startDate} ~ {group.endDate}
                </Badge>
                <Badge variant="primary" size="sm">{group.count}건</Badge>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <ul className="flex flex-col gap-2.5">
              {group.entries.map((entry) => (
                <li key={entry.id} className="flex flex-col gap-0.5 text-sm text-neutral-700">
                  <span className="text-neutral-400">{entry.date}</span>
                  <span className="whitespace-pre-wrap">{entry.content}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
