import React from 'react'

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import "./OffersManager.css";

import NewOffer from '../NewOffer/NewOffer';

function OffersManager({ currentRecruiterId }) {

    // CONST LET
    const API_BASE_URL = 'http://localhost:8081/api';

    // USE STATE HOOK
    let [displayCreateNewOffer, setDisplayNewOffer] = useState(false);
    let [responseMessage, setResponseMessage] = useState("");

    // USE EFFECT HOOK

    useEffect(() => {
        document.title = "Offers Managers"
    }, []);

    // SUBMIT POST NEW OFFER

    let postNewOffer = (offer_data) => {

        axios.post(`${API_BASE_URL}/offer/new`, offer_data, { withCredentials: true })
            .then(res => {

                let { data } = res;

                if (data.status == "1") {
                    // OFFER POSTED SUCCESSFULLY
                    setResponseMessage("Offer posted successfully");
                } else {
                    // SOME ERROR OCCURED
                    setResponseMessage(res.data.error);
                }
                setDisplayNewOffer(false);
            });

    };

    return (
        <div className="offers-manager-container">

            {/* CREATE NEW OFFER COMPONENT */}
            {
                displayCreateNewOffer ?
                    <NewOffer
                        currentRecruiterId={currentRecruiterId}
                        postNewOffer={postNewOffer}
                        closeModal={() => { setDisplayNewOffer(false) }}
                    />
                    : null
            }

            <div className="offers-manager-content">
                <h2 className="manager-title">Offers Manager</h2>

                {/* RESPONSE MESSAGE */}
                {
                    responseMessage != "" ?
                        <p className="response-message" title="Click to delete" onClick={() => { setResponseMessage("") }}>{responseMessage}</p>
                        : null
                }

                <div className="manager-section quick-actions">
                    <div className="action-item" onClick={() => { setDisplayNewOffer(true) }}>
                        <FontAwesomeIcon icon={faPlusCircle} className="action-icon" />
                        <span>Post new offer</span>
                    </div>
                </div>

                <div className="manager-section open-offers">
                    <h2 className="section-title">Open Offers</h2>

                    <div className="section-content">
                        here goes open offers
                    </div>
                </div>

                <div className="manager-section open-offers">
                    <h2 className="section-title">Closed Offers</h2>

                    <div className="section-content">
                        here goes closed offers
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OffersManager
