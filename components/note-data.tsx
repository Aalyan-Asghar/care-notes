export default function NotesData({ note }: { note: any }) {
  if (!note) return null

  return (
    <div>
      <div className="mb-4 flex flex-col">
        <label className="text-[20px] mb-[10px] font-bold">Resident Name</label>
        <input
          type="text"
          readOnly
          value={note.name}
          className="p-[20px] bg-[#e1e1e1] rounded-lg"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="text-[20px] mb-[10px] font-bold">Nurse Name</label>
        <input
          type="text"
          readOnly
          value={note.nurseName}
          className="p-[20px] bg-[#e1e1e1] rounded-lg"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="text-[20px] mb-[10px] font-bold">Description</label>
        <input
          type="text"
          readOnly
          value={note.description}
          className="p-[20px] bg-[#e1e1e1] rounded-lg"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="text-[20px] mb-[10px] font-bold">Care Note</label>
        <textarea
          readOnly
          value={note.notes}
          rows={4}
          className="p-[20px] bg-[#e1e1e1] rounded-lg"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="text-[20px] mb-[10px] font-bold">Date</label>
        <input
          type="text"
          readOnly
          value={new Date(note.date).toLocaleString()}
          className="p-[20px] bg-[#e1e1e1] rounded-lg"
        />
      </div>
    </div>
  )
}
