import React from "react";
import PropTypes from "prop-types";

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

// Checking proptypes match
MainInfo.propTypes = {
  totalFlights: PropTypes.number,
  totalAirports: PropTypes.number,
  totalCarriers: PropTypes.number
};

export default MainInfo;
