// global state provider for all components
// this works like redux but simpler

import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export const useStateProvider = () => {
    // sample for debugging:
    /*
    [
        {
            "key": "787d9f90-b506-49b3-81f2-8dc01d80522f", 
            "title": "New Note", 
            "content": "Test Content", 
            "isSelected": true
        },
        {
            "key": "bfee5ab8-3396-433e-8e41-317c875d8c8f ", 
            "title": "New Note #2", 
            "content": "Test Content #2", 
            "isSelected": false
        }
    ]
    */
    const [notes, setNotesList] = useState(JSON.parse(window.localStorage.getItem('stella-notes') || "[]"));

    const saveNoteProviderState = (newState) => {
        window.localStorage.setItem('stella-notes', JSON.stringify(newState));
        setNotesList(newState);
    }

    // CRUD utils for notes
    const deleteNote = (key) => {
        const filteredNotes = notes.filter(note => note.key !== key);
        window.localStorage.setItem('stella-notes', JSON.stringify(filteredNotes));

        // make sure that at least one item is selected
        if (filteredNotes.length) {
            const updatedNotes = filteredNotes.map((note, idx) => {
                return {
                    ...note,
                    isSelected: filteredNotes.length - idx === 1
                }
            })
            return saveNoteProviderState(updatedNotes);
        }

        return saveNoteProviderState(filteredNotes);
    }

    const selectNote = (key) => {
        const newNotes = notes.map(note => {
            return {
                ...note,
                isSelected: note.key === key
            }
        })
        saveNoteProviderState(newNotes);
    }

    const editNoteTitle = (key, title) => {
        const newNotes = notes.map(note => {
            if (note.key === key) {
                return {
                    ...note, title
                }
            }
            return note;
        })
        saveNoteProviderState(newNotes);
    }

    const editNoteContent = (key, content) => {
        const newNotes = notes.map(note => {
            if (note.key === key) {
                return {
                    ...note, content
                }
            }
            return note;
        })
        saveNoteProviderState(newNotes);
    }

    const addNewNote = () => {
        const key = uuidv4();
        const newNote = {
            key,
            content: "",
            title: "",
            isSelected: true,
            mode: "normal"
        }

        // after creating the note, 
        // select this note then save the provider state

        const updatedNotes = notes.map(note => {
            return {
                ...note,
                isSelected: false
            }
        });
        updatedNotes.push(newNote);
        saveNoteProviderState(updatedNotes);
    }

    const changeNoteMode = (key, mode) => {
        const newNotes = notes.map(note => {
            if (note.key === key) {
                return {
                    ...note, mode
                }
            }
            return note;
        })
        saveNoteProviderState(newNotes);
    }


    return {
        provider: {
            notes,
            setNotesList,
            addNewNote,
            selectNote,
            editNoteTitle,
            editNoteContent,
            changeNoteMode,
            deleteNote
        }
    }
}

