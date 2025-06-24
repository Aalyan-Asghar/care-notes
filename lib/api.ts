export type Note = {
  id: number
  name: string
  nurseName: string
  description: string
  notes: string
  date: string
}

const API_BASE = "http://127.0.0.1:8000"

// Fetch all notes
export async function getNotes(limit = 50, offset = 0): Promise<Note[]> {
  const res = await fetch(`${API_BASE}/notes?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error("Failed to fetch notes")
  return res.json()
}

// Add a new note
export async function addNote(note: Omit<Note, "id" | "date">) {
  const fullNote = {
    ...note,
    id: Date.now(), // optional: generate client-side ID
  }

  const res = await fetch("http://127.0.0.1:8000/add_notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fullNote),
  })

  if (!res.ok) throw new Error("Failed to add note")
  return res.json()
}

// View note
export async function getNote(id: number) {
  const res = await fetch(`http://127.0.0.1:8000/notes/${id}`)
  if (!res.ok) throw new Error("Failed to fetch note")
  return res.json()
}

// Update an existing note
export async function updateNote(id: number, data: any) {
  const res = await fetch(`http://127.0.0.1:8000/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update note")
  return res.json()
}

// Delete a note
export async function deleteNote(id: number) {
  const res = await fetch(`http://127.0.0.1:8000/notes/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete note")
  return res.json()
}

// lib/api.ts
export async function getNotesCount(): Promise<number> {
  const res = await fetch("http://127.0.0.1:8000/notes/count")
  if (!res.ok) throw new Error("Failed to fetch note count")
  const data = await res.json()
  console.log("Total no of notes",data.total)
  return data.total
}


