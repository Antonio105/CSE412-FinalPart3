import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage"; 
import NewPage from "./NewPage"; 

const App = () => {
  return (
    <Router>
      <div>
        <nav style={{ background: "#2b2b44", padding: "10px" }}>
          <Link to="/" style={{ marginRight: "20px", color: "#fff", textDecoration: "none" }}>Artist & Torrents</Link>
          <Link to="/new-page" style={{ color: "#fff", textDecoration: "none" }}>Collages</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-page" element={<NewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;