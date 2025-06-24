// components/ViewNoteModal.tsx
"use client"

import { useEffect, useState } from "react"
import { getNote } from "@/lib/api"
import NotesData from "@/components/note-data"
import "@/components/Dialog.css"

export default function ViewNoteModal({
  isOpen,
  onClose,
  noteId,
}: {
  isOpen: boolean
  onClose: () => void
  noteId: number | null
}) {
  const [note, setNote] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (noteId) {
      getNote(noteId)
        .then((data) => {
          setNote(data)
          setLoading(false)
        })
        .catch(() => {
          alert("Note not found.")
          onClose()
        })
    }
  }, [noteId])

  if (!isOpen) return null
  if (loading) return <div className="dialog-overlay"><div className="dialog-box p-10">Loading...</div></div>

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h1 className="text-[30px] font-bold mb-4">View Note</h1>
        <NotesData note={note} />
        <button
          onClick={onClose}
          className="mt-6 p-3 bg-gray-500 hover:bg-black cursor-pointer text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}
