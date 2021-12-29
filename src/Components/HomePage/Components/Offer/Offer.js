import React from 'react'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'

import "./Offer.css";

function Offer({ loggedUserId, loggedUserRole }) {

    // CONST AND VARS

    const API_BASE_URL = 'http://localhost:8081/api';
    let navigate = useNavigate();
    let offer_id = useParams().id;

    // USE STATE HOOK

    let [offer, setOffer] = useState({ id: 0, title: "", category: { name: "" }, companyName: "" });
    let [responseMessage, setResponseMessage] = useState("");
    let [alreadyApplied, setAlreadyApplied] = useState(false);

    // USE EFFECT HOOK

    useEffect(() => {
        document.title = "Offer - " + offer.title;
        requestOfferData();
    }, []);

    useEffect(() => {
        requestCheckApply();
    }, [loggedUserId, offer]);

    // REQUEST CURRENT OFFER DATA 

    let requestOfferData = () => {

        axios.get(`${API_BASE_URL}/offer/id/?id=${offer_id}`, { withCredentials: true })
            .then(res => {

                let status = res.data.status;
                let offer_data = res.data.offer;

                if (status == "1") {
                    setOffer(offer_data);
                } else {
                    console.log(res.data.error);
                    navigate("/");
                }
            });

    }

    // REQUEST APPLY FOR OFFER

    let requestApplyOffer = () => {

        let postulation_data = {
            applier: {
                id: loggedUserId
            },
            offer: {
                id: offer.id
            }
        };

        axios.post(`${API_BASE_URL}/postulation/new`, postulation_data, { withCredentials: true })
            .then(res => {

                let { status } = res.data;

                if (status == "1") {
                    setResponseMessage("You applied for this offer successfully");
                    setAlreadyApplied(true);
                } else {
                    setResponseMessage(res.data.error);
                }
            });

    };

    // CHECK ALREADY APPLIED

    let requestCheckApply = () => {

        axios.get(`${API_BASE_URL}/postulation/exist?user_id=${loggedUserId}&offer_id=${offer.id}`, { withCredentials: true })
            .then(res => {

                let { status, exist } = res.data;

                if (status == "1" && exist == "1") {
                    setResponseMessage("Already applied for this offer");
                    setAlreadyApplied(true);
                } else {
                    setResponseMessage(res.data.error);
                }
            });

    };

    // TIME SINCE

    function timeSince(date) {

        if (date == null) {
            return;
        }

        date = Date.parse(date.replace('T', ''));

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    return (
        <div className="offer-container">
            <div className="offer-content">
                <h2 className="offer-title">{offer.title}</h2>

                <div className="offer-data-box">
                    <h3 className="company-name">{offer.companyName} - <span>{offer.city}, {offer.country}</span></h3>
                    <span className="published-ago">{timeSince(offer.createdAt)} ago</span>
                </div>


                <p className="offer-description">
                    {offer.description}..
                </p>

                <div className="offer-data-box">
                    <span className="offer-infos category-name">Category name : <span>{offer.category.name}</span></span>
                </div>

                <div className="offer-data-box">
                    <span className="offer-infos category-name">Company name : <span>{offer.companyName}</span></span>
                </div>

                <div className="offer-data-box">
                    <span className="offer-infos category-name">City / Country : <span>{offer.city} / {offer.country}</span></span>
                </div>

                <div className="offer-data-box">
                    <span className="offer-infos offer-type">Offer Type : <span>{offer.type}</span></span>
                </div>
            </div>

            {/* Postuler SECTION */}
            {
                loggedUserRole == "worker" && !alreadyApplied ?
                    <div className="apply-section" onClick={() => { requestApplyOffer(); }}>
                        <div className="apply-button" to="/recruiter/">
                            <span>Apply for offer</span>
                            <FontAwesomeIcon icon={faHandPointRight} className="action-icon" />
                        </div>
                    </div>
                    : null
            }

            {/* Response message */}
            {
                responseMessage != "" ?
                    <div className="response-message">
                        <span>{responseMessage}</span>
                    </div>
                    : null
            }
        </div>
    )
}

export default Offer
