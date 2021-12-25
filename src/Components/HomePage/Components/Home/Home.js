import React from 'react'

import { useState, useEffect } from 'react'

import axios from 'axios';

import "./Home.css";

function Home() {
    // CONST AND VARS

    const API_BASE_URL = 'http://localhost:8081/api';

    // USE STATE HOOK

    let [offersKeys, setOffersKeys] = useState([]);
    let [offersValues, setOffersValues] = useState([]);
    let [categories, setCategories] = useState([]);

    // USE EFFECT HOOK

    useEffect(() => {
        document.title = "Job Offers - Recent";
        requestRecentOffers();
        requestCategories();
    }, []);

    // REQUEST RECENT OFFERS

    let requestRecentOffers = () => {

        axios.get(`${API_BASE_URL}/offer/all-offers-category`, { withCredentials: true })
            .then(res => {

                let status = res.data.status;
                let result = res.data.result;

                if (status == "1") {
                    setOffersKeys(Object.keys(result));
                    setOffersValues(Object.values(result));
                } else {
                    console.log(res.data.error);
                }
            });

    }

    // REQUEST CATEGORIES

    let requestCategories = () => {

        axios.get(`${API_BASE_URL}/category/all-categories`, { withCredentials: true })
            .then(res => {
                setCategories(res.data);
            });

    }

    // FORMAT TIME SINCE / AGO

    function timeSince(date) {

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
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Recent jobs posted</h1>

                {
                    offersValues.map((category, category_index) => (

                        <div className="categories-container" key={category_index}>
                            <div className="category">
                                <h2 className="category-name">
                                    {
                                        categories.filter(category => category.id == offersKeys[category_index])[0] != undefined
                                            ? categories.filter(category => category.id == offersKeys[category_index])[0].name
                                            : "Category Name"
                                    }
                                </h2>
                                <div className="category-offers">

                                    {
                                        category.length == 0 ?
                                            <div className="no-offers-message">
                                                <p>No Offers available in this category</p>
                                            </div>
                                            :
                                            category.map((offer, offer_index) => (

                                                <div className="offer-item" key={offer_index}>
                                                    <h2 className="offer-title">{offer.title}</h2>
                                                    <h3 className="company-name">{offer.companyName} - <span>{offer.city}, {offer.country}</span></h3>
                                                    <p className="offer-description">
                                                        {offer.description.substring(1, 80)}..
                                                    </p>
                                                    <span className="published-ago">{timeSince(offer.createdAt)} ago</span>
                                                </div>

                                            ))
                                    }

                                </div>
                            </div>
                        </div>

                    ))
                }

                {/* <div className="categories-container">
                    <div className="category">
                        <h2 className="category-name">Science and technology</h2>
                        <div className="category-offers">
                            <div className="offer-item">
                                <h2 className="offer-title">Data Analyst</h2>
                                <h3 className="company-name">Google LLC, <span>USA</span></h3>
                                <p className="offer-description">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                                </p>
                                <span className="published-ago">10 min ago</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Home
