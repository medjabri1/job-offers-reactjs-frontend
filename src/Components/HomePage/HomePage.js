import React from 'react'

import { Routes, Route, useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react'

import axios from 'axios';

import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Header from "../Header/Header";

import "./HomePage.css";

function HomePage() {

    const API_BASE_URL = 'http://localhost:8081/api';
    let navigate = useNavigate();

    let [displayLoader, setDisplayLoader] = useState(true);

    useEffect(() => {
        checkLoginStatus();
    }, [])

    // Check login status

    let checkLoginStatus = () => {
        axios.get(`${API_BASE_URL}/user/log-status`, { withCredentials: true })
            .then(res => {
                let user_id = res.data.session_user_id;
                if (user_id != "null") {
                    // USER LOGGED IN
                    setTimeout(() => {
                        setDisplayLoader(false);
                    }, 1000);
                } else {
                    navigate("/");
                }
            });
    }

    return (
        <div className="home-page">

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
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/*" element={<h2>Default route for Home Page</h2>} />
            </Routes>
        </div>
    )
}

export default HomePage
