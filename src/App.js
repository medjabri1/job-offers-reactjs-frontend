import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Link } from "react-router-dom";

import IndexPage from './Components/IndexPage/IndexPage';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/profile/settings" element={<h1>Profile Settings</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
