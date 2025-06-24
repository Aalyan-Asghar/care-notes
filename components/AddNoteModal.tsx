"use client"

import { useRouter } from "next/navigation"
import { addNote } from "@/lib/api"
import NotesForm from "./note-form"
import './Dialog.css'

export default function AddNoteModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      await addNote(data)
      onClose()
      router.refresh()
    } catch {
      alert("Failed to add note.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2 className="text-[24px] font-bold mb-4">Add Note</h2>
        <NotesForm onSubmit={handleSubmit} onClose={onClose} />
      </div>
    </div>
  )
}
