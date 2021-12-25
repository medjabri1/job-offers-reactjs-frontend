import React from 'react'

import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import "./RecruiterPage.css";

import Header from './../Header/Header';
import RecruiterPanel from './Components/RecruiterPanel/RecruiterPanel';
import OffersManager from './Components/OffersManager/OffersManager';

function RecruiterPage() {

    const API_BASE_URL = 'http://localhost:8081/api';
    let navigate = useNavigate();

    let [displayLoader, setDisplayLoader] = useState(true);
    let [recruiterId, setRecruiterId] = useState(0);

    useEffect(() => {
        checkLoginStatus();
    }, [])

    // Check login status

    let checkLoginStatus = () => {
        axios.get(`${API_BASE_URL}/user/log-status`, { withCredentials: true })
            .then(res => {
                let user_id = res.data.session_user_id;
                let user_role = res.data.role.toLowerCase();

                if (user_id != "null") {
                    // USER LOGGED IN
                    if (user_role == "recruiter") {
                        // USER IS A RECRUITER
                        setRecruiterId(user_id);
                        setTimeout(() => {
                            setDisplayLoader(false);
                        }, 1000);
                    } else {
                        // USER IS NOT A RECRUITER
                        navigate("/home");
                    }
                } else {
                    navigate("/");
                }
            });
    }

    return (
        <div className="recruiter-page">
            {/* LOADING */}
            {
                displayLoader ?
                    <div className="loader">
                        <span className="loader-square">
                            <span className="dot-1"></span>
                            <span className="dot-2"></span>
                        </span>
                    </div>
                    : null
            }

            <Header />
            <Routes>
                <Route path="/" element={<RecruiterPanel currentRecruiterId={recruiterId} />} />
                <Route path="/*" element={<RecruiterPanel currentRecruiterId={recruiterId} />} />
                <Route path="/offers-manager" element={<OffersManager currentRecruiterId={recruiterId} />} />
            </Routes>
        </div>
    )
}

export default RecruiterPage