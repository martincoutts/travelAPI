import React from "react";

const AirportsList = props => {
  const topTenAirports = props.sliceArr(props.airportsList, 10);

  return (
    <div className="info-card" id="airports-list">
      <h2>Most Popular Destination Airports</h2>
      <div>
        <ol className="list">
          {topTenAirports.map((airport, index) => {
            return <li key={index + 1}>{airport}</li>;
          })}
        </ol>
      </div>
    </div>
  );
};

export default AirportsList;
