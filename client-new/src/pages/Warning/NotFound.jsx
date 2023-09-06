import React from "react";
import "./NotFound.css"

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-icon-container">
        <i class="fa-regular fa-face-sad-tear notfound-icon" style={{color: "#000000"}}></i>
        <h1>404</h1>
      </div>
      <div>
        <h2>Sorry, the page was not found</h2>
        <p>
          The link you followed probably is broken or the page has been removed
        </p>
      </div>
    </div>
  );
};

export default NotFound;
