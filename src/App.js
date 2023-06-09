import './App.scss';
import { Editor } from './Editor/Editor';
import { Sidebar } from './Sidebar/Sidebar';
import { useStateProvider } from './StateProvider/StateProvider';

const App = () => {
  const { provider } = useStateProvider();

  return <div className='cmp-main'>
    {provider.notes.length > 0 && <Sidebar 
      notes={provider.notes} 
      selectNote={provider.selectNote} 
      deleteNote={provider.deleteNote}
      addNewNote={provider.addNewNote}
    />}
    <Editor 
      notes={provider.notes} 
      editNoteTitle={provider.editNoteTitle}
      editNoteContent={provider.editNoteContent}
      addNewNote={provider.addNewNote}
    />
  </div>
}

export default App;
