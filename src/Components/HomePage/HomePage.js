import React from 'react'

import { Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Header from "./Components/Header/Header";

import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/*" element={<h2>Default route</h2>} />
            </Routes>
        </div>
    )
}

export default HomePage
