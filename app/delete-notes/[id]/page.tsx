"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getNote, deleteNote } from "@/lib/api"
import NotesData from "@/components/note-data"

export default function DeleteNotePage({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { id } = useParams()
  const router = useRouter()
  const [note, setNote] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      getNote(Number(id))
        .then((data) => {
          setNote(data)
          setLoading(false)
        })
        .catch(() => {
          alert("Note not found.")
          router.push("/")
        })
    }
  }, [id, router])

  const handleDelete = async () => {
    await deleteNote(Number(id))
    router.push("/")
  }

  const handleCancel = () => {
    router.push("/")
  }

  if (loading) return <div className="p-10">Loading...</div>

  return (
    <main>
      <div className="py-[30px] px-[40px]">
        <div className="flex pl-[30px] justify-between items-center">
          <h1 className="text-[40px] font-bold">Delete Note</h1>
        </div>
        <div className="p-[30px]">
          <NotesData note={note} />
          <div className="mt-[20px] flex gap-[10px]">
            <button
              onClick={handleDelete}
              className="p-[20px] bg-red-500 hover:bg-red-700 text-white rounded-lg"
            >
              Confirm Delete
            </button>
            <button
              onClick={handleCancel}
              className="p-[20px] bg-gray-400 hover:bg-black text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
