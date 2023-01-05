import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneNotebookThunk } from '../../store/notebook';
import { getAllNotesThunk, addNoteThunk } from '../../store/note';
import { DarkModeContext } from '../../context/ThemeContext';
import NavBar from '../Navigation/NavBar';
import EditNote from '../EditNote/index';
import DeleteNotebookModal from '../DeleteNotebook/DeleteNotebookModal';
import EditNotebookModal from '../EditNotebook/EditNotebookModal';


function OneNotebook() {
    const dispatch = useDispatch();
    const { notebookId } = useParams();

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ noteId, setNoteId ] = useState(0);
    const [ showDelete, setShowDelete ] = useState(false);
    const [ showEdit, setShowEdit ] = useState(false);

    const notebookObj = useSelector(state => state.notebooks.oneNotebook);
    const notesObj = useSelector(state => Object.values(state.notes.allNotes));
    const notebook = Object.values(notebookObj);
    const notes = notesObj.filter(n => n.notebook_id === +notebookId);
    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        (async () => {
            await dispatch(getOneNotebookThunk(notebookId))
            await dispatch(getAllNotesThunk())
        })()
        if (notes.length > 0) {
            setTitle(notes[ 0 ].title)
            setBody(notes[ 0 ].body)
            setNoteId(notes[ 0 ].id)
        }
    }, [ dispatch, notes.length, notebookId ])

    const setFields = data => {
        setNoteId(data.id)
        setTitle(data.title)
        setBody(data.body)
    }

    const newNote = async () => {
        const data = {
            notebookId,
            title: 'Untitled'
        }
        await dispatch(addNoteThunk(data))
    }

    notes.sort((a, b) => {
        if (new Date(a.created_at) < new Date(b.created_at)) {
            return 1
        } else if (new Date(a.created_at) > new Date(b.created_at)) {
            return -1
        }
        return 0
    })

    const lengthCheck = (data, len) => {
        if (data.length > len) {
            return `${data.slice(0,len)}...`
        }
        return data
    }

    return (
        <>
            <NavBar />
            <div className="outer-notes">
                <div className={darkMode ? 'notes-main-container dark' : 'notes-main-container light'}>
                    <div className={darkMode ? 'one-header-note-nb dark' : 'one-header-note-nb light'}>
                        <div className="one-nb-header">
                            <div id="n-nb-logo">
                                <i className="fa-solid fa-file-lines" />
                                <h1 id="nb-h1">{notebook.map(nb => lengthCheck(nb.title, 16))}</h1>
                            </div>
                            <div id="n-count">
                                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                            </div>
                        </div>
                        <div className="nb-delete-modal">
                            <div
                                className={darkMode ? 'newnote-nb dark' : 'newnote-nb light'}
                                onClick={newNote}
                                >
                                + Add Note
                            </div>
                            <button
                                className={darkMode ? 'nb-del-mod dark' : 'nb-del-mod light'}
                                onClick={() => setShowDelete(true)}>
                                Delete Notebook
                            </button>
                            {showDelete && (
                                <DeleteNotebookModal
                                    showDelete={showDelete}
                                    setShowDelete={setShowDelete}
                                />
                            )}
                            <button
                                className={darkMode ? 'nb-ed-mod dark' : 'nb-ed-mod light'}
                                onClick={() => setShowEdit(true)}>
                                Edit Notebook
                            </button>
                            {showEdit && (
                                <EditNotebookModal
                                    showEdit={showEdit}
                                    setShowEdit={setShowEdit}
                                />
                            )}
                        </div>
                    </div>
                    <div className="notes-inner-container">
                        <div className={darkMode ? 'column-notes dark' : 'column-notes light'}>
                            {notes.map((note, idx) => (
                                <div key={idx}
                                    className="notes-card"
                                    onClick={() => setFields(note)}
                                >
                                    <div className="notes-title">
                                        {note.title}
                                    </div>
                                    <div className="notes-content">
                                        {note.body}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div >
                <div className="edit-column-notes">
                    <EditNote
                        noteId={noteId}
                        title={title}
                        body={body}
                        setTitle={setTitle}
                        setBody={setBody}
                    />
                </div>
            </div>
        </>
    )
}

export default OneNotebook;
