import React, { Component } from "react";
import { throws } from "assert";

export default class Flights extends Component {
  state = {
    flightsPreNoon: []
  };

  handleButtonClick = () => {
    this.props.filterTimes(this.props.flights);
  };

  render(props) {
    return (
      <div>
        <h2>Flights</h2>
        {/* <ul>
          {this.props.flights.map((flight, index) => (
            <li>{flight.carrier}</li>
          ))}
        </ul> */}

        <button onClick={this.handleButtonClick}>Test</button>
      </div>
    );
  }
}
