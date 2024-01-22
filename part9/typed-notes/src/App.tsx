import { useState, useEffect } from "react";
import { Note } from "./types";
import { getAllNotes, createNote } from './noteService';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    getAllNotes().then(data => {
      setNotes(data)
    })
  }, [])

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createNote({ content: newNote }).then(data => {
      setNotes(notes.concat(data))
    })

    setNewNote('')
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={noteCreation}>
        <input 
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note => 
          <li key={note.id}>{note.content}</li>
        )}
      </ul>
    </div>
  )
}

export default App;