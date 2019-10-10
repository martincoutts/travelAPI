import React, { Component } from "react";

export default class Flights extends Component {
  state = {
    flightsPreNoon: []
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

        <button onClick={this.props.filterTimes}>Test</button>
      </div>
    );
  }
}
