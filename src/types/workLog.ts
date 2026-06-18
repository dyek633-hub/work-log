export interface WorkLogEntry {
  id: string
  date: string
  content: string
  tags: string[]
  createdAt: number
  deletedAt?: number
}
