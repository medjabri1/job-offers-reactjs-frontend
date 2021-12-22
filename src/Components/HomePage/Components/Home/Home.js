import React from 'react'
import { useEffect } from 'react'

import "./Home.css";

function Home() {

    // Change page title

    useEffect(() => {
        document.title = "Job Offers - Recent";
    }, []);


    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Recent jobs posted</h1>
                <div className="categories-container">
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
                    </div>

                    <div className="category">
                        <h2 className="category-name">Business, management and administration</h2>
                        <div className="category-offers">
                            <div className="offer-item">
                                <h2 className="offer-title">Data Analyst</h2>
                                <h3 className="company-name">Google LLC, <span>France</span></h3>
                                <p className="offer-description">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                                </p>
                                <span className="published-ago">1 Days ago</span>
                            </div>
                            <div className="offer-item">
                                <h2 className="offer-title">Full-stack Developer</h2>
                                <h3 className="company-name">Microsoft Co, <span>France</span></h3>
                                <p className="offer-description">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                                </p>
                                <span className="published-ago">6 Days ago</span>
                            </div>
                            <div className="offer-item">
                                <h2 className="offer-title">Flutter Developer</h2>
                                <h3 className="company-name">Apple Co, <span>France</span></h3>
                                <p className="offer-description">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                                </p>
                                <span className="published-ago">2 weeks ago</span>
                            </div>
                        </div>
                    </div>

                    <div className="category">
                        <h2 className="category-name">Community and social services</h2>
                        <div className="category-offers">
                            <div className="offer-item">
                                <h2 className="offer-title">Data Analyst</h2>
                                <h3 className="company-name">Google LLC, <span>Morocco</span></h3>
                                <p className="offer-description">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                                </p>
                                <span className="published-ago">10min ago</span>
                            </div>
                            <div className="offer-item">
                                <h2 className="offer-title">Full-stack Developer</h2>
                                <h3 className="company-name">Microsoft Co, <span>Morocco</span></h3>
                                <p className="offer-description">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                                </p>
                                <span className="published-ago">10min ago</span>
                            </div>
                            <div className="offer-item">
                                <h2 className="offer-title">Flutter Developer</h2>
                                <h3 className="company-name">Apple Co, <span>Morocco</span></h3>
                                <p className="offer-description">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, earum..
                                </p>
                                <span className="published-ago">10min ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
