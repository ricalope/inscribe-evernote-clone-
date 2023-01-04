import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { addNoteThunk } from '../../store/note';
import ghLogo from '../../assets/github-logo.png';
import logo from '../../assets/quill.png';
import LogoutModal from '../auth/LogoutModal';
import AddNotebookModal from '../AddNotebook/AddNotebookModal';
import './Navigation.css'

const NavBar = () => {
    const dispatch = useDispatch();

    const [ theme, setTheme ] = useState('light');
    const [ showNew, setShowNew ] = useState(false);
    const [ showLogout, setShowLogout ] = useState(false);

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        document.body.className = theme
    }, [ theme ])

    const themeChange = () => {
        if (theme === 'light') {
            setTheme('dark')
            return
        }
        setTheme('light')
        return
    }

    const createNote = async () => {
        const data = {
            title: 'Untitled'
        }
        await dispatch(addNoteThunk(data))
    }

    const lengthCheck = (data, len) => {
        if (data.length > len) {
            return `${data.slice(0,len)}...`
        }
        return data
    }

    return (
        <div className="nav-main-container">
            <div className="nav-top-third">
                <div className="top-top">
                    <div className="site-logo">
                        <div className="in-logo">
                            <img id="i-logo" src={logo} alt="quill logo" />
                        </div>
                        <div className="site-name">
                            <h2 id="h2-site">Inscribe</h2>
                        </div>
                    </div>
                    <div className="nav-top-container">
                        <div className="nav-light-switch">
                            <button id="light-switch" onClick={themeChange}>
                                {theme === 'light' ? '🌚' : '🌞'}
                            </button>
                        </div>
                        <div className="nav-email-dropdown">
                            <div className="caret-dd">
                                {lengthCheck(sessionUser.email, 20)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="new-nav-btns">
                    <Link exact="true" to="/notes" id="create-note" onClick={createNote}>
                        <div className="new-note">
                            <div>
                                + New Note
                            </div>
                        </div>
                    </Link>
                    <div className="n-nb-nav">
                        <button className="new-note book" onClick={() => setShowNew(true)}>
                            + New Notebook
                        </button>
                        {showNew && (
                            <AddNotebookModal
                                showNew={showNew}
                                setShowNew={setShowNew}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="nav-middle-links">
                <div className="navlink">
                    <NavLink to="/" exact={true} activeClassName="active" className="nl-link">
                        <div className="nav-inner">
                            <div><i className="fa-solid fa-house fa-match" /></div>
                            <p className="p-link">Home</p>
                        </div>
                    </NavLink>
                </div>
                <div className="navlink">
                    <NavLink to="/coming-soon" exact={true} activeClassName="active" className="nl-link">
                        <div className="nav-inner">
                            <div><i className="fa-solid fa-star fa-match" /></div>
                            <p className="p-link one">Shortcuts</p>
                        </div>
                    </NavLink>
                </div>
                <div className="navlink">
                    <NavLink to="/notes" exact={true} activeClassName="active" className="nl-link">
                        <div className="nav-inner">
                            <div><i className="fa-solid fa-note-sticky fa-match" /></div>
                            <p className="p-link">Notes</p>
                        </div>
                    </NavLink>
                </div>
                <div className="navlink">
                    <NavLink to="/coming-soon" exact={true} activeClassName="active" className="nl-link">
                        <div className="nav-inner">
                            <div><i className="fa-solid fa-circle-check fa-match" /></div>
                            <p className="p-link">Tasks</p>
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="nav-middle-second">
                <div className="navlink">
                    <NavLink to="/notebooks" exact={true} activeClassName="active" className="nl-link">
                        <div className="nav-inner">
                            <div><i className="fa-solid fa-book fa-match" /></div>
                            <p className="p-link">Notebooks</p>
                        </div>
                    </NavLink>
                </div>
                <div className="navlink">
                    <NavLink to="/coming-soon" exact={true} activeClassName="active" className="nl-link">
                        <div className="nav-inner">
                            <div><i className="fa-solid fa-hashtag fa-match" /></div>
                            <p className="p-link">Tags</p>
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="nav-footer">
                <div className="logout-btn">
                    <button onClick={() => setShowLogout(true)} id="lo-btn">
                        <i className="fa-solid fa-arrow-right-from-bracket" />
                    </button>
                    {showLogout && (
                        <LogoutModal
                            showLogout={showLogout}
                            setShowLogout={setShowLogout}
                        />
                    )}
                </div>
                <div className="github-logo">
                    <a className="creator-links" href="https://github.com/ricalope">
                        <img id="gh-logo" src={ghLogo} alt="github logo" />
                    </a>
                </div>
                <div className="dev-name">
                    <h5>Ricardo Lopez</h5>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
