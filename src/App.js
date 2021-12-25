import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Link } from "react-router-dom";

import IndexPage from './Components/IndexPage/IndexPage';
import HomePage from './Components/HomePage/HomePage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import RecruiterPage from './Components/RecruiterPage/RecruiterPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/profile/*" element={<ProfilePage />} />
          <Route path="/recruiter/*" element={<RecruiterPage />} />
          <Route path="*" element={<h2>Default route for index route</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
