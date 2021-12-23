import React from 'react'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

import "./Profile.css";

function Profile({ loggedUserId }) {

    const EMPTY_AVATAR_URL = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg';
    const API_BASE_URL = 'http://localhost:8081/api';
    let profile_id = useParams().id;
    let navigate = useNavigate();

    // Change page title

    useEffect(() => {
        document.title = "Profile - Mohammed JABRI"
        requestProfileData();
    }, [, loggedUserId]);

    // Use State Hook

    let [currentUser, setCurrentUser] = useState(true);
    let [currentUserName, setCurrentUserName] = useState("Full name");
    let [currentUserRole, setCurrentUserRole] = useState("USER");
    let [currentUserEmail, setCurrentUserEmail] = useState("Email address");
    let [currentUserPhone, setCurrentUserPhone] = useState("Phone number");
    let [currentUserLinkedIn, setCurrentUserLinkedIn] = useState("LinkedIn Profile");
    let [currentUserAge, setCurrentUserAge] = useState("00");
    let [currentUserPictureURL, setCurrentUserPictureURL] = useState("");

    let [fetchId, setFetchId] = useState(loggedUserId);

    // Get user profile data 

    let requestProfileData = () => {

        profile_id != undefined && setFetchId(profile_id);

        if (profile_id == undefined || profile_id == loggedUserId) {
            // Profile for logged user
            setCurrentUser(true);
            getProfileData(loggedUserId);
        } else {
            // Profile for another user
            setCurrentUser(false);
            getProfileData(profile_id);
        }
    }

    let getProfileData = (id) => {
        axios.get(`${API_BASE_URL}/user/id/?id=${id}`, { withCredentials: true })
            .then(res => {

                let status = res.data.status;
                let user = res.data.user;

                if (status == "1") {
                    setCurrentUserName(user.firstName + " " + user.lastName);
                    setCurrentUserRole(user.role);
                    setCurrentUserEmail(user.email);
                    setCurrentUserPhone(user.phone);
                    setCurrentUserLinkedIn(user.linkedInUrl != null ? user.linkedInUrl : "");
                    setCurrentUserAge(getAge(user.birthDate));
                    setCurrentUserPictureURL(user.pictureUrl != null ? user.pictureUrl : "");
                } else {
                    console.log(res.data.error);
                }
            });
    }

    // Request log out

    let request_logout = () => {

        axios.post(`${API_BASE_URL}/user/logout`, {}, { withCredentials: true })
            .then(res => {
                console.log(res.data);
            });

        setTimeout(() => {
            navigate("/");
        }, 1000);

    };

    // Calculate age by birth date

    let getAge = (birth_date_string) => {
        var today = new Date();
        var birthDate = new Date(birth_date_string);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="profile-container">
            <div className="profile-content">

                {/* ABOUT SECTION */}
                <h2 className="profile-title about-title" onClick={() => { console.log(currentUserPictureURL) }}>About user</h2>

                <div className="profile-header">
                    <div className="avatar-box">
                        <img className="user-avatar" src={currentUserPictureURL != "" ? currentUserPictureURL : EMPTY_AVATAR_URL} alt="Profile avatar" />
                    </div>
                    <div className="infos-box">
                        <div className="info-item">
                            <p className="infos-label">Full name</p>
                            <h2 className="infos-data user-full-name">{currentUserName}</h2>
                        </div>
                        <div className="info-item">
                            <p className="infos-label">Role</p>
                            <p className="infos-data">
                                {currentUserRole}
                            </p>
                        </div>
                        <div className="info-item">
                            <p className="infos-label">Email</p>
                            <p className="infos-data">
                                <a href={"mailto:" + currentUserEmail}>{currentUserEmail}</a>
                            </p>
                        </div>
                        <div className="info-item">
                            <p className="infos-label">Phone number</p>
                            <p className="infos-data">
                                <a href={currentUserPhone != "" ? "tel:" + currentUserPhone : "#"}>{currentUserPhone != "" ? currentUserPhone : "NONE"}</a>
                            </p>
                        </div>
                        <div className="info-item">
                            <p className="infos-label">LinkedIn Profile</p>
                            <p className="infos-data">
                                <a href={currentUserLinkedIn != "" ? currentUserLinkedIn : "#"}>{currentUserLinkedIn != "" ? "LinkedIn Profile" : "NONE"}</a>
                            </p>
                        </div>
                        <div className="info-item">
                            <p className="infos-label">Age</p>
                            <p className="infos-data">
                                {currentUserAge}
                            </p>
                        </div>
                    </div>
                </div>

                {/* RESUME SECTION */}
                <h2 className="profile-title">Resume section</h2>

                <div className="profile-resume"></div>


                {/* PROFILE ACTIONS */}
                {
                    currentUser ?
                        < h2 className="profile-title">Profile Settings</h2>
                        : null
                }

                {
                    currentUser ?
                        <div className="profile-settings">
                            {/* Profile Link */}
                            <Link className="profile-settings-action" to="/profile/settings">
                                <FontAwesomeIcon icon={faCog} className="action-icon" />
                                <span>Settings</span>
                            </Link>

                            {/* Log Out Link */}
                            <div className="profile-settings-action danger" onClick={request_logout}>
                                <FontAwesomeIcon icon={faSignOutAlt} className="action-icon" />
                                <span>Log out</span>
                            </div>
                        </div>
                        : null
                }
            </div>
        </div >
    )
}

export default Profile
