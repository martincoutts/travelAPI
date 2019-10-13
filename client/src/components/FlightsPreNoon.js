import React, { Component } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const FlightsPreNoon = props => (
  <div>
    <h2>Flights Departing Before Noon</h2>
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
