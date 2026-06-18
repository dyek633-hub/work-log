import { useState } from 'react'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import type { WorkLogEntry } from '../../types/workLog'
import { ConfirmDialog } from './ConfirmDialog'

export interface TrashSectionProps {
  entries: WorkLogEntry[]
  onRestore: (id: string) => void
  onPermanentDelete: (id: string) => void
}

export function TrashSection({ entries, onRestore, onPermanentDelete }: TrashSectionProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const sorted = [...entries].sort((a, b) => (b.deletedAt ?? 0) - (a.deletedAt ?? 0))

  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
        휴지통
        <Badge variant="neutral" size="sm">{entries.length}</Badge>
      </h2>

      {sorted.length === 0 ? (
        <p className="text-sm text-neutral-400">휴지통이 비어 있습니다.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((entry) => (
            <Card key={entry.id} padding="sm" className="bg-neutral-50">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-xs font-medium text-neutral-400 mb-1.5">{entry.date}</p>
                  <p className="text-sm text-neutral-500 whitespace-pre-wrap mb-2">{entry.content}</p>
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onRestore(entry.id)}>
                    복원
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmId(entry.id)}>
                    영구 삭제
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmId !== null}
        title="영구 삭제"
        description="이 기록을 완전히 삭제할까요? 이 작업은 되돌릴 수 없습니다."
        confirmLabel="영구 삭제"
        destructive
        onCancel={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId) onPermanentDelete(confirmId)
          setConfirmId(null)
        }}
      />
    </div>
  )
}
