// One sinlg note

import React from 'react'
import "../styles/Note.css"



// displays a single note
function Note({note, onDelete}) {
  const formatedDate = new Date(note.created_at).toLocaleDateString("en-US")
  
  return (
    <div  className='note-container'>
      <p className='note-title' >{note.title}</p>
      <p className='note-content' >{note.content}</p>
      <p className='note-date' >{formatedDate}</p>
      <button className='delete-note' onClick={() => onDelete(note.id)} >Delete</button>

    </div>
  )
}

export default Note 