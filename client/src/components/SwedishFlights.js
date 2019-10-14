import React from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const SwedishFlights = props => (
  <div>
    <h2>Flights To Sweden</h2>
    <Progress
      theme={{
        active: {
          symbol: `${props.percentageOfTotalFlights}%`,
          color: "red",
          trailColor: "lightgrey"
        }
      }}
      type="circle"
      percent={props.percentageOfTotalFlights}
      status="active"
    />
  </div>
);

export default SwedishFlights;
