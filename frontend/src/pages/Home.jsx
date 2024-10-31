import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import Note from '../components/Note';
import "../styles/Home.css"

function Home(){
    // send an authorized request to get all the notes needed 
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(()=>{
        getNotes()
    }, [])

    // to send a request that gets all of the already available notes
    const getNotes = () => {
        api.get("/api/notes/")
        .then((res)=>res.data)
        .then((data)=>{
            setNotes(data); 
            console.log(data) 
        }).
        catch((error)=>alert(error))
    }

    // to delete a note
    const deleteNote = ({id}) => {
        api.delete(`/api/notes/delete/${id}/`).then((res)=>{
            if(res.status === 204){ 
                alert("Note was Deleted")
            }else{
                alert("Couldn't delete the note")
            }
        getNotes();

        }).catch((error)=> alert(error))

    }


    const createNote = (e) =>{
        e.preventDefault()
        api.post('/api/notes/', {content, title}).then((res)=>{
            if (res.status == 201){
                alert("Note Successfully created !! ")
            } else{
                alert("Failed to create the note ")
            }
        getNotes();


        }).catch((err) => alert(err))
    }

    return(
        <div>
            <div>
                {/* Displays all of the notes that we have through a different component */}
                <h2>Notes</h2>
                {notes.map((note) => <Note note={note}  onDelete={deleteNote} key={note.id} />)}
            </div>
            <h2>Create a Note</h2>
            <form action="" onSubmit={createNote}>
                <label htmlFor="title">Title: </label>
                <br />
                <input type="text" id='title' required name='title' onChange={(e)=> setTitle(e.target.value)} value={title} />
                <br />
                <label htmlFor="content">Content: </label>
                <br />
                <textarea id='content' required name='content' onChange={(e)=> setContent(e.target.value)} value={content} />
                <br />
                <input type="submit" value="submit" />
            </form>

        </div>
    )
}

export default Home