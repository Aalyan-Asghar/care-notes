"use client"

import { useState, useEffect } from "react"

export default function NotesForm({
  note,
  onSubmit,
  onClose
}: {
  note?: any
  onSubmit?: (note: any) => void
  onClose?: () => void
}) {
  type NoteFormData = {
    id?: number
    name: string
    nurseName: string
    description: string
    notes: string
    date: string
  }

  const [form, setForm] = useState<NoteFormData>({
    name: "",
    nurseName: "",
    description: "",
    notes: "",
    date: new Date().toISOString(),
  })


  useEffect(() => {
    if (note) {
      setForm({
        name: note.name || "",
        nurseName: note.nurseName || "",
        description: note.description || "",
        notes: note.notes || "",
        date: note.date || new Date().toISOString(),
        id: note.id,
      })
    }
  }, [note])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (onSubmit) onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="p-[30px]">
      <div className="mb-4 flex flex-col">
        <label className="text-[20px] mb-[10px] font-bold">Resident Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="p-[20px] bg-[#e1e1e1] rounded-lg"
          required
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="text-[20px] mb-[10px] font-bold">Nurse Name</label>
        <input
          type="text"
          name="nurseName"
          value={form.nurseName}
          onChange={handleChange}
          className="p-[20px] bg-[#e1e1e1] rounded-lg"
          required
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="text-[20px] mb-[10px] font-bold">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="p-[20px] bg-[#e1e1e1] rounded-lg"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="text-[20px] mb-[10px] font-bold">Care Note</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          className="p-[20px] bg-[#e1e1e1] rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="p-[20px] bg-[#a1a1a1] hover:bg-black cursor-pointer text-white rounded-lg mr-[10px]"
      >
        Submit
      </button>
      <button
        onClick={onClose}
        className="p-[20px] bg-[#a1a1a1] hover:bg-green-500 cursor-pointer text-white rounded-lg"
      >
        Close
      </button>
    </form>
  )
}
