"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getNote } from "@/lib/api"
import NotesData from "@/components/note-data"

export default function ViewNotePage({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
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

  if (loading) return <div className="p-10">Loading...</div>

  return (
    <main>
      <div className="py-[30px] px-[40px]">
        <div className="flex pl-[30px] justify-between items-center">
          <h1 className="text-[40px] font-bold">View Note</h1>
        </div>
        <div className="p-[30px]">
          <NotesData note={note} />
          <button
            onClick={() => router.push("/")}
            className="mt-[20px] p-[20px] bg-gray-500 hover:bg-black text-white rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    </main>
  )
}
