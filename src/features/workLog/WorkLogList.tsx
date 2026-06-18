import { useState } from 'react'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import type { WorkLogEntry } from '../../types/workLog'
import { getTagColor } from '../../lib/tagColor'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { ConfirmDialog } from './ConfirmDialog'

export interface WorkLogListProps {
  entries: WorkLogEntry[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function WorkLogList({ entries, onEdit, onDelete }: WorkLogListProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null)

  if (entries.length === 0) {
    return (
      <p className="text-sm text-neutral-500 text-center py-8">
        아직 기록이 없습니다. 왼쪽에서 첫 업무 일지를 추가해보세요.
      </p>
    )
  }

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt)

  return (
    <div className="flex flex-col gap-3">
      {sorted.map((entry) => (
        <Card key={entry.id} padding="sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-xs font-medium text-neutral-500 mb-1.5">{entry.date}</p>
              <p className="text-sm text-neutral-800 whitespace-pre-wrap mb-2">{entry.content}</p>
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant={getTagColor(tag)} size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => onEdit(entry.id)}>
                수정
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmId(entry.id)} aria-label="삭제">
                <TrashIcon />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <ConfirmDialog
        open={confirmId !== null}
        title="기록 삭제"
        description="이 기록을 휴지통으로 이동할까요? 휴지통에서 복원할 수 있습니다."
        confirmLabel="삭제"
        destructive
        onCancel={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId) onDelete(confirmId)
          setConfirmId(null)
        }}
      />
    </div>
  )
}
