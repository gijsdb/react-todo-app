import React, { Component } from 'react';
import './noteform.css';

export default class NoteForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            newNoteContent: '',
        };

        
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }

    //sets new note content of input box
    handleUserInput(e) {
        this.setState({
            newNoteContent: e.target.value, //value of text input
        })
    }

    writeNote() {
        //call a method that sets notecontent to input from newNoteContent
        
        
        this.props.addNote(this.state.newNoteContent)

        this.setState({
            // empty out input when complete
            newNoteContent: '',
        })
    
    }

    render() {
        return(
            <div>
                <input className="noteInput" placeholder="write a new note" value={this.state.newNoteContent} onChange={this.handleUserInput}/>
                <button className="noteButton" onClick={this.writeNote}>Add</button>
            </div>
        )
    }
}
