import React from 'react'

import "./Search.css";

function Search() {
    return (
        <div className="search-container">

            {/* SEARCH FORM */}

            <form className="search-form">
                <h2 className="search-title">Search for offers</h2>
                <div className="search-bar">
                    <input type="text" className="search-form-input search-text" placeholder="Type your search here.." required />
                </div>
                <div className="search-filter">
                    <div className="filter-item">
                        <label htmlFor="search_filter_offer_category" className="search-filter-label">Job Category</label>
                        <select id="search_filter_offer_category" className="search-filter-input" required >
                            <option value="all">All categories</option>
                            <option value="cs">Computer science</option>
                            <option value="business">Business & Management</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label htmlFor="search_filter_offer_type" className="search-filter-label">Offer type</label>
                        <select id="search_filter_offer_type" className="search-filter-input" required >
                            <option value="all">All type</option>
                            <option value="partner">Partnership</option>
                            <option value="full">Full-time</option>
                            <option value="part">Part-time</option>
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

                {/* RESULT */}
                <div className="result-rows">
                    <div className="offer-item">
                        <h2 className="offer-title">Data Analyst</h2>
                        <h3 className="company-name">Google LLC, <span>USA</span></h3>
                        <p className="offer-description">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                        </p>
                        <span className="published-ago">10 min ago</span>
                    </div>
                    <div className="offer-item">
                        <h2 className="offer-title">Testing Engineer</h2>
                        <h3 className="company-name">Microsoft Co, <span>USA</span></h3>
                        <p className="offer-description">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                        </p>
                        <span className="published-ago">53 min ago</span>
                    </div>
                    <div className="offer-item">
                        <h2 className="offer-title">Flutter Junior Developer</h2>
                        <h3 className="company-name">Apple Co, <span>USA</span></h3>
                        <p className="offer-description">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                        </p>
                        <span className="published-ago">2 hours ago</span>
                    </div>
                    <div className="offer-item">
                        <h2 className="offer-title">React-JS Senior Developer</h2>
                        <h3 className="company-name">Apple Co, <span>USA</span></h3>
                        <p className="offer-description">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                        </p>
                        <span className="published-ago">18 hours ago</span>
                    </div>
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
