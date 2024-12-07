import React from "react";

const SearchResults = ({ title, results }) => {
  console.log(`${title} Results:`, results); 

  if (!results || results.length === 0) {
    return <p>No results found for {title}.</p>;
  }
  return (
    <div className="search-results">
      <h3>{title}</h3>
      <ul style={{ padding: 0 }}>
        {results.map((result, index) => (
          <li key={index} style={{
              marginBottom: "10px",
              listStyle: "none",
              padding: "10px",
              background: "#2b2b44",
              borderRadius: "8px",
            }}>
            {title.includes("Artists") && (<>
                <h4>Artist Name: {result.name}</h4>
                <p>Alias ID: {result.aliasid}</p>
                <p>Artist ID: {result.artistid}</p>
                <p>Redirect: {result.redirect}</p></>)}
            {title.includes("Albums") && (<>
                <h4>ID: {result.id}</h4>
                <p>Group ID: {result.groupid}</p>
                <p>Media: {result.media}</p>
                <p>Format: {result.format}</p>
                <p>File Path: {result.filepath}</p>
                <p>Size: {result.size} bytes</p>
                <p>File List:</p>
                <div style={{ marginLeft: "10px" }}>
                  {result.filelist
                    ? result.filelist
                        .split("÷")
                        .map((file, fileIndex) => (
                          <div key={fileIndex} style={{ marginBottom: "5px" }}>
                            {file.trim()}
                          </div>
                        ))
                    : "No files available"}
                </div>
                <p>Positive Votes: {result.positivevotes || 0}</p>
                <p>Negative Votes: {result.negativevotes || 0}</p></>)}
            {title.includes("Collages") && (<>
                <h4>Collage Name: {result.name}</h4>
                <p>ID: {result.id}</p>
                <p>Number of Torrents: {result.numtorrents}</p>
                <p>Category ID: {result.categoryid}</p>
                <p>Tag List: {result.taglist}</p>
                <p>Subscribers: {result.subscribers}</p>
                <p>Last Updated: {new Date(result.updated).toLocaleString()}</p></>)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;