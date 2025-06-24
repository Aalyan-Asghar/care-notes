// 'use client'

// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { getNotes, Note } from "@/lib/api"
// import AddNotes from "./add-notes/page"
// import ViewNotePage from "./view-notes/[id]/page"
// import EditNotePage from "./edit-notes/[id]/page"
// import DeleteNotePage from "./delete-notes/[id]/page"

// export default function Home() {
//   const [careList, setCareList] = useState<Note[]>([])

//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

//   const handleAddOpenDialog = () => setIsAddDialogOpen(true);
//   const handleAddCloseDialog = () => setIsAddDialogOpen(false);

//   const handleViewOpenDialog = () => setIsViewDialogOpen(true);
//   const handleViewCloseDialog = () => setIsViewDialogOpen(false);

//   const handleEditOpenDialog = () => setIsEditDialogOpen(true);
//   const handleEditCloseDialog = () => setIsEditDialogOpen(false);

//   const handleDeleteOpenDialog = () => setIsDeleteDialogOpen(true);
//   const handleDeleteCloseDialog = () => setIsDeleteDialogOpen(false);



//   useEffect(() => {
//     getNotes()
//       .then(setCareList)
//       .catch(err => console.error("Error fetching notes:", err))
//   }, [])

//   return (
//     <main>
//       <div className="p-[30px]">
//         <div className="mt-[20px] mb-[40px]">
//           <Link href='/add-notes' onClick={handleAddOpenDialog} className="p-[20px] bg-[#a1a1a1] hover:bg-black text-white rounded-lg">
//             + Add Notes
//           </Link>
//         </div>
//         {
//           careList.length === 0 ? (
//             <p className="text-gray-500">No notes found.</p>
//           ) : (
//             careList.map((care) => (
//               <div key={care.id} className="mt-[30px] p-[20px] border border-gray-300 rounded-lg flex justify-between">
//                 <div>
//                   <h2 className="text-[24px] font-bold">{care.name}</h2>
//                   <span className="text-[#b5b5b5]">
//                     {new Date(care.date).toLocaleString()} — {care.nurseName}
//                   </span>
//                   <p className="mt-1">{care.notes}</p>
//                 </div>
//                 <div>
//                   <AddNotes isOpen={isAddDialogOpen} onClose={handleAddCloseDialog} />
//                   <ViewNotePage isOpen={isViewDialogOpen} onClose={handleViewCloseDialog} />
//                   <EditNotePage isOpen={isEditDialogOpen} onClose={handleEditCloseDialog} />
//                   <DeleteNotePage isOpen={isDeleteDialogOpen} onClose={handleDeleteCloseDialog} />
//                 </div>
//                 <div className="flex flex-col gap-[10px]">
//                   <Link href={`/view-notes/${care.id}`} onClick={handleViewOpenDialog} className="p-[10px] bg-[#a1a1a1] hover:bg-green-500 text-white text-center rounded-lg">View</Link>
//                   <Link href={`/edit-notes/${care.id}`} onClick={handleEditOpenDialog} className="p-[10px] bg-[#a1a1a1] hover:bg-blue-500 text-white text-center rounded-lg">Edit</Link>
//                   <Link href={`/delete-notes/${care.id}`} onClick={handleDeleteOpenDialog} className="p-[10px] bg-[#a1a1a1] hover:bg-red-500 text-white text-center rounded-lg">Delete</Link>
//                 </div>
//               </div>
//             ))
//           )
//         }
//       </div>
//     </main>
//   )
// }


// "use client"

// // pages/index.js or another component
// import React, { useState } from 'react';
// import Dialog from '../components/Dialog'; // Adjust path as needed
// // import styles from '../components/Dialog.module.css'; // If using CSS Modules

// export default function HomePage() {
// const [isDialogOpen, setIsDialogOpen] = useState(false);

// const handleOpenDialog = () => setIsDialogOpen(true);
// const handleCloseDialog = () => setIsDialogOpen(false);

//   return (
//     <div>
//       <h1>Welcome to Next.js</h1>
//       <button onClick={handleOpenDialog}>Open Dialog</button>

//       <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
//         <h2>This is a dialogue!</h2>
//         <p>You can put any content here.</p>
//       </Dialog>
//     </div>
//   );
// }



"use client"

import usePaginatedNotes from "@/lib/hooks/usePaginatedNotes"
import AddNoteModal from "@/components/AddNoteModal"
import DeleteNoteModal from "@/components/DeleteNoteModal"
import ViewNoteModal from "@/components/ViewNoteModal"
import EditNoteModal from "@/components/EditNoteModal"
import { useState } from "react"

export default function Home() {
  const { notes, loadMore, loading, totalCount } = usePaginatedNotes()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const openDialog = (type: string, id: number) => {
    console.log(type);
    setSelectedNoteId(id)
    if (type === "delete") setIsDeleteDialogOpen(true)
    else if (type === "view") setIsViewDialogOpen(true)
    else if (type === "edit") setIsEditDialogOpen(true)
  }

  const closeAllDialogs = () => {
    setSelectedNoteId(null)
    setIsDeleteDialogOpen(false)
    setIsViewDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsAddDialogOpen(false)
  }

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="p-4 bg-gray-700 hover:bg-black text-white rounded-lg"
        >
          + Add Note
        </button>

        <p className="text-sm text-gray-500">
          Showing {notes.length} of {totalCount} notes
        </p>
      </div>

      <AddNoteModal isOpen={isAddDialogOpen} onClose={closeAllDialogs} />
      <DeleteNoteModal isOpen={isDeleteDialogOpen} onClose={closeAllDialogs} noteId={selectedNoteId} />
      <ViewNoteModal isOpen={isViewDialogOpen} onClose={closeAllDialogs} noteId={selectedNoteId} />
      <EditNoteModal isOpen={isEditDialogOpen} onClose={closeAllDialogs} noteId={selectedNoteId} />

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes found.</p>
      ) : (
        notes.map(note => (
          <div key={note.id} className="mb-6 p-4 border border-gray-300 rounded-lg flex justify-between">
            <div>
              <h2 className="text-xl font-bold">{note.name}</h2>
              <span className="text-sm text-gray-500">
                {new Date(note.date).toLocaleString()} — {note.nurseName}
              </span>
              <p className="mt-2">{note.notes}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => openDialog("view", note.id)} className="bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded">
                View
              </button>
              <button onClick={() => openDialog("edit", note.id)} className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => openDialog("delete", note.id)} className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <button
        onClick={loadMore}
        disabled={loading}
        className="mt-6 p-3 bg-gray-500 hover:bg-gray-700 text-white rounded"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </main>
  )
}
