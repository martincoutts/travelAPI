import React, { Component } from "react";

import "./App.css";
import Flights from "../src/components/Flights";

export default class App extends Component {
  state = {
    flightsObject: {},
    flightsArr: [],
    departTimesArr: [],
    flightsPreNoon: ""
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

  // Needs to remove ':' from time and then turn into an integer
  // Must then filter out any flights which depart before 120000
  flightPreNoon(arr) {
    let departTimesArr = [];
    arr.map(flight => {
      let time = flight.outdeparttime.replace(":", "").replace(":", "");
      departTimesArr.push(time);
    });
    this.setState({
      flightsPreNoon: departTimesArr.filter(time => time < 120000)
    });
  }

  render() {
    return (
      <div className="App">
        <Flights
          flights={this.state.flightsArr}
          filterTimes={this.flightPreNoon}
        />
      </div>
    );
  }
}
