import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Flights from "../src/components/Flights";

export default class App extends Component {
  state = {
    flightsObject: {},
    flightsArr: []
  };

  componentDidMount() {
    fetch("/api/flights")
      .then(res => res.json())
      .then(flights => this.setState({ flightsObject: flights }))
      .then(() =>
        this.setState({ flightsArr: this.state.flightsObject.flights.flight })
      );
  }

  flightPreNoon(arr) {
    // const result = this.state.flightsArr.map(flight => {
    //   flight.outdeparttime.split("/:").join("/");
    // });

    // const result = array.filter(
    //   flight => parseInt(flight.outdeparttime) < 120000
    // );
    // const result = this.state.flightsArr;
    console.log(arr);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Flights
            flights={this.state.flightsArr}
            filterTimes={this.flightPreNoon}
          />
        </header>
      </div>
    );
  }
}
