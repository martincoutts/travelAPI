import React from "react";

const MainInfo = props => {
  return (
    <div id="main-info-div">
      <div>
        <h3>Total Flights</h3>
        <span>{props.totalFlights}</span>
        <h3>Total Airports</h3>
        <span>{props.totalAirports}</span>
        <h3>Total Carriers</h3>
        <span>{props.totalCarriers}</span>
      </div>
    </div>
  );
};

export default MainInfo;
