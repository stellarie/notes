import './Editor.scss';
import { useEffect, useState } from 'react';

export const Editor = ({notes = [], editNoteTitle = () => {}, editNoteContent = () => {}, addNewNote = () => {}}) => {
    const [selectedNote, setSelectedNote] = useState({});

    // local states
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (notes.length === 0) return;
        setSelectedNote(() => {
            const selected = notes.filter(note => note.isSelected)[0];
            setTitle(selected.title);
            setContent(selected.content);
            return selected;
        })
    }, [notes])

    const onChangeTitle = (key, e) => {
        editNoteTitle(key, e);
    }

    const onChangeContent = (key, e) => {
        editNoteContent(key, e);
    }

    return (
        <div className={`cmp-editor ${notes.length === 0 ? 'empty' : ''}`}>
            {
                notes.length === 0 && <div className='no-notes' onClick={() => addNewNote()}>
                    <span className='editor-add-note'>Click here to add a new note!</span>
                </div>
            }
            {
                notes.length > 0 && <>
                    <div className='editor-area'>
                        <div className='title-area'>
                            <input 
                                className='title-input' 
                                type='text' 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={(e) => onChangeTitle(selectedNote.key, e.target.value)}
                            />
                        </div>
                        <div className='input-area'>
                            <textarea
                                className='content-input'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onBlur={(e) => onChangeContent(selectedNote.key, e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='control-area'>

                    </div>
                </>
            }
        </div>
    )
}