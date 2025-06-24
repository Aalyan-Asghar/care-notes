"use client"

import { useEffect, useState } from "react"
import { getNote, deleteNote } from "@/lib/api"
import NotesData from "@/components/note-data"
import "@/components/Dialog.css"

export default function DeleteNoteModal({
    noteId,
    isOpen,
    onClose,
}: {
    noteId: number | null
    isOpen: boolean
    onClose: () => void
}) {
    const [note, setNote] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isOpen && noteId != null) {
            setLoading(true)
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
    }, [noteId, isOpen, onClose])

    const handleDelete = async () => {
        await deleteNote(noteId!)
        onClose()
        window.location.reload() // Or call router.refresh() if using router
    }

    if (!isOpen) return null
    if (loading) return <div className="dialog-overlay"><div className="dialog-box">Loading...</div></div>

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <h2 className="text-xl font-bold mb-4">Delete Note</h2>
                <NotesData note={note} />
                <div className="mt-4 flex gap-4">
                    <button className="bg-red-600 text-white cursor-pointer p-4 rounded" onClick={handleDelete}>
                        Confirm Delete
                    </button>
                    <button className="bg-gray-500 text-white cursor-pointer p-4 rounded" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
