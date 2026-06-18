import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import type { WorkLogEntry } from '../../types/workLog'
import { TagSelect } from './TagSelect'

function todayDate() {
  return new Date().toISOString().slice(0, 10)
}

export interface WorkLogFormProps {
  availableTags: string[]
  onAdd: (entry: WorkLogEntry) => void
  onManageTags: () => void
}

export function WorkLogForm({ availableTags, onAdd, onManageTags }: WorkLogFormProps) {
  const [date, setDate] = useState(todayDate())
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [contentError, setContentError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!content.trim()) {
      setContentError('내용을 입력해주세요.')
      return
    }

    onAdd({
      id: crypto.randomUUID(),
      date,
      content: content.trim(),
      tags,
      createdAt: Date.now(),
    })

    setContent('')
    setTags([])
    setContentError('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="날짜"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
      />
      <Textarea
        label="오늘 한 일"
        placeholder="오늘 진행한 업무를 기록하세요"
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
          if (contentError) setContentError('')
        }}
        errorMessage={contentError}
        fullWidth
      />
      <TagSelect
        availableTags={availableTags}
        selectedTags={tags}
        onChange={setTags}
        onManageTags={onManageTags}
      />
      <Button type="submit">기록 추가</Button>
    </form>
  )
}
