import { useEffect, useState } from 'react'
import { WorkLogForm } from './features/workLog/WorkLogForm'
import { WorkLogList } from './features/workLog/WorkLogList'
import { TrashSection } from './features/workLog/TrashSection'
import { TagManagerModal } from './features/workLog/TagManagerModal'
import { EditEntryModal } from './features/workLog/EditEntryModal'
import { PortfolioView } from './features/portfolio/PortfolioView'
import { useLocalStorageState } from './lib/storage'
import type { WorkLogEntry } from './types/workLog'

type Tab = 'log' | 'portfolio'

function App() {
  const [entries, setEntries] = useLocalStorageState<WorkLogEntry[]>('work-log-entries', [])
  const [tags, setTags] = useLocalStorageState<string[]>('work-log-tags', [])
  const [tab, setTab] = useState<Tab>('log')
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false)
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null)

  const activeEntries = entries.filter((entry) => !entry.deletedAt)
  const trashedEntries = entries.filter((entry) => entry.deletedAt)
  const editingEntry = entries.find((entry) => entry.id === editingEntryId) ?? null

  useEffect(() => {
    const tagsFromEntries = entries.flatMap((entry) => entry.tags)
    const missing = tagsFromEntries.filter((tag) => !tags.includes(tag))
    if (missing.length > 0) {
      setTags((prev) => Array.from(new Set([...prev, ...missing])))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleAdd(entry: WorkLogEntry) {
    setEntries((prev) => [...prev, entry])
    setTags((prev) => Array.from(new Set([...prev, ...entry.tags])))
  }

  function handleRenameTag(oldName: string, newName: string) {
    setTags((prev) => Array.from(new Set(prev.map((tag) => (tag === oldName ? newName : tag)))))
    setEntries((prev) =>
      prev.map((entry) =>
        entry.tags.includes(oldName)
          ? { ...entry, tags: Array.from(new Set(entry.tags.map((tag) => (tag === oldName ? newName : tag)))) }
          : entry,
      ),
    )
  }

  function handleDeleteTag(name: string) {
    setTags((prev) => prev.filter((tag) => tag !== name))
    setEntries((prev) =>
      prev.map((entry) =>
        entry.tags.includes(name) ? { ...entry, tags: entry.tags.filter((tag) => tag !== name) } : entry,
      ),
    )
  }

  function handleUpdate(updated: WorkLogEntry) {
    setEntries((prev) => prev.map((entry) => (entry.id === updated.id ? updated : entry)))
    setTags((prev) => Array.from(new Set([...prev, ...updated.tags])))
  }

  function handleSoftDelete(id: string) {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, deletedAt: Date.now() } : entry)),
    )
  }

  function handleRestore(id: string) {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, deletedAt: undefined } : entry)),
    )
  }

  function handlePermanentDelete(id: string) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">업무 일지</h1>
          <p className="text-neutral-500">매일 업무를 기록하면 태그별로 포트폴리오가 자동으로 정리됩니다.</p>
        </div>

        <div className="flex gap-1 mb-8 border-b border-neutral-200">
          <button
            onClick={() => setTab('log')}
            className={[
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px',
              tab === 'log'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700',
            ].join(' ')}
          >
            기록
          </button>
          <button
            onClick={() => setTab('portfolio')}
            className={[
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px',
              tab === 'portfolio'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700',
            ].join(' ')}
          >
            PF
          </button>
        </div>

        {tab === 'log' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-8">
              <WorkLogForm
                availableTags={tags}
                onAdd={handleAdd}
                onManageTags={() => setIsTagManagerOpen(true)}
              />
              <WorkLogList entries={activeEntries} onEdit={setEditingEntryId} onDelete={handleSoftDelete} />
            </div>
            <TrashSection
              entries={trashedEntries}
              onRestore={handleRestore}
              onPermanentDelete={handlePermanentDelete}
            />
            <TagManagerModal
              open={isTagManagerOpen}
              onClose={() => setIsTagManagerOpen(false)}
              tags={tags}
              onRename={handleRenameTag}
              onDelete={handleDeleteTag}
            />
            {editingEntry && (
              <EditEntryModal
                key={editingEntry.id}
                entry={editingEntry}
                availableTags={tags}
                onClose={() => setEditingEntryId(null)}
                onSave={(updated) => {
                  handleUpdate(updated)
                  setEditingEntryId(null)
                }}
              />
            )}
          </>
        ) : (
          <PortfolioView entries={activeEntries} />
        )}
      </div>
    </div>
  )
}

export default App
