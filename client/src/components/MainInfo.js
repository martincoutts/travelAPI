import React from "react";

const MainInfo = props => {
  return (
    <div className="info-card" id="main-info-container">
      <h4>Total Flights</h4>
      <span>{props.totalFlights}</span>
      <h4>Total Airports</h4>
      <span>{props.totalAirports}</span>
      <h4>Total Carriers</h4>
      <span>{props.totalCarriers}</span>
    </div>
  );
};

export default MainInfo;
