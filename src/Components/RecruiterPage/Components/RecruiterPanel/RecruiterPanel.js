import React from 'react'

import { Link } from 'react-router-dom';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faCog } from '@fortawesome/free-solid-svg-icons'

import "./RecruiterPanel.css";

function RecruiterPanel({ currentRecruiter }) {
    return (
        <div className="recruiter-panel-container">
            <div className="recruiter-panel-content">
                <h2 className="panel-title">Recruiter Panel Manager</h2>

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
                                <p className="item-data">5</p>
                            </div>
                        </div>

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faClipboardList}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Open Offers</h2>
                                <p className="item-data">1</p>
                            </div>
                        </div>

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faClipboardList}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Closed Offers</h2>
                                <p className="item-data">4</p>
                            </div>
                        </div>

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faClipboardList}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Total Submissions</h2>
                                <p className="item-data">65</p>
                            </div>
                        </div>

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faClipboardList}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Total Views</h2>
                                <p className="item-data">845</p>
                            </div>
                        </div>

                        <div className="overview-item">
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faClipboardList}
                                />
                            </div>
                            <div className="content">
                                <h2 className="item-title">Favorites</h2>
                                <p className="item-data">397</p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="panel-section recruiter-actions">

                    <div className="actions-container">

                        <Link className="action-item" to="/recruiter/">
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
