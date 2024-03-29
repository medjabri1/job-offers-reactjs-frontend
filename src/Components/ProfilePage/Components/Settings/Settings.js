import React from 'react'

import { useState, useEffect } from 'react';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

import "./Settings.css";

function Settings({ loggedUserId }) {

    // CONSTS
    const API_BASE_URL = 'http://localhost:8081/api';

    // USE STATE HOOK

    // TEMPLATE STATES
    let [displayChangeInfos, setDisplayChangeInfos] = useState(true);
    let [displayChangePassword, setDisplayChangePassword] = useState(true);
    let [displayChangeResume, setDisplayChangeResume] = useState(true);

    // USER DATA STATES

    // FORM STATES
    let [formLastName, setFormLastName] = useState("");
    let [formFirstName, setFormFirstName] = useState("");
    let [formEmail, setFormEmail] = useState("");
    let [formPhone, setFormPhone] = useState("");
    let [formBirthDate, setFormBirthDate] = useState("");
    let [formLinkedInURL, setFormLinkedInURL] = useState("");
    let [formPictureURL, setFormPictureURL] = useState("");

    let [formCurrentPassword, setFormCurrentPassword] = useState("");
    let [formNewPassword, setFormNewPassword] = useState("");
    let [formConfirmPassword, setFormConfirmPassword] = useState("");

    let [formResumeFile, setFormResumeFile] = useState(null);
    let [userResumeLink, setUserResumeLink] = useState("");

    let [formInfosResponse, setFormInfosResponse] = useState("");
    let [formPasswordResponse, setFormPasswordResponse] = useState("");
    let [formResumeResponse, setFormResumeResponse] = useState("");

    // USE EFFECT HOOK
    useEffect(() => {
        document.title = "Profile - Settings"
    }, []);

    useEffect(() => {
        getProfileData(loggedUserId);
    }, [loggedUserId]);

    // GET PROFILE DATA

    let getProfileData = (loggedUserId) => {
        axios.get(`${API_BASE_URL}/user/id/?id=${loggedUserId}`, { withCredentials: true })
            .then(res => {

                let status = res.data.status;
                let user = res.data.user;

                if (status == "1") {
                    setFormLastName(user.lastName);
                    setFormFirstName(user.firstName);
                    setFormEmail(user.email);
                    setFormPhone(user.phone);
                    setFormBirthDate(user.birthDate);
                    setFormLinkedInURL(user.linkedInUrl != null ? user.linkedInUrl : "");
                    setFormPictureURL(user.pictureUrl != null ? user.pictureUrl : "");
                    setUserResumeLink(user.resumePath != null ? API_BASE_URL + "/file/" + user.resumePath : "");
                } else {
                    console.log(res.data.error);
                }
            });
    }

    // Handle forms submit

    let changeInfosSubmit = (e) => {
        e.preventDefault();

        let new_user_data = {
            id: loggedUserId,
            firstName: formFirstName,
            lastName: formLastName,
            email: formEmail,
            phone: formPhone,
            linkedInUrl: formLinkedInURL,
            pictureUrl: formPictureURL,
            birthDate: formBirthDate
        }

        if (formPictureURL.length > 200) {
            setFormInfosResponse("Picture url exceeded length limit (200)");
            return
        }

        requestUpdateInfos(new_user_data);
    }

    let changePasswordSubmit = (e) => {
        e.preventDefault();

        if (formNewPassword == formConfirmPassword) {

            let request_data = {
                id: loggedUserId,
                currentPassword: formCurrentPassword,
                newPassword: formNewPassword
            }

            requestUpdatePassword(request_data);

        } else {
            setFormPasswordResponse("CONFIRMATION DOESN'T MATCH WITH NEW PASSWORD")
        }

    };

    // Request update user infos

    let requestUpdateInfos = (user_data) => {

        axios.put(`${API_BASE_URL}/user/update-data`, { ...user_data, withCredentials: true })
            .then(res => {

                let status = res.data.status;
                let user = res.data.user;

                if (status == "1") {
                    setFormInfosResponse("USER DATA UPDATED");
                    getProfileData(loggedUserId);
                } else {
                    setFormInfosResponse(res.data.error);
                }
            });
    };

    // Request update user password

    let requestUpdatePassword = (request_data) => {

        axios.put(`${API_BASE_URL}/user/update-password`, { ...request_data, withCredentials: true })
            .then(res => {

                let status = res.data.status;
                let user = res.data.user;

                if (status == "1") {
                    setFormPasswordResponse("USER PASSWORD UPDATED");
                    setFormCurrentPassword("");
                    setFormNewPassword("");
                    setFormConfirmPassword("");
                } else {
                    setFormPasswordResponse(res.data.error);
                }
            });
    };

    // REQUEST UPDATE RESUME

    let requestUpdateResume = () => {
        if (formResumeFile != null) {
            // FILE INPUT IS SET

            let request_data = {
                resume: formResumeFile
            };

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            axios.post(`${API_BASE_URL}/user/update-resume?id=${loggedUserId}`, { ...request_data, withCredentials: true }, config)
                .then(res => {

                    let status = res.data.status;

                    if (status == "1") {
                        setFormResumeResponse("RESUME UPDATED SUCCESSFULLY")
                    } else {
                        setFormResumeResponse("ERROR IN RESUME UPDATE OPERATION")
                    }
                });

        } else {
            // FILE INPUT IS NOT SET
            setFormResumeResponse("File input is not set!");
        }
    };

    // REQUEST DELETE RESUME

    let requestDeleteResume = () => {

    };

    return (
        <div className="settings-container">
            <div className="settings-content">

                {/* Page title */}
                <h2 className="settings-title">Profile settings</h2>

                {/* Personal infos section */}
                <div className="settings-section personal-infos">
                    <h2 className="section-title">Update personal Infos</h2>
                    <span className="drop-down" onClick={() => { setDisplayChangeInfos(!displayChangeInfos) }}>
                        <FontAwesomeIcon
                            icon={displayChangeInfos ? faCaretDown : faCaretRight}
                            className="icon"
                        />
                    </span>

                    {
                        displayChangeInfos ?

                            <form className="form" onSubmit={changeInfosSubmit}>
                                <div className="form-box">
                                    <div className="form-item">
                                        <label htmlFor="settings_form_last_name" className="form-label">Last name</label>
                                        <input
                                            id="settings_form_last_name"
                                            type="text"
                                            value={formLastName}
                                            onChange={(e) => { setFormLastName(e.target.value) }}
                                            className="form-input"
                                            required
                                        />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="settings_form_first_name" className="form-label">First name</label>
                                        <input
                                            id="settings_form_first_name"
                                            type="text"
                                            value={formFirstName}
                                            onChange={(e) => { setFormFirstName(e.target.value) }}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="settings_form_email" className="form-label">Email</label>
                                    <input
                                        id="settings_form_email"
                                        type="email"
                                        value={formEmail}
                                        onChange={(e) => { setFormEmail(e.target.value) }}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-box">
                                    <div className="form-item">
                                        <label htmlFor="settings_form_phone" className="form-label">Phone number</label>
                                        <input
                                            id="settings_form_phone"
                                            type="tel"
                                            value={formPhone}
                                            onChange={(e) => { setFormPhone(e.target.value) }}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="settings_form_birth_date" className="form-label">Birth date</label>
                                        <input
                                            id="settings_form_birth_date"
                                            type="Date"
                                            value={formBirthDate}
                                            onChange={(e) => { setFormBirthDate(e.target.value) }}
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div className="form-box">
                                    <div className="form-item">
                                        <label htmlFor="settings_form_linkedin" className="form-label">LinkedIn Profile</label>
                                        <input
                                            id="settings_form_linkedin"
                                            type="url"
                                            value={formLinkedInURL}
                                            onChange={(e) => { setFormLinkedInURL(e.target.value) }}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="settings_form_picture_url" className="form-label">Picture URL</label>
                                        <input
                                            id="settings_form_picture_url"
                                            type="url"
                                            value={formPictureURL}
                                            onChange={(e) => { setFormPictureURL(e.target.value) }}
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div className="form-item">
                                    <input
                                        type="submit"
                                        className="form-input submit"
                                        value="Update"
                                    />
                                </div>

                                <div className="form-item">
                                    <input
                                        type="reset"
                                        className="form-input submit reset"
                                        value="Reset"
                                        onClick={() => { getProfileData(loggedUserId) }}
                                    />
                                </div>

                                <p className="request-response">
                                    {formInfosResponse}
                                </p>

                            </form>
                            : null
                    }
                </div>

                {/* Password section */}
                <div className="settings-section password">
                    <h2 className="section-title">Update password</h2>
                    <span className="drop-down" onClick={() => { setDisplayChangePassword(!displayChangePassword) }}>
                        <FontAwesomeIcon
                            icon={displayChangePassword ? faCaretDown : faCaretRight}
                            className="icon"
                        />
                    </span>

                    {
                        displayChangePassword ?

                            <form className="form" onSubmit={changePasswordSubmit}>
                                <div className="form-item">
                                    <label htmlFor="settings_form_current_password" className="form-label">Current password</label>
                                    <input
                                        id="settings_form_current_password"
                                        type="password"
                                        value={formCurrentPassword}
                                        onChange={(e) => { setFormCurrentPassword(e.target.value) }}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="settings_form_new_password" className="form-label">New password</label>
                                    <input
                                        id="settings_form_new_password"
                                        type="password"
                                        value={formNewPassword}
                                        onChange={(e) => { setFormNewPassword(e.target.value) }}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="settings_form_confirm_password" className="form-label">Confirm new password</label>
                                    <input
                                        id="settings_form_confirm_password"
                                        type="password"
                                        value={formConfirmPassword}
                                        onChange={(e) => { setFormConfirmPassword(e.target.value) }}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-item">
                                    <input
                                        type="submit"
                                        className="form-input submit"
                                        value="Update"
                                    />
                                </div>

                                <p className="request-response">
                                    {formPasswordResponse}
                                </p>

                            </form>
                            : null
                    }
                </div>

                {/* Resume section */}
                <div className="settings-section resume">
                    <h2 className="section-title">Update resume</h2>
                    <span className="drop-down" onClick={() => { setDisplayChangeResume(!displayChangeResume) }}>
                        <FontAwesomeIcon
                            icon={displayChangeResume ? faCaretDown : faCaretRight}
                            className="icon"
                        />
                    </span>

                    {
                        displayChangeResume ?

                            <>
                                <div className="form-item">
                                    <input
                                        type="file"
                                        className="form-input"
                                        accept=".pdf"
                                        onChange={(e) => { setFormResumeFile(e.target.files[0]) }}
                                    />

                                    <input
                                        type="submit"
                                        value="Update resume"
                                        className="form-input submit"
                                        onClick={requestUpdateResume}
                                    />
                                </div>

                                {
                                    userResumeLink != "" &&
                                    <div className="form-item">
                                        <input
                                            type="reset"
                                            value="Delete resume"
                                            className="form-input submit reset"
                                            onClick={requestDeleteResume}
                                        />
                                    </div>
                                }
                            </>
                            :
                            null

                    }

                    <p className="request-response">
                        {formResumeResponse}
                    </p>
                </div>

            </div>
        </div >
    )
}

export default Settings
