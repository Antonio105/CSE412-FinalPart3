import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchQuery, setSearchQuery, onSearch, placeholder }) => {
  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <input  type="text"  placeholder={placeholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{
          padding: "10px 40px 10px 10px",
          borderRadius: "5px",
          width: "100%",
          backgroundColor: "#2b2b44",
          color: "#fff",
          border: "none",
          fontSize: "16px",
        }}/>
      <FontAwesomeIcon icon={faSearch} style={{
          position: "absolute",
          right: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#888",
          cursor: "pointer",
        }} onClick={onSearch}/>
    </div>
  );
};

export default SearchBar;