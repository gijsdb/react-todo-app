import React, { Component } from 'react';
import './note.css';
import PropTypes from 'prop-types';


export default class Note extends Component {
    constructor(props) {
        super(props);
        this.noteId = props.noteId;
        this.noteContent = props.noteContent;
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
    }

    handleRemoveNote(id){
        this.props.removeNote(id);
    }

    render(props) {
        return (
            <div className="note">
               <span className="closebtn" onClick={()=>this.handleRemoveNote(this.noteId)}>X</span>
               <p className="noteContent">{this.noteContent}</p>
            </div>
        )
    }

}

Note.propTypes = {
    noteContent: PropTypes.string 
}