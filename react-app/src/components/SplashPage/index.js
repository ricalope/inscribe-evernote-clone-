import React, { useState, useEffect } from 'react';
import LoginFormModal from '../LoginForm/LoginFormModal';
import SignupFormModal from '../SignupForm/SignupFormModal';
import logo from '../../assets/quill.png';
import ghLogo from '../../assets/github-logo.png';
import promoImage from '../../assets/promo-image.png';
import quoteImage from '../../assets/quote-blue.png';
import { quotesArray } from '../../utils/quotes';
import './SplashPage.css'

function SplashPage() {

    const [ showLogin, setShowLogin ] = useState(false);
    const [ showSignup, setShowSignup ] = useState(false);
    const [ scrolled, setScrolled ] = useState(false);

    useEffect(() => {
        if (showLogin || showSignup) {
            document.body.style.overflow = 'hidden'
        }
        window.onscroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true)
            }
            else {
                setScrolled(false)
            }
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [ showLogin, showSignup ])

    return (
        <div className="sp-main-container">
            <div className={scrolled ? "sp-header shadow" : "sp-header"}>
                <div className="logo-image-header">
                    <div>
                        <img src={logo} className="quill-img" alt="quill writing" />
                    </div>
                    <div>
                        <h2 id="title-header">Inscribe</h2>
                    </div>
                </div>
                <div className="sp-login-div">
                    <button
                        className="sp-login-button"
                        onClick={() => setShowLogin(true)}
                    >
                        Log in
                    </button>
                </div>
            </div>
            <div className="sp-main-body-top">
                <h1 id="promo-header">Tame your work, organize your life.</h1>
                <h3 id="promo-sub">Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</h3>
                <button className="sp-body-signup" onClick={() => setShowSignup(true)}>Sign up for free</button>
                <button className="sp-body-login" onClick={() => setShowLogin(true)}>Already have an account? Log in</button>
                {showLogin && <LoginFormModal showLogin={showLogin} setShowLogin={setShowLogin} />}
                {showSignup && <SignupFormModal showSignup={showSignup} setShowSignup={setShowSignup} />}
            </div>
            <div className="sp-main-body-middle">
                <div className="sp-middle-img">
                    <img
                        className="promo-img"
                        src={promoImage}
                        alt="laptop-promo"
                    />
                </div>
                <div className="sp-middle-text">
                    <div className="sp text first">
                        <h3 className="sp-h3">WORK ANYWHERE</h3>
                        <h5 className="sp-h5">Keep important info handy—your notes sync automatically to all your devices.</h5>
                    </div>
                    <div className="sp text second">
                        <h3 className="sp-h3">REMEMBER EVERYTHING</h3>
                        <h5 className="sp-h5">Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</h5>
                    </div>
                    <div className="sp text third">
                        <h3 className="sp-h3">TURN TO-DO INTO DONE</h3>
                        <h5 className="sp-h5">Bring your notes, tasks, and schedules together to get things done more easily.</h5>
                    </div>
                    <div className="sp text fourth">
                        <h3 className="sp-h3">FIND THINGS FAST</h3>
                        <h5 className="sp-h5">Get what you need, when you need it with powerful, flexible search capabilities.</h5>
                    </div>
                </div>
            </div>
            <div className="quotes-outer-container">
                <div className="quotes-inner-container">
                    <div className="quote-image">
                        <img id="quote-marks" src={quoteImage} alt="quotation-marks" />
                    </div>
                    <div className="quotes-content">
                        <h3 id="q-text">"{quotesArray[ 0 ]?.quote}"</h3>
                    </div>
                    <div className="quotes-author">
                        <h4 id="q-author">-{quotesArray[ 0 ]?.author}</h4>
                    </div>
                </div>
            </div>
            <div className="sp-footer">
                <div className="logo-image-header" id="footer">
                    <div>
                        <img src={logo} className="quill-img" alt="quill writing" />
                    </div>
                    <div>
                        <h2 id="title-header">Inscribe</h2>
                    </div>
                </div>
                <div className="sp-footer-links">
                    <a className="creator-links" href="https://github.com/ricalope">
                        <div className="footer-image">
                            <img id="gh-icon" src={ghLogo} alt="github logo" />
                            <h5>Ricardo Lopez</h5>
                        </div>
                    </a>
                </div>
            </div>
            <div id="sp-sf-outer">
                <div className="sp-sub-footer">
                    <div className="sp-sf-copyright">
                        <p className="legal">© 2022 Inscribe Corporation. All rights reserved.</p>
                    </div>
                    <div className="sf-legal">
                        <p className="legal">Merry Christmas</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
