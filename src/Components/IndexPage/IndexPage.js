import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import './IndexPage.css';

import Login from './Compononets/Login/Login';
import Signup from './Compononets/Signup/Signup';
import { useNavigate } from 'react-router-dom';

function IndexPage() {

    // CONSTS & VARS 

    const API_BASE_URL = 'http://localhost:8081/api';

    let navigate = useNavigate();

    // USE STATE HOOK

    let [displayLogin, setDisplayLogin] = useState(false);
    let [displaySignup, setDisplaySignup] = useState(false);
    let [displayLoader, setDisplayLoader] = useState(true);
    let [userLogged, setUserLogged] = useState(false);
    let [userId, setUserId] = useState(false);

    // USE EFFECT HOOK

    // Change page title when toggling between login / sign up / index

    useEffect(() => {
        if (displayLogin) {
            document.title = "Job Offers - Login";
        } else if (displaySignup) {
            document.title = "Job Offers - Signup";
        } else {
            document.title = "Job Offers - Index";
        }
    }, [displayLogin, displaySignup]);

    useEffect(() => {
        checkLoginStatus();
        // request_logout();
    }, []);

    useEffect(() => {
        checkLoginStatus();
    }, [userLogged, userId]);

    // HELPER FUNCTIONS

    // Switch login and signup modals

    let gotoSignupIndex = () => {
        setDisplayLogin(false);
        setDisplaySignup(true);
    };

    let gotoLoginIndex = () => {
        setDisplaySignup(false);
        setDisplayLogin(true);
    };

    // Check log status

    let checkLoginStatus = () => {
        axios.get(`${API_BASE_URL}/user/log-status`, { withCredentials: true })
            .then(res => {
                let user_id = res.data.session_user_id;
                if (user_id != "null") {
                    setUserId(user_id);
                    setUserLogged(true);
                    navigate("/home");
                } else {
                    setUserLogged(false);
                }
                setTimeout(() => {
                    setDisplayLoader(false);
                }, 1500);
            });
    }

    // LOG OUT REQUEST

    let request_logout = () => {

        axios.post(`${API_BASE_URL}/user/logout`, {}, { withCredentials: true })
            .then(res => {
                console.log(res.data);
            });

    };

    // RETURN INDEX PAGE COMPONENT

    return (
        <div className="index-page">

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

            {/* HEADER */}

            <div className="header">
                <div className="header-container">
                    <div className="header-logo">Job Offers</div>
                    <ul className="header-nav">
                        <li className="header-nav-link" onClick={() => setDisplaySignup(true)} >Sign Up</li>
                        <li className="header-nav-link" onClick={() => setDisplayLogin(true)} >Log In</li>
                    </ul>
                </div>
            </div>

            {/* Background */}

            <div className="background">
                <img src="https://ieltsrewind.com/wp-content/uploads/2020/06/Describe-a-large-company-that-you-are-interested-in-ielts-cue-card.jpg" alt="Image from web" />
                {/* <img src="https://blog.thomasnet.com/hubfs/Big%20company%20corporation.jpg" alt="Image from web" /> */}
            </div>

            {/* SHOWCASE */}

            <div className="showcase">
                <h2 className="showcase-slogan">Join us today here in <span>-Job Offers-</span></h2>
                {/* <p className="showcase-description">To stay up with the latest job offers, by thousands of recruiters!</p> */}
                <p className="showcase-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ullam laboriosam vitae architecto rem fugiat eveniet tempora eius veritatis velit.</p>
                <div className="action-buttons">
                    <h2 className="action-button signup" onClick={() => { setDisplaySignup(true) }}>Sign Up</h2>
                    <h2 className="action-button login" onClick={() => { setDisplayLogin(true) }}>Log In</h2>
                </div>
            </div>

            {/* LOG IN MODAL */}

            {
                displayLogin ?
                    <Login
                        API_BASE_URL={API_BASE_URL}
                        gotoSignup={gotoSignupIndex}
                        closeModal={() => setDisplayLogin(false)}
                        setUserId={(id) => setUserId(id)}
                    /> : null
            }

            {/* SIGN UP MODAL */}

            {
                displaySignup ?
                    <Signup
                        API_BASE_URL={API_BASE_URL}
                        gotoLogin={gotoLoginIndex}
                        closeModal={() => setDisplaySignup(false)}
                    /> : null
            }

        </div>
    )
}

export default IndexPage;
