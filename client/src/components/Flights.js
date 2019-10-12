import React, { Component } from "react";
import { throws } from "assert";

export default class Flights extends Component {
  handleButtonFlightsPreNoon = () => {
    this.props.flightsPreNoon(this.props.flights);
  };

  handleButtonFlightsToSweden = () => {
    this.props.findPercentage(
      this.props.swedishFlights.fullJourneys,
      this.props.totalFlights.totalJourneys
    );
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

        <button onClick={this.handleButtonFlightsPreNoon}>
          Flights Pre Noon
        </button>
        <button onClick={this.handleButtonFlightsToSweden}>
          Flights From Sweden
        </button>
      </div>
    );
  }
}
