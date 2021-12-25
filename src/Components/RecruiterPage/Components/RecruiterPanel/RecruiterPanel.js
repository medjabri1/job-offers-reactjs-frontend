import React from 'react'

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faCog, faLock, faLockOpen, faUsers, faEye, faBookmark } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

import "./RecruiterPanel.css";

function RecruiterPanel({ currentRecruiterId }) {

    const API_BASE_URL = 'http://localhost:8081/api';

    // USE STATES HOOK

    let [totalOffers, setTotalOffers] = useState(0);
    let [totalOpen, setTotalOpen] = useState(0);
    let [totalClosed, setTotalClosed] = useState(0);
    let [totalSubmissions, setTotalSubmissions] = useState(0);
    let [totalViews, setTotalViews] = useState(0);
    let [totalFavorites, setTotalFavorites] = useState(0);

    // USE EFFECT HOOK

    useEffect(() => {
        document.title = "Recruiter Panel"
    }, []);

    useEffect(() => {
        requestOverviewData();
    }, [currentRecruiterId]);

    // REQUEST RECRUITER OVERVIEW DATA

    let requestOverviewData = () => {
        axios.get(`${API_BASE_URL}/recruiter/overview?recruiter_id=${currentRecruiterId}`, { withCredentials: true })
            .then(res => {

                let status = res.data.status;

                if (status == "1") {

                    let overview = res.data.overview;

                    setTotalOffers(overview.total_offers);
                    setTotalOpen(overview.total_open);
                    setTotalClosed(overview.total_closed);
                    setTotalSubmissions(overview.total_submissions);
                    setTotalViews(overview.total_views);
                    setTotalFavorites(overview.total_favorites);

                } else {
                    console.log(res.data.error);
                }
            });
    };

    return (
        <div className="recruiter-panel-container">
            <div className="recruiter-panel-content">
                <h2 className="panel-title">Recruiter Panel</h2>

                <div className="panel-section recruiter-overview">
                    <h2 className="section-title">Overview</h2>

                    <div className="overview-container">

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faClipboardList}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Total Offers</h2>
                                <p className="item-data">{totalOffers}</p>
                            </div>
                        </div>

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faLockOpen}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Open Offers</h2>
                                <p className="item-data">{totalOpen}</p>
                            </div>
                        </div>

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faLock}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Closed Offers</h2>
                                <p className="item-data">{totalClosed}</p>
                            </div>
                        </div>

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faUsers}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Total Submissions</h2>
                                <p className="item-data">{totalSubmissions}</p>
                            </div>
                        </div>

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faEye}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Total Views</h2>
                                <p className="item-data">{totalViews}</p>
                            </div>
                        </div>

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faBookmark}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Favorites</h2>
                                <p className="item-data">{totalFavorites}</p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="panel-section recruiter-actions">

                    <div className="actions-container">

                        <Link className="action-item" to="/recruiter/offers-manager">
                            <FontAwesomeIcon icon={faCog} className="action-icon" />
                            <span>Manage offers</span>
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default RecruiterPanel
