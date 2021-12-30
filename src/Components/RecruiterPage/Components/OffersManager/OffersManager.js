import React from 'react'

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import "./OffersManager.css";

import NewOffer from '../NewOffer/NewOffer';
import EditOffer from '../EditOffer/EditOffer';

function OffersManager({ currentRecruiterId }) {

    // CONST LET
    const API_BASE_URL = 'http://localhost:8081/api';

    // USE STATE HOOK
    let [displayCreateNewOffer, setDisplayCreateNewOffer] = useState(false);
    let [displayEditOffer, setDisplayEditOffer] = useState(false);
    let [currentOfferEdit, setCurrentOfferEdit] = useState({});

    let [responseMessage, setResponseMessage] = useState("");

    let [openOffers, setOpenOffers] = useState([]);
    let [closedOffers, setClosedOffers] = useState([]);

    let [noOpenOfferMessage, setNoOpenOffersMessage] = useState("");
    let [noClosedOfferMessage, setNoClosedOffersMessage] = useState("");

    // USE EFFECT HOOK

    useEffect(() => {
        document.title = "Offers Managers"
    }, []);

    useEffect(() => {
        requestOffers(0);
        requestOffers(1);
    }, [currentRecruiterId]);

    // SUBMIT POST NEW OFFER

    let postNewOffer = (offer_data) => {

        axios.post(`${API_BASE_URL}/offer/new`, offer_data, { withCredentials: true })
            .then(res => {

                let { data } = res;

                if (data.status == "1") {
                    // OFFER POSTED SUCCESSFULLY
                    setResponseMessage("Offer posted successfully");
                    requestOffers(0);
                } else {
                    // SOME ERROR OCCURED
                    setResponseMessage(res.data.error);
                }
                setDisplayCreateNewOffer(false);
            });

    };

    // SUBMIT EDIT OFFER

    let requestEditOffer = (offer_data) => {

        axios.put(`${API_BASE_URL}/offer/update`, offer_data, { withCredentials: true })
            .then(res => {

                let { data } = res;

                if (data.status == "1") {
                    // OFFER POSTED SUCCESSFULLY
                    setResponseMessage("Offer edited successfully");
                    requestOffers(0);
                    requestOffers(1);
                } else {
                    // SOME ERROR OCCURED
                    setResponseMessage(res.data.error);
                }
                setDisplayEditOffer(false);
            });
    }

    // REQUEST RECRUITER OFFERS

    let requestOffers = (closed) => {

        if (closed == null || closed == undefined) {
            return
        }

        axios.get(`${API_BASE_URL}/recruiter/all-offers?recruiter_id=${currentRecruiterId}&closed=${closed}`, { withCredentials: true })
            .then(res => {

                let { status } = res.data;

                if (status == "1") {
                    if (closed == 0) {
                        setOpenOffers(Object.values(res.data.offers));
                    } else if (closed == 1) {
                        setClosedOffers(Object.values(res.data.offers));
                    }

                } else {
                    console.log(res.data.error);
                }

            });

    }

    // SHOW EDIT OFFER

    let showEditOffer = (offer) => {
        setCurrentOfferEdit(offer);
        setDisplayEditOffer(true);
    }

    return (
        <div className="offers-manager-container">

            {/* CREATE NEW OFFER COMPONENT */}
            {
                displayCreateNewOffer ?
                    <NewOffer
                        currentRecruiterId={currentRecruiterId}
                        postNewOffer={postNewOffer}
                        closeModal={() => { setDisplayCreateNewOffer(false) }}
                    />
                    : null
            }

            {/* EDIT OFFER COMPONENT */}
            {
                displayEditOffer ?
                    <EditOffer
                        currentRecruiterId={currentRecruiterId}
                        editOffer={requestEditOffer}
                        currentOffer={currentOfferEdit}
                        closeModal={() => { setDisplayEditOffer(false) }}
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
                    <div className="action-item" onClick={() => { setDisplayCreateNewOffer(true) }}>
                        <FontAwesomeIcon icon={faPlusCircle} className="action-icon" />
                        <span>Post new offer</span>
                    </div>
                </div>

                <div className="manager-section open-offers">
                    <h2 className="section-title">Open Offers</h2>

                    <div className="section-content">
                        {
                            openOffers.length == 0 ?
                                <p className="no-offers">No open offers with this user</p>
                                :
                                <div className="offers-container">
                                    <div className="offers-header">
                                        <span>Title</span>
                                        <span>Creation date</span>
                                        <span>Actions</span>
                                    </div>
                                    {
                                        openOffers.map((offer, index) => (
                                            <div className="offer-item" key={index}>

                                                <Link to={"/home/offer/" + offer.id}>
                                                    <h2 className="offer-title">{offer.title.substring(0, 20)}</h2>
                                                </Link>

                                                <p className="offer-created-at">{offer.createdAt.replace('T', '').substr(0, offer.createdAt.length - 4)}</p>
                                                <div className="offer-actions">
                                                    <Link className="offer-action-item" to={"/recruiter/offers-manager/view/" + offer.id}>
                                                        <FontAwesomeIcon icon={faEye} className="action-icon" />
                                                        <span>View</span>
                                                    </Link>
                                                    <div className="offer-action-item" onClick={() => { showEditOffer(offer) }}>
                                                        <FontAwesomeIcon icon={faEdit} className="action-icon" />
                                                        <span>Edit</span>
                                                    </div>
                                                    <div className="offer-action-item">
                                                        <FontAwesomeIcon icon={faTrash} className="action-icon" />
                                                        <span>Delete</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                </div>

                <div className="manager-section open-offers">
                    <h2 className="section-title">Closed Offers</h2>

                    <div className="section-content">
                        {
                            closedOffers.length == 0 ?
                                <p className="no-offers">No closed offers with this user</p>
                                :
                                <div className="offers-container">
                                    <div className="offers-header">
                                        <span>Title</span>
                                        <span>Creation date</span>
                                        <span>Actions</span>
                                    </div>
                                    {
                                        closedOffers.map((offer, index) => (
                                            <div className="offer-item" key={index}>

                                                <Link to={"/home/offer/" + offer.id}>
                                                    <h2 className="offer-title">{offer.title.substring(0, 20)}</h2>
                                                </Link>

                                                <p className="offer-created-at">{offer.createdAt.replace('T', '').substr(0, offer.createdAt.length - 4)}</p>
                                                <div className="offer-actions">
                                                    <Link className="offer-action-item" to={"/recruiter/offers-manager/view/" + offer.id}>
                                                        <FontAwesomeIcon icon={faEye} className="action-icon" />
                                                        <span>View</span>
                                                    </Link>
                                                    <div className="offer-action-item" onClick={() => { showEditOffer(offer) }}>
                                                        <FontAwesomeIcon icon={faEdit} className="action-icon" />
                                                        <span>Edit</span>
                                                    </div>
                                                    <div className="offer-action-item">
                                                        <FontAwesomeIcon icon={faTrash} className="action-icon" />
                                                        <span>Delete</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OffersManager
