import React from "react";
import "./LoadingSpinner.css"; // You'll need to create LoadingSpinner.css for styling

function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default LoadingSpinner;
