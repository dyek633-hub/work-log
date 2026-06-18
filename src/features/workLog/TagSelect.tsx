import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Badge } from '../../components/Badge'

export interface TagSelectProps {
  availableTags: string[]
  selectedTags: string[]
  onChange: (tags: string[]) => void
  onManageTags?: () => void
}

export function TagSelect({ availableTags, selectedTags, onChange, onManageTags }: TagSelectProps) {
  const inputId = useId()
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const normalizedInput = inputValue.trim()
  const filtered = availableTags.filter(
    (tag) =>
      !selectedTags.includes(tag) &&
      tag.toLowerCase().includes(normalizedInput.toLowerCase()),
  )
  const hasExactMatch = availableTags.some(
    (tag) => tag.toLowerCase() === normalizedInput.toLowerCase(),
  )
  const canCreate = normalizedInput.length > 0 && !hasExactMatch

  function addTag(tag: string) {
    const trimmed = tag.trim()
    if (!trimmed || selectedTags.includes(trimmed)) return
    onChange([...selectedTags, trimmed])
    setInputValue('')
  }

  function removeTag(tag: string) {
    onChange(selectedTags.filter((t) => t !== tag))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered.length > 0) {
        addTag(filtered[0])
      } else if (canCreate) {
        addTag(normalizedInput)
      }
    } else if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
          태그
        </label>
        {onManageTags && (
          <button
            type="button"
            onClick={onManageTags}
            className="text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            태그 관리
          </button>
        )}
      </div>
      <div ref={containerRef} className="relative">
        <div className="flex flex-wrap items-center gap-1.5 w-full min-h-10 rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="primary" size="sm">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-primary-700 hover:text-primary-900"
                aria-label={`${tag} 제거`}
              >
                ×
              </button>
            </Badge>
          ))}
          <input
            id={inputId}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 100)}
            onKeyDown={handleKeyDown}
            placeholder={selectedTags.length === 0 ? '태그를 선택하거나 입력하세요' : ''}
            className="flex-1 min-w-[80px] text-sm outline-none placeholder:text-neutral-400"
          />
        </div>

        {isOpen && (filtered.length > 0 || canCreate) && (
          <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-md">
            {filtered.map((tag) => (
              <button
                key={tag}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => addTag(tag)}
                className="block w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
              >
                {tag}
              </button>
            ))}
            {canCreate && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => addTag(normalizedInput)}
                className="block w-full px-3 py-2 text-left text-sm text-primary-600 hover:bg-primary-50"
              >
                새 태그 추가: "{normalizedInput}"
              </button>
            )}
          </div>
        )}
      </div>
      <p className="mt-1.5 text-xs text-neutral-500">태그별로 포트폴리오가 자동으로 묶입니다.</p>
    </div>
  )
}
