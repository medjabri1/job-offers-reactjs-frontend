import React from 'react'

import { useState, useEffect } from 'react';


import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

import "./DeleteOffer.css";

function DeleteOffer({ currentRecruiterId, currentOffer, deleteOffer, closeModal }) {

    // CONST LET
    const API_BASE_URL = 'http://localhost:8081/api';

    // USE STATE HOOK

    // USE EFFECT HOOK

    useEffect(() => {
    }, []);

    return (
        <div className="delete-offer-modal">

            <span className="modal-close-button" onClick={closeModal}>+</span>

            <div className="delete-container">
                <div className="delete-title">
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                    <span>Confirm delete offer</span>
                </div>

                <div className="options">
                    <p className="option-item confirm" onClick={deleteOffer}>Confirm</p>
                    <p className="option-item cancel" onClick={closeModal}>Cancel</p>
                </div>

            </div>

        </div >
    )
}

export default DeleteOffer
