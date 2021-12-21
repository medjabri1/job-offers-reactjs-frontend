import React from 'react'

import "./Profile.css";

function Profile() {
    return (
        <div className="profile-container">
            <div className="profile-content">

                {/* ABOUT SECTION */}
                <h2 className="profile-title about-title">About user</h2>
                <div className="profile-header">
                    <div className="avatar-box">
                        <img className="user-avatar" src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg" alt="Profile avatar" />
                    </div>
                    <div className="infos-box">
                        <div className="info-item">
                            <p className="infos-label">Full name</p>
                            <h2 className="infos-data user-full-name">Mohammed JABRI</h2>
                        </div>
                        <div className="info-item">
                            <p className="infos-label">Email</p>
                            <p className="infos-data">
                                <a href="mailto:mohammed.jabri2000@gmail.com">mohammed.jabri2000@gmail.com</a>
                            </p>
                        </div>
                        <div className="info-item">
                            <p className="infos-label">Phone number</p>
                            <p className="infos-data">
                                <a href="tel:+212618259699">+212 618-259-699</a>
                            </p>
                        </div>
                        <div className="info-item">
                            <p className="infos-label">LinkedIn Profile</p>
                            <p className="infos-data">
                                <a href="https://www.linkedin.com/in/mjr-1/">Mohammed JABRI</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* RESUME SECTION */}
                <h2 className="profile-title about-title">Resume section</h2>
            </div>
        </div>
    )
}

export default Profile
