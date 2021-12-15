import React from 'react';

import './IndexPage.css';

function IndexPage() {

    return (
        <div className="index-page">

            {/* HEADER */}

            <div className="header">
                <div className="header-container">
                    <div className="header-logo">Job Offers</div>
                    <ul className="header-nav">
                        <li className="header-nav-link">Sign Up</li>
                        <li className="header-nav-link">Log In</li>
                    </ul>
                </div>
            </div>

            {/* SHOWCASE */}

            <div className="showcase">
                <h2 className="showcase-slogan">Join us today here in <span>-Job Offers-</span></h2>
                <p className="showcase-description">To stay up with the latest job offers, by thousands of recruiters!</p>
            </div>

            {/* LOG IN - SIGN IN MODALS */}

            <div className="login-modal modal">
                <div className="form-container">
                    <form>
                        <h2 className="form-title">Log in</h2>
                        <label htmlFor="login_email_input" className="form-label">Email</label>
                        <input type="email" className="form-input" placeholder='Type your email here..' />

                        <label htmlFor="login_password_input" className="form-label">Password</label>
                        <input type="password" className="form-input" placeholder='Type your password here..' />

                        <input type="submit" className="form-input form-submit" value="Log in" />

                        <p className="new-account">Create new account here</p>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default IndexPage;
