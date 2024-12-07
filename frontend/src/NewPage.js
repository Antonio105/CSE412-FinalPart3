import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

const CollageSearchPage = () => {
  const [collageName, setCollageName] = useState("");
  const [minSubscribers, setMinSubscribers] = useState("");
  const [collageResults, setCollageResults] = useState([]);

  useEffect(() => {
    document.title = "Collage Search";
  }, []);

  const handleCollageSearch = async () => {
    try {
      const response = await fetch("http://localhost:5000/search-collages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collageName, minSubscribers }),
      });
      const data = await response.json();
      setCollageResults(data);
    } catch (err) {
      console.error("Error fetching collage search results:", err);
    }
  };

  return (
    <div className="App">
      <h1>Collage Search</h1>
      <div className="search-group">
        <label className="search-label">Search Collage Name:</label>
        <SearchBar searchQuery={collageName} setSearchQuery={setCollageName} onSearch={handleCollageSearch} placeholder="Search by collage name...."/>
        <label className="search-label">Minimum Subscribers:</label>
        <input type="number" placeholder="e.g., 10" value={minSubscribers} onChange={(e) => setMinSubscribers(e.target.value)} style={{
            padding: "10px",
            marginTop: "10px",
            width: "100%",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#2b2b44",
            color: "#fff",
          }}/>
        <button onClick={handleCollageSearch} style={{ marginTop: "10px" }}>Apply Filter</button>
      </div>
      <div className="results-container">
        <SearchResults title="Collages Matching Search" results={collageResults}/>
      </div>
    </div>
  );
};

export default CollageSearchPage;