import React, { Component } from "react";

import "./App.css";
import Flights from "../src/components/Flights";

export default class App extends Component {
  state = {
    flightsObject: {},
    flightsArr: [],
    departTimesArr: [],
    flightsPreNoon: []
  };

  // Takes in original object from API
  // Filters out just the array for manipulation and places it into state
  componentDidMount() {
    fetch("/api/flights")
      .then(res => res.json())
      .then(flights => this.setState({ flightsObject: flights }))
      .then(() =>
        this.setState({ flightsArr: this.state.flightsObject.flights.flight })
      );
  }

  flightPreNoon = arr => {
    // Initialising array for pushing map to
    let departTimesArr = [];
    // Mapping given array in arguments
    arr.map(flight => {
      // Needs to remove ':' from time and then turn into an integer
      let time = parseInt(
        flight.outdeparttime.replace(":", "").replace(":", ""),
        10
      );
      // Pushes time iterable to array for filtering
      departTimesArr.push(time);
    });
    // Must then filter out any flights which depart before 120000
    // Then pushes filtered array to application state
    this.setState({
      flightsPreNoon: departTimesArr.filter(time => time < 120000)
    });
  };

  render() {
    return (
      <div className="App">
        <Flights
          flights={this.state.flightsArr}
          flightsPreNoon={this.flightPreNoon}
        />
      </div>
    );
  }
}
