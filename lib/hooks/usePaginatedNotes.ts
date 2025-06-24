// lib/hooks/usePaginatedNotes.ts
import { useEffect, useState } from "react"
import { getNotes, getNotesCount, Note } from "../api"

export default function usePaginatedNotes(limit = 50) {
  const [notes, setNotes] = useState<Note[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    getNotesCount().then(setTotalCount)
  }, [])

  useEffect(() => {
    setLoading(true)
    getNotes(limit, page * limit)
      .then(data => setNotes(prev => [...prev, ...data]))
      .finally(() => setLoading(false))
  }, [page])

  const loadMore = () => setPage(p => p + 1)

  return { notes, loadMore, loading, totalCount }
}
