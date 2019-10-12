import React, { Component } from "react";
import _ from "lodash";

import "./App.css";
import Flights from "../src/components/Flights";

export default class App extends Component {
  state = {
    flightsObject: {},
    flightsArr: [],
    departTimesArr: [],
    flightsPreNoon: [],
    totalFlights: {},
    swedishFlights: {}
  };

  // Takes in original object from API
  // Filters out just the array for manipulation and places it into state
  // Executes all functions which are required on loading
  componentDidMount() {
    fetch("/api/flights")
      .then(res => res.json())
      .then(flights => this.setState({ flightsObject: flights }))
      .then(() =>
        this.setState({ flightsArr: this.state.flightsObject.flights.flight })
      )
      .then(() => {
        this.findtotalFlights(this.state.flightsArr);
      })
      .then(() => {
        this.flightsToSweden(this.state.flightsArr);
      })
      .then(() => {
        this.averageFlightTime(this.state.flightsArr);
      });
  }

  // Find total number of flights inclduing segments///////////////////////////
  findtotalFlights = arr => {
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
      totalFlights: {
        totalJourneys: flightsNoSegments,
        // Full journeys plus segmented journeys
        totalFlights: flightsWithSegments + flightsNoSegments
      }
    });
  };

  // Finds all flights departing before noon////////////////////////////////////
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

  //  Finds total flights into Swedish airports/////////////////////////////////
  flightsToSweden = arr => {
    //Array of all domestic Swedish airports
    const swedishAirportCodes = [
      "ARN",
      "GOT",
      "NYO",
      "BMA",
      "MMX",
      "LLA",
      "UME"
    ];

    // Variable declarations for use within function
    let destAirports = [];
    let segmentedJourneyAirports = [];

    let fullJourneyTotal = 0;
    let segmentedJourneyTotal = 0;

    // Maps through given array and seperates out destination airports fo use in own arrays
    arr.map(flight => {
      // Finds destination airport and pushes to own array for full journeys
      destAirports.push(flight.destair);
      // Finds arrival codes for only segmented journeys and pushes to own array in case required later
      if (flight.hasOwnProperty("segments")) {
        flight.segments.segment.map(journey => {
          segmentedJourneyAirports.push(journey.arrcode);
        });
      }
    });

    // Looks for a match with swedishAirportCodes and if true increments total variable
    destAirports.map(airport => {
      swedishAirportCodes.map(code => {
        if (code === airport) {
          fullJourneyTotal++;
        }
      });
    });
    // Looks for a match with swedishAirportCodes and if true increments total variable
    segmentedJourneyAirports.map(airport => {
      swedishAirportCodes.map(code => {
        if (code === airport) {
          segmentedJourneyTotal++;
        }
      });
    });
    // Pushes both totals to an object in state as both may not be required until a later time
    this.setState({
      swedishFlights: {
        fullJourneys: fullJourneyTotal,
        segmentedJourneys: segmentedJourneyTotal
      }
    });
  };

  // Sorts destination airports into popularity//////////////////////////////
  airportPopularity = arr => {
    let destAirports = [];
    let sortedAirports = [];

    let total = 0;

    arr.map(flight => {
      // Finds destination airport and pushes to own array for full journeys
      destAirports.push(flight.destair);
    });

    // // Function for testing order of array is correct
    // destAirports.map(flight => {
    //   if (flight === "LAS") {
    //     console.log(1);
    //   }
    // });

    sortedAirports = _.chain(destAirports)
      .countBy()
      .toPairs()
      .sortBy(1)
      .reverse()
      .map(0)
      .value();

    this.setState({
      airportsByPopulartiy: sortedAirports
    });
  };

  // Calculates average journey time for LHR to DXB/////////////////////////////
  averageFlightTime = arr => {
    let lhrToDxb = [];
    let dateArray = [];

    arr.map(flight => {
      if (flight.depair === "LHR" && flight.destair === "DXB") {
        lhrToDxb.push(flight);
      }
    });

    // Function seperates
    lhrToDxb.map(flight => {
      let departDate = flight.indepartdate.replace("-", "").replace("-", "");
      let departTime = flight.indeparttime.replace(":", "").replace(":", "");

      let arriveDate = flight.inarrivaldate.replace("-", "").replace("-", "");
      let arriveTime = flight.inarrivaltime.replace(":", "").replace(":", "");

      let journey = {
        depYear: parseInt(departDate.substring(0, 4)),
        depMonth: parseInt(departDate.substring(4, 6)),
        depDay: parseInt(departDate.substring(6, 8)),
        depHours: parseInt(departTime.substring(0, 2)),
        depMinutes: parseInt(departTime.substring(2, 4)),
        depSeconds: parseInt(departTime.substring(4, 6)),
        arrYear: parseInt(arriveDate.substring(0, 4)),
        arrMonth: parseInt(arriveDate.substring(4, 6)),
        arrDay: parseInt(arriveDate.substring(6, 8)),
        arrHours: parseInt(arriveTime.substring(0, 2)),
        arrMinutes: parseInt(arriveTime.substring(2, 4)),
        arrSeconds: parseInt(arriveTime.substring(4, 6))
      };

      let {
        depYear,
        depMonth,
        depDay,
        depHours,
        depMinutes,
        depSeconds,
        arrYear,
        arrMonth,
        arrDay,
        arrHours,
        arrMinutes,
        arrSeconds
      } = journey;

      let depDate = new Date(
        depYear,
        depMonth,
        depDay,
        depHours,
        depMinutes,
        depSeconds
      );

      let arrDate = new Date(
        arrYear,
        arrMonth,
        arrDay,
        arrHours,
        arrMinutes,
        arrSeconds
      );
      let journeyDateStamp = { depDate, arrDate };

      dateArray.push(journeyDateStamp);
    });

    dateArray.map(object => {
      let arrTime = object.arrDate.getTime();
      let depTime = object.depDate.getTime();
      const dxbTimeDiff = 10800000;
      let difference = arrTime - depTime + dxbTimeDiff;

      function millisToMinutes(millis) {
        const minutes = Math.floor(millis / 60000);
        const hoursAndMins = (minutes / 60).toFixed(2);

        return hoursAndMins;
      }

      let differenceTimeMins = millisToMinutes(difference);
      // let flightTime = differenceTimeMins / 60;

      console.log(differenceTimeMins);
    });

    // console.log(dateArray);
  };

  // Calculates percentage of total based on value//////////////////////////////
  findPercentage = (num1, total) => {
    let percentage = num1 / total;
    percentage = percentage * 100;
  };

  // App component rendering////////////////////////////////////
  render() {
    return (
      <div className="App">
        <Flights
          flights={this.state.flightsArr}
          flightsPreNoon={this.flightPreNoon}
          findPercentage={this.findPercentage}
          swedishFlights={this.state.swedishFlights}
          totalFlights={this.state.totalFlights}
          airportPopularity={this.airportPopularity}
        />
      </div>
    );
  }
}
