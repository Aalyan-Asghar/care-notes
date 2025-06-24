// components/EditNoteModal.tsx
"use client"

import { useEffect, useState } from "react"
import { getNote, updateNote } from "@/lib/api"
import NotesForm from "@/components/note-form"
import "@/components/Dialog.css"

export default function EditNoteModal({
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
          alert("Failed to load note.")
          onClose()
        })
    }
  }, [noteId])

  const handleSubmit = async (updatedNote: any) => {
    try {
      await updateNote(noteId!, updatedNote)
      onClose()
    } catch (error) {
      alert("Failed to update note.")
    }
  }

  if (!isOpen) return null
  if (loading) return <div className="dialog-overlay"><div className="dialog-box p-10">Loading...</div></div>

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h1 className="text-[30px] font-bold mb-4">Edit Note</h1>
        <NotesForm note={note} onSubmit={handleSubmit} onClose={onClose} />
      </div>
    </div>
  )
}
