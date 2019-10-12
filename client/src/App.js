import React, { Component } from "react";

import "./App.css";
import Flights from "../src/components/Flights";

export default class App extends Component {
  state = {
    flightsObject: {},
    flightsArr: [],
    departTimesArr: [],
    flightsPreNoon: [],
    totalflights: {}
  };

  // Takes in original object from API
  // Filters out just the array for manipulation and places it into state
  componentDidMount() {
    fetch("/api/flights")
      .then(res => res.json())
      .then(flights => this.setState({ flightsObject: flights }))
      .then(() =>
        this.setState({ flightsArr: this.state.flightsObject.flights.flight })
      )
      .then(() => {
        this.findTotalFlights(this.state.flightsArr);
      });
  }

  // Find total number of flights inclduing segments
  findTotalFlights = arr => {
    let flightsNoSegments = arr.length;
    let flightsWithSegments;
    // Initialise counter var
    let total = 0;
    // Maps through given array and checks if segment key exist in given object
    // If so it gives a count of how many segments there are
    // Returns to total var outside of function
    arr.map(flight => {
      if (flight.hasOwnProperty("segments")) {
        let segments = flight.segments.segment.length;
        total = total + segments;
      }
    });
    // Updating var from total
    flightsWithSegments = total;
    // Adding object to state to give more flexability at later stage, can either give full journeys or total flights
    this.setState({
      totalflights: {
        totalJourneys: flightsNoSegments,
        totalflights: flightsWithSegments + flightsNoSegments
      }
    });
  };

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

  // Must take in array
  // Filter out which of the flights destair matches array of Swedish airport codes
  // Take returned number and work out percentage of total flights
  // At some point may need to check on segmented flights as well

  flightsToSweden = () => {};

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
