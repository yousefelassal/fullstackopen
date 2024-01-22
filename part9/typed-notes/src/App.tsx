import { useState } from 'react';

interface Note {
  id: number;
  content: string;
}

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    {id: 1, content: 'HTML is easy'},
  ]);

  const noteCreation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
    };
    setNotes(notes.concat(noteObject));
    setNewNote('');
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