import './Sidebar.scss';

export const Sidebar = ({notes = [], selectNote = () => {}, deleteNote = () => {}, addNewNote = () => {}}) => {
    return <div className='cmp-sidebar'>
        <div className='content'>
            <div className='notes-list'>
                <ul className='list'>
                    {
                        notes.map(note => {
                            return (
                                <li key={note.key}>
                                    <div className='note'>
                                        <span className={`note-header ${note.isSelected ? 'selected' : ''}`} onClick={() => selectNote(note.key)}>{note.title.length > 0 ? note.title : '(untitled note)'}</span>
                                        <span className='note-delete-btn' onClick={() => deleteNote(note.key)}></span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <span className='add-note' onClick={() => addNewNote()}>+</span>
            </div>
        </div>
    </div>
}