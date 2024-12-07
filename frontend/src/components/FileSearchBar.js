import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const FileSearchBar = ({
  fileQuery,
  setFileQuery,
  onFileSearch,
  placeholder = "Search by album name...", 
  additionalFilter, 
  setAdditionalFilter, 
}) => { const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onFileSearch();
    }
  };

  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <input type="text" placeholder={placeholder} value={fileQuery} onChange={(e) => setFileQuery(e.target.value)} onKeyPress={handleKeyPress} style={{
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
        }} onClick={onFileSearch}/>
      {additionalFilter !== undefined && setAdditionalFilter && (
        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#fff" }}>Minimum Positive Votes:</label>
          <input type="number" placeholder="Enter minimum votes..." value={additionalFilter} onChange={(e) => setAdditionalFilter(Number(e.target.value))} style={{
              padding: "8px",
              marginTop: "5px",
              width: "100%",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#2b2b44",
              color: "#fff",
              fontSize: "14px",}}/>
        </div>
      )}
    </div>
  );
};

export default FileSearchBar;