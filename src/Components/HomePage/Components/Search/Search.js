import React from 'react'
import { useState, useEffect } from 'react'

import axios from 'axios';

import "./Search.css";

function Search() {

    // CONST & LET 
    const API_BASE_URL = 'http://localhost:8081/api';

    // USE STATE HOOK
    let [searchOffers, setSearchOffers] = useState([]);

    let [searchQuery, setSearchQuery] = useState("");
    let [searchType, setSearchType] = useState("full-time");
    let [searchCategory, setSearchCategory] = useState(0);

    let [categories, setCategories] = useState([]);

    let [totalSearchOffer, setTotalSearchOffers] = useState(0);
    let [initialSearchOffer, setInitialSearchOffers] = useState(0);

    // Change page title

    useEffect(() => {
        document.title = "Job Offers - Search"
        requestCategories();
    }, []);

    // HANDLE SUBMIT

    let handleSubmit = (e) => {

        e.preventDefault();
        requestSearch();

    };

    // REQUET SEARCH FROM BACKEND

    let requestSearch = () => {

        axios.get(`${API_BASE_URL}/offer/search?query=${searchQuery}&category=${searchCategory}&type=${searchType}`)
            .then((res) => {

                let { status } = res.data;

                if (status == "1") {

                    setSearchOffers(res.data.offers);
                    setTotalSearchOffers(res.data.total_offers);
                    setInitialSearchOffers(res.data.total_offers_initial);

                } else {
                    console.log(res.data);
                }

            });

    }

    // REQUEST CATEGORIES

    let requestCategories = () => {

        axios.get(`${API_BASE_URL}/category/all-categories`, { withCredentials: true })
            .then(res => {

                let categories = res.data;
                setCategories(categories);
                setSearchCategory(categories[0].id);
            });

    };

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
        <div className="search-container">

            {/* SEARCH FORM */}

            <form className="search-form" onSubmit={handleSubmit}>
                <h2 className="search-title">Search for offers</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-form-input search-text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                        placeholder="Type your search here.."
                    />
                </div>
                <div className="search-filter">
                    <div className="filter-item">
                        <label htmlFor="search_filter_offer_category" className="search-filter-label">Job Category</label>
                        <select
                            id="search_filter_offer_category"
                            className="search-filter-input"
                            value={searchCategory}
                            onChange={(e) => { setSearchCategory(e.target.value) }}
                        >
                            <option value="">All</option>
                            {
                                categories.map((category, index) => (
                                    <option key={index} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="filter-item">
                        <label htmlFor="search_filter_offer_type" className="search-filter-label">Offer type</label>
                        <select
                            id="search_filter_offer_type"
                            className="search-filter-input"
                            value={searchType}
                            onChange={(e) => { setSearchType(e.target.value) }}
                        >
                            <option value="all">All type</option>
                            <option value="partnership">Partnership</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label htmlFor="search_filter_published_at" className="search-filter-label">Published at</label>
                        <select id="search_filter_published_at" className="search-filter-input" required >
                            <option value="all">All time</option>
                            <option value="day">Today</option>
                            <option value="week">This week</option>
                            <option value="month">This month</option>
                        </select>
                    </div>
                </div>
                <div className="search-bar">
                    <input type="submit" className="search-form-input search-submit" value="Search" required />
                </div>
            </form>

            {/* SEARCH RESULT */}

            <div className="search-result">

                {

                    <div className="no-result">
                        <p>{totalSearchOffer}/{initialSearchOffer} offers match with your search</p>
                    </div>
                }

                {/* RESULT */}
                <div className="result-rows">

                    {
                        searchOffers.map((offer, index) => (

                            <div className="offer-item" key={index}>
                                <h2 className="offer-title">{offer.title}</h2>
                                <h3 className="company-name">{offer.companyName}, <span>{offer.country}</span></h3>
                                <p className="offer-description">
                                    {offer.description.substr(0, offer.description.length >= 100 ? 100 : offer.description.length)}
                                </p>
                                <span className="published-ago">{timeSince(offer.createdAt)} ago</span>
                            </div>

                        ))
                    }


                </div>

                {/* NO DATA FOUND */}
                {/* <div className="no-result">
                    <p>No results found</p>
                </div> */}
            </div>
        </div>
    )
}

export default Search
