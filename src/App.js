import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Link } from "react-router-dom";

import IndexPage from './Components/IndexPage/IndexPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<h1>Home</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
