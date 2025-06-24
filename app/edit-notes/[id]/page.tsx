"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getNote, updateNote } from "@/lib/api"
import NotesForm from "@/components/note-form"

export default function EditNotePage({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
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
          alert("Failed to load note.")
          router.push("/")
        })
    }
  }, [id, router])

  const handleSubmit = async (updatedNote: any) => {
    try {
      await updateNote(Number(id), updatedNote)
      router.push("/")
    } catch (error) {
      alert("Failed to update note.")
    }
  }

  if (loading) return <div className="p-10">Loading...</div>

  return (
    <main>
      <div className="py-[30px] px-[40px]">
        <div className="flex pl-[30px] justify-between items-center">
          <h1 className="text-[40px] font-bold">Edit Notes</h1>
        </div>
        <div>
          <NotesForm note={note} onSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  )
}
