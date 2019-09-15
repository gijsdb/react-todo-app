import React, { Component } from 'react';
import './App.css';
import Note from './components/note/note.js';
import NoteForm from './components/noteForm/noteform.js';
import { DB_CONFIG } from './config/config.js';
import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    //initializes with config
    
    if (!firebase.apps.length) {
      try {
        this.app = firebase.initializeApp(DB_CONFIG)
      } catch (err) {
          console.error("Firebase initialization error raised" , err.stack)
      }
  }
    
    // Set up react state of component
    this.state = {
      notes: [],
    }
  }

  
  componentDidMount() {
    //reference database on firebase
    this.db = this.app.database().ref().child('notes');
    const previousNotes = this.state.notes;

    //data snapshot 
    this.db.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

    this.setState({
      notes: previousNotes,
    })

    this.db.on('child_removed', snap => {
      for(var i=0; i<previousNotes.length;i++) {
        if(previousNotes[i].id === snap.key) {
          previousNotes.splice(i,1);
        }
      }
    })

    })
  }


  addNote(note) {
    //push onto firebase array
    this.db.push().set({noteContent: note});
  }

  removeNote(noteId) {
    this.db.child(noteId).remove();
    this.forceUpdate();
  }

  render(){
  return (
    <div className="notesContainer">
      <div className="notesHeader">
        <h1>To do list</h1>
      </div>

      <div className="notesBody">
        {
          // Map each notes item 
          this.state.notes.map((note) => {
            return (
              <div className="noteBorder">
              <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote={this.removeNote} />
              </div>
            )
          }
        )}
      </div>

      <div className="notesFooter">
        <NoteForm addNote={this.addNote}/>
      </div>
    </div>
  );
  }
}

export default App;


