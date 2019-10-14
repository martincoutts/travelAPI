import React from "react";

const MainInfo = props => {
  return (
    <div className="info-card" id="main-info-container">
      <div className="main-info-tag">
        <h4>Total Flights</h4>
        <span>{props.totalFlights}</span>
      </div>
      <div className="main-info-tag">
        <h4>Total Airports</h4>
        <span>{props.totalAirports}</span>
      </div>
      <div className="main-info-tag">
        <h4>Total Carriers</h4>
        <span>{props.totalCarriers}</span>
      </div>
    </div>
  );
};

export default MainInfo;
