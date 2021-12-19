import React from 'react'

import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="header">
            <div className="header-container">
                <div className="header-logo">Job Offers</div>
                <ul className="header-nav">
                    <Link className="header-nav-link" to="/home/">Home</Link>
                    <Link className="header-nav-link" to="/home/">Profile</Link>
                    <Link className="header-nav-link" to="/home/search">Search</Link>
                    <Link className="header-nav-link" to="/profile/settings">Settings</Link>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
