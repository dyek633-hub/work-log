import { useState } from 'react'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Modal } from '../../components/Modal'
import { getTagColor } from '../../lib/tagColor'
import { ConfirmDialog } from './ConfirmDialog'

export interface TagManagerModalProps {
  open: boolean
  onClose: () => void
  tags: string[]
  onRename: (oldName: string, newName: string) => void
  onDelete: (name: string) => void
}

export function TagManagerModal({ open, onClose, tags, onRename, onDelete }: TagManagerModalProps) {
  const [editingTag, setEditingTag] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  function startEdit(tag: string) {
    setEditingTag(tag)
    setEditValue(tag)
  }

  function commitEdit() {
    const trimmed = editValue.trim()
    if (editingTag && trimmed && trimmed !== editingTag) {
      onRename(editingTag, trimmed)
    }
    setEditingTag(null)
  }

  return (
    <>
      <Modal open={open} onClose={onClose} title="태그 관리" size="sm">
        {tags.length === 0 ? (
          <p className="text-sm text-neutral-500 py-4 text-center">아직 생성된 태그가 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {tags.map((tag) =>
              editingTag === tag ? (
                <div key={tag} className="flex items-center gap-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitEdit()
                      if (e.key === 'Escape') setEditingTag(null)
                    }}
                    autoFocus
                    fullWidth
                    size="sm"
                  />
                </div>
              ) : (
                <div key={tag} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-neutral-50">
                  <button
                    type="button"
                    onClick={() => startEdit(tag)}
                    className="flex-1 text-left"
                  >
                    <Badge variant={getTagColor(tag)} size="sm">{tag}</Badge>
                  </button>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(tag)}>
                    삭제
                  </Button>
                </div>
              ),
            )}
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="태그 삭제"
        description={`"${deleteTarget}" 태그를 삭제할까요? 이 태그가 달린 모든 기록에서도 함께 제거됩니다.`}
        confirmLabel="삭제"
        destructive
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) onDelete(deleteTarget)
          setDeleteTarget(null)
        }}
      />
    </>
  )
}
