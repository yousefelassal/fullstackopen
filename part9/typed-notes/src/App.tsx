import { useState } from 'react';

interface Note {
  id: number;
  content: string;
}

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  return null
}

export default App;