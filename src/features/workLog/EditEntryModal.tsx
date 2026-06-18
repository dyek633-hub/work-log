import { useState } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Modal } from '../../components/Modal'
import { Textarea } from '../../components/Textarea'
import type { WorkLogEntry } from '../../types/workLog'
import { TagSelect } from './TagSelect'

export interface EditEntryModalProps {
  entry: WorkLogEntry
  availableTags: string[]
  onSave: (entry: WorkLogEntry) => void
  onClose: () => void
}

export function EditEntryModal({ entry, availableTags, onSave, onClose }: EditEntryModalProps) {
  const [date, setDate] = useState(entry.date)
  const [content, setContent] = useState(entry.content)
  const [tags, setTags] = useState<string[]>(entry.tags)
  const [contentError, setContentError] = useState('')

  function handleSave() {
    if (!content.trim()) {
      setContentError('내용을 입력해주세요.')
      return
    }
    onSave({ ...entry, date, content: content.trim(), tags })
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="기록 수정"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Input label="날짜" type="date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth />
        <Textarea
          label="오늘 한 일"
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            if (contentError) setContentError('')
          }}
          errorMessage={contentError}
          fullWidth
        />
        <TagSelect availableTags={availableTags} selectedTags={tags} onChange={setTags} />
      </div>
    </Modal>
  )
}
