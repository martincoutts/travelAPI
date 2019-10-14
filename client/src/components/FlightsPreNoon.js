import React from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const FlightsPreNoon = props => (
  <div className="info-card" id="flights-pre-noon">
    <h2>Flights Departing Before Noon</h2>
    {/* To make application more accessible */}
    <span className="hidden-element">
      {`${props.flightsPreNoon.length} flights`}
    </span>
    <Progress
      theme={{
        active: {
          symbol: props.flightsPreNoon.length,
          color: "blue",
          trailColor: "lightgrey"
        }
      }}
      type="circle"
      percent={props.findPercentage(
        props.flightsPreNoon.length,
        props.totalFlights.totalJourneys
      )}
      status="active"
    />
  </div>
);

export default FlightsPreNoon;
