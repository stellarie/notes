import { TextareaMarkdown, TextareaMarkdownRef } from 'textarea-markdown-editor/dist/TextareaMarkdown';
import './Editor.scss';
import { useEffect, useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export const Editor = ({notes = [], editNoteTitle = () => {}, editNoteContent = () => {}, addNewNote = () => {}, changeNoteMode = () => {}}) => {
    const [selectedNote, setSelectedNote] = useState({});

    // local states
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mode, setMode] = useState("normal"); // normal, markdown


    useEffect(() => {
        if (notes.length === 0) return;
        setSelectedNote(() => {
            const selected = notes.filter(note => note.isSelected)[0];
            setTitle(selected.title);
            setContent(selected.content);
            setMode(selected.mode);
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
                                placeholder='Enter your title here'
                            />
                        </div>
                        <div className='input-area'>
                            <div className='display-area'>
                                <textarea
                                    className='content-input'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    onBlur={(e) => onChangeContent(selectedNote.key, e.target.value)}
                                    placeholder='Enter your note here'
                                />
                                <div className={`md-preview ${mode === "markdown" ? "" : "hidden"}`}>
                                    <span className='md-preview-header'>Markdown Preview</span>
                                    <ReactMarkdown className={`md-preview-display`}>
                                        {content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                            <div className='control-area'>
                                <span 
                                    className={`mode-btn ${mode === "normal" ? "selected" : ""}`}
                                    onClick={()=>changeNoteMode(selectedNote.key, "normal")}
                                >
                                    Normal
                                </span>
                                <span 
                                    className={`mode-btn ${mode === "markdown" ? "selected" : ""}`}
                                    onClick={()=>changeNoteMode(selectedNote.key, "markdown")}
                                >
                                    Markdown
                                </span>
                            </div> 
                        </div>
                    </div>
                </>
            }
        </div>
    )
}