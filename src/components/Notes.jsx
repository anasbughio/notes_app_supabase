import { useEffect, useState } from "react"
import { supabase } from "../supabase"

const Notes = ()=>{
    const [notes,setNotes] = useState([]);
    const [title,setTitle]=useState('');
    const [content,setContent]= useState('');
    const [editingId,setEditingId]= useState(null);

const fetchNotes = async()=>{
    const {data,error} = await supabase.from('notes').select('*')
    .order('created_at',{ascending:false});

    if(!error) setNotes(data);
}

const addNote = async()=>{
    if(!title || !content) return alert('Title and Content are required');
 const {error} = await supabase.from('notes').insert({title,content});
if(!error){
    setTitle('');
    setContent('');
    fetchNotes();
}
}


const updateNote = async()=>{
 const {error}  = await supabase.from('notes').update({title,content}).eq('id',editingId);

 if(!error){
    setTitle('');
    setContent('');
    setEditingId(null);
    fetchNotes();
 }
    
}

const deleteNote = async(id)=>{
    await supabase.from('notes').delete().eq('id',id);
    fetchNotes();

}

const logout = async()=>{
    await supabase.auth.signOut();
}

useEffect(()=>{
    fetchNotes();
},[]);

return(
    <>
     <div style={{ padding: '20px' }}>
      <h2>My Notes</h2>

      <button onClick={logout}>Logout</button>

      <hr />

      {/* Add / Edit Note */}
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      {editingId ? (
        <button onClick={updateNote}>Update Note</button>
      ) : (
        <button onClick={addNote}>Add Note</button>
      )}

      <hr />

      {/* Show Notes */}
      {notes.map(note => (
        <div key={note.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>

          <button
            onClick={() => {
              setEditingId(note.id)
              setTitle(note.title)
              setContent(note.content)
            }}
          >
            Edit
          </button>

          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
    
    </>
)

}

export default Notes;
