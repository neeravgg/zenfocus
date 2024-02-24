import React from "react";
import { PropagateLoader } from "react-spinners";

const loadingContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "50px",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh", // Set height to 100% of the viewport height
};

const loadingMessageStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "20px",

  // Add any additional styling you want for the loading message
};

function ServerCheckLoading() {
  return (
    <div style={loadingContainerStyle}>
      <div>
        <div style={loadingMessageStyle}>Connecting to the server</div>
        <div style={loadingMessageStyle}>Please wait</div>
      </div>
      <PropagateLoader />
    </div>
  );
}

export default ServerCheckLoading;
