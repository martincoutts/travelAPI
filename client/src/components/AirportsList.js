import React from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const AirportsList = props => {
  const topTenAirports = props.sliceArr(props.airportsList, 10);

  return (
    <div className="info-card" id="airports-list">
      <h2>Most Popular Airports</h2>
      <ol>
        {topTenAirports.map((airport, index) => {
          return <li key={index + 1}>{airport}</li>;
        })}
      </ol>
    </div>
  );
};

export default AirportsList;
