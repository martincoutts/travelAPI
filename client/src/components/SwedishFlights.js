import React from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const SwedishFlights = props => (
  <div className="info-card" id="swedish-flights">
    <h2>Flights To Sweden</h2>
    <span className="hidden-element">
      {`${props.percentageOfTotalFlights}%`}
    </span>
    <Progress
      theme={{
        active: {
          symbol: `${props.percentageOfTotalFlights}%`,
          color: "#4941b5",
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
