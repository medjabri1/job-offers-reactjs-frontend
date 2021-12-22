import React from 'react'

import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';

import axios from 'axios'

import "./Profile.css";

function Profile({ loggedUserId }) {

    const API_BASE_URL = 'http://localhost:8081/api';
    const profile_id = useParams().id;

    // Change page title

    useEffect(() => {
        document.title = "Profile - Mohammed JABRI"
        requestProfileData();
    }, [, loggedUserId]);

    // Use State Hook

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
            getProfileData(loggedUserId);
        } else {
            // Profile for another user
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
                    setCurrentUserPhone("STATIC PHONE +212888");
                    setCurrentUserLinkedIn("STATIC LINKEDIN LINK");
                    setCurrentUserAge(getAge(user.birthDate));
                    setCurrentUserPictureURL("STATIC PICTURE LINK");
                } else {
                    console.log(res.data.error);
                }
            });
    }

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
                <h2 className="profile-title about-title">About user</h2>
                <div className="profile-header">
                    <div className="avatar-box">
                        <img className="user-avatar" src="https://avatars.githubusercontent.com/u/58910558?v=4" alt="Profile avatar" />
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
                                <a href={"tel:" + currentUserPhone}>{currentUserPhone}</a>
                            </p>
                        </div>
                        <div className="info-item">
                            <p className="infos-label">LinkedIn Profile</p>
                            <p className="infos-data">
                                <a href={currentUserLinkedIn} target="_blank">LinkedIn profile link</a>
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
                <h2 className="profile-title about-title">Resume section</h2>

                <div className="profile-resume">
                </div>
            </div>
        </div>
    )
}

export default Profile
