import React from 'react'

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

import "./ViewOffer.css";

function ViewOffer({ currentRecruiterId, currentOffer, closeModal }) {

    // CONST LET
    const API_BASE_URL = 'http://localhost:8081/api';

    // USE STATE HOOK

    let [submissions, setSubmissions] = useState([]);
    let [totalSubmissions, setTotalSubmissions] = useState(0);
    let [totalViews, setTotalViews] = useState(0);

    // USE EFFECT HOOK

    useEffect(() => {
        requestSubmissions();
    }, [currentOffer]);

    // REQUEST APPLIERS FOR OFFER

    let requestSubmissions = () => {

        axios.get(`${API_BASE_URL}/postulation/offer/?offer_id=${currentOffer.id}`)
            .then((res) => {

                let { status } = res.data;

                if (status == "1") {

                    setSubmissions(res.data.postulations);
                    setTotalSubmissions(res.data.total_submissions);
                    console.log(res.data.total_submissions);

                } else {
                    console.log("error");
                }

            });

    }

    return (
        <div className="view-offer-modal">

            <span className="modal-close-button" onClick={closeModal}>+</span>

            <div className="view-container">
                <div className="view-title">
                    <FontAwesomeIcon icon={faEye} className="icon" />
                    <span>View offer submissions</span>
                </div>

                <div className="offer-stats">
                    <div className="stats-item">
                        <p className="stats-label">Total submissions</p>
                        <p className="stats-data">{totalSubmissions}</p>
                    </div>

                    <div className="stats-item">
                        <p className="stats-label">Total views</p>
                        <p className="stats-data">{totalViews}</p>
                    </div>
                </div>

                <div className="submissions-list">

                    {
                        submissions.length == 0 ?
                            <p className="no-submissions">No submissions yet for this offer</p>
                            :
                            <div className="list-header">
                                <span>Name</span>
                                <span>Submitted at</span>
                                <span>Profile</span>
                            </div>
                    }

                    <div className="list-data">
                        {
                            submissions.map((submission, index) => (

                                <div className="list-item" key={index}>
                                    <h2 className="user-name full">{submission.applier.lastName + " " + submission.applier.firstName}</h2>
                                    <p className="submitted-at full">{submission.createdAt.replace('T', '').substr(0, submission.createdAt.length - 4)}</p>
                                    <Link className="view-profile" to={"/profile/" + submission.applier.id} target="_blank">
                                        <FontAwesomeIcon icon={faEye} className="icon" />
                                        <span>Porfile</span>
                                    </Link>
                                </div>

                            ))
                        }
                    </div>

                </div>
            </div>

        </div >
    )
}

export default ViewOffer
