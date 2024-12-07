import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import FileSearchBar from "./components/FileSearchBar";
import SearchResults from "./components/SearchResults";
import "./components/styles.css";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [albumQuery, setAlbumQuery] = useState(""); 
  const [minPositiveVotes, setMinPositiveVotes] = useState(""); 
  const [results, setResults] = useState([]); 
  const [albumResults, setAlbumResults] = useState([]);

  useEffect(() => {
    document.title = "What.CD Museum";
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery }),
      });
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching artist search results:", err);
    }
  };
  
  const handleAlbumSearch = async () => {
    try {
      console.log('Search Payload:', { albumName: albumQuery, minPositiveVotes });
      const response = await fetch("http://localhost:5000/search-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ albumName: albumQuery, minPositiveVotes }),
      });
      const data = await response.json();
      console.log('Response from Backend:', data);
      setAlbumResults(data);
    } catch (err) {
      console.error('Error fetching album search results:', err);
    }
  };

  return (
    <div className="App">
      <h1>What.CD Music Library Museum</h1>
      <h1>Artist & Torrents</h1>
      <div className="search-group">
        <label className="search-label">Search Artist Name:</label>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} placeholder="Search by artist name...."/>
      </div>
      <div className="search-group">
        <label className="search-label">Search Album Name:</label>
        <FileSearchBar fileQuery={albumQuery} setFileQuery={setAlbumQuery} onFileSearch={handleAlbumSearch} placeholder="Search album name...."/>
      </div>
      <div className="search-group">
        <label className="search-label">Minimum Positive Votes:</label>
        <input type="number" placeholder="e.g., 10" value={minPositiveVotes} onChange={(e) => setMinPositiveVotes(e.target.value)} style={{
            padding: "10px",
            marginTop: "10px",
            width: "100%",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#2b2b44",
            color: "#fff",
          }}/>
        <button onClick={handleAlbumSearch} style={{ 
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#00bfff",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",
          }}> Apply Filter</button>
      </div>
      <div className="results-container">
        <SearchResults title="Artists Matching Search" results={results} />
        <SearchResults title="Albums Matching Search" results={albumResults} />
      </div>
    </div>
  );
};

export default HomePage;
