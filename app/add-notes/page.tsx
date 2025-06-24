"use client"

import { useRouter } from "next/navigation"
import { addNote } from "@/lib/api"
import NotesForm from "@/components/note-form"
import '../../components/Dialog.css'

export default function AddNotes({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

  if (!isOpen) return null; // Don't render if not open

  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      await addNote(data)
      router.push("/")
    } catch (err) {
      alert("Failed to submit note.")
    }
  }

  return (
    <main>
      <div className="py-[30px] px-[40px] dialog-overlay">
        <div className="flex pl-[30px] justify-between items-center">
          <h1 className="text-[40px] font-bold">Add Notes</h1>
        </div>
        <div>
          <NotesForm onSubmit={handleSubmit} />
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </main>
  )
}
