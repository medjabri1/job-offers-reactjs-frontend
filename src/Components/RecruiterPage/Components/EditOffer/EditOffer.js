import React from 'react'

import { useState, useEffect } from 'react';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

import "./EditOffer.css";

function EditOffer({ currentRecruiterId, editOffer, currentOffer, closeModal }) {

    // CONST LET
    const API_BASE_URL = 'http://localhost:8081/api';

    // USE STATE HOOK
    let [offerTitle, setOfferTitle] = useState(currentOffer.title);
    let [offerCompany, setOfferCompnay] = useState(currentOffer.companyName);
    let [offerCountry, setOfferCountry] = useState(currentOffer.country);
    let [offerCity, setOfferCity] = useState(currentOffer.city);
    let [offerType, setOfferType] = useState(currentOffer.type);
    let [offerCategory, setOfferCategory] = useState(currentOffer.category.id);
    let [offerDecription, setOfferDescription] = useState(currentOffer.description);
    let [offerClosed, setOfferClosed] = useState(currentOffer.closed)

    let [categories, setCategories] = useState([]);

    // USE EFFECT HOOK

    useEffect(() => {
        requestCategories();
    }, []);

    // REQUEST OFFER CATEGORIES FROM DB

    let requestCategories = () => {

        axios.get(`${API_BASE_URL}/category/all-categories`, { withCredentials: true })
            .then(res => {

                let categories = res.data;
                setCategories(categories);
            });

    };

    // HANDLE SUBMIT

    let handleSubmit = (e) => {

        e.preventDefault();

        let offer_data = {
            id: currentOffer.id,
            title: offerTitle,
            companyName: offerCompany,
            description: offerDecription,
            country: offerCountry,
            city: offerCity,
            type: offerType,
            closed: offerClosed,
            category: {
                id: offerCategory
            },
            recruiter: {
                id: currentRecruiterId
            }
        };

        editOffer(offer_data);

    };

    return (
        <div className="edit-offer-modal">

            <span className="modal-close-button" onClick={closeModal}>+</span>

            <form className="form-container" onSubmit={handleSubmit}>

                <h2 className="form-title">
                    <FontAwesomeIcon icon={faEdit} className="icon" />
                    <span>Edit offer</span>
                </h2>

                <div className="form-item inline-item">
                    <label htmlFor="edit_offer_closed" className="form-label">Offer is closed</label>
                    <input
                        type="checkbox"
                        id="edit_offer_closed"
                        className="form-input"
                        checked={offerClosed}
                        onChange={(e) => { setOfferClosed(e.target.checked ? 1 : 0) }}
                    />
                </div>

                <div className="form-item">
                    <label htmlFor="edit_offer_title" className="form-label">Offer Title</label>
                    <input
                        type="text"
                        id="edit_offer_title"
                        className="form-input"
                        value={offerTitle}
                        onChange={(e) => { setOfferTitle(e.target.value) }}
                        required
                    />
                </div>

                <div className="form-item">
                    <label htmlFor="edit_offer_company" className="form-label">Company Name</label>
                    <input
                        type="text"
                        id="edit_offer_company"
                        className="form-input"
                        value={offerCompany}
                        onChange={(e) => { setOfferCompnay(e.target.value) }}
                        required
                    />
                </div>

                <div className="form-box">

                    <div className="form-item">
                        <label htmlFor="edit_offer_country" className="form-label">Country</label>
                        <input
                            type="text"
                            id="edit_offer_country"
                            className="form-input"
                            value={offerCountry}
                            onChange={(e) => { setOfferCountry(e.target.value) }}
                            required
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="edit_offer_city" className="form-label">City</label>
                        <input
                            type="text"
                            id="edit_offer_city"
                            className="form-input"
                            value={offerCity}
                            onChange={(e) => { setOfferCity(e.target.value) }}
                            required
                        />
                    </div>

                </div>

                <div className="form-box">

                    <div className="form-item">
                        <label htmlFor="edit_offer_type" className="form-label">Offer Type</label>
                        <select
                            id="edit_offer_type"
                            className="form-input"
                            value={offerType}
                            onChange={(e) => { setOfferType(e.target.value) }}
                            required
                        >
                            <option value="traineeship">Traineeship</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="edit_offer_category" className="form-label">Offer Category</label>
                        <select
                            id="edit_offer_category"
                            className="form-input"
                            value={offerCategory}
                            onChange={(e) => { setOfferCategory(e.target.value) }}
                            required
                        >
                            {
                                categories.map((category, index) => (
                                    <option key={index} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>

                <div className="form-item">
                    <label htmlFor="edit_offer_description" className="form-label">Offer Description</label>
                    <textarea
                        id="edit_offer_description"
                        rows="10"
                        className="form-input"
                        value={offerDecription}
                        onChange={(e) => { setOfferDescription(e.target.value) }}
                        required
                    ></textarea>
                </div>

                <div className="form-item">
                    <input type="submit" className="form-input submit" value="Submit" required />
                </div>

            </form >
        </div >
    )
}

export default EditOffer
