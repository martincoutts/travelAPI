import React, { Component } from "react";
import _ from "lodash";

import "./App.css";
import Header from "./components/Header";
import MainInfo from "./components/MainInfo";
import FlightsPreNoon from "./components/FlightsPreNoon";
import Flights from "../src/components/Flights";

export default class App extends Component {
  state = {
    flightsObject: {},
    flightsArr: [],
    departTimesArr: [],
    flightsPreNoon: [],
    totalFlights: {},
    swedishFlights: {},
    airportsByPopulartiy: [],
    carriersByPopularity: []
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
        this.flightsPreNoon(this.state.flightsArr);
      })
      .then(() => {
        this.airportPopularity(this.state.flightsArr);
      })
      .then(() => {
        this.flightsToSweden(this.state.flightsArr);
      })
      .then(() => {
        this.averageFlightTime(this.state.flightsArr);
      })
      .then(() => {
        this.carrierPopularity(this.state.flightsArr);
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
  flightsPreNoon = arr => {
    // Initialising array for pushing map to
    let departTimesArr = [];
    // Mapping given array in arguments
    // Pushes time iterable to array for filtering
    departTimesArr = arr.map(flight => {
      // Needs to remove ':' from time and then turn into an integer
      let time = parseInt(
        flight.outdeparttime.replace(":", "").replace(":", ""),
        10
      );

      return time;
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
    // Var declarations
    let lhrToDxb = [];
    let dateArray = [];
    let minutesArray = [];
    let averageMins;
    let averageTime;

    // Gets array of destination airports, no flights coming from DXB to LHR
    arr.map(flight => {
      if (flight.depair === "LHR" && flight.destair === "DXB") {
        lhrToDxb.push(flight);
      }
    });

    // Maps through list of flights
    dateArray = lhrToDxb.map(flight => {
      // Removes - and : from string of given object keys
      let departDate = flight.indepartdate.replace("-", "").replace("-", "");
      let departTime = flight.indeparttime.replace(":", "").replace(":", "");

      let arriveDate = flight.inarrivaldate.replace("-", "").replace("-", "");
      let arriveTime = flight.inarrivaltime.replace(":", "").replace(":", "");

      // Creates an object with all data
      // Parses specific sections from string
      // Turns into an integer for use in calculations
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

      // Destructuring of props from journey object
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

      // Seperates arrival and depart data
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
      // creates an object of  depart date stamp and arrival date stamp
      let journeyDateStamp = { depDate, arrDate };

      return journeyDateStamp;
    });

    // Maps through date array
    minutesArray = dateArray.map(object => {
      // Turns each key into a UTC format
      let arrTime = object.arrDate.getTime();
      let depTime = object.depDate.getTime();
      // Adds 3 hours in miliseconds to offset time difference between LDN and Dubai
      const dxbTimeDiff = 10800000;
      // Calculates difference between arrival and depart times and offsets with Dubai time zone
      let difference = arrTime - depTime + dxbTimeDiff;
      // Converts value to milliseconds
      let differenceTimeMins = this.millisToMinutes(difference);

      return differenceTimeMins;
    });
    // Using utility functions to calculate average value of array and average time
    averageMins = this.findAverage(minutesArray);
    averageTime = this.minutesToHours(averageMins);
    // Pushes value to state as object
    this.setState({
      averageTimeLHRtoDXB: { averageTime }
    });
  };

  // Sorts carriers into popularity//////////////////////////////
  carrierPopularity = arr => {
    let carriers = [];
    let sortedCarriers = [];

    carriers = arr.map(flight => {
      // Issue with multiple spellings of EasyJet, if statement checks and corrects this
      if (flight.carrier === "Easyjet") {
        let changedCarrier = "EasyJet";
        return changedCarrier;
      } else {
        return flight.carrier;
      }
    });

    // // Function for testing order of array is correct
    // carriers.map(carrier => {
    //   if (carrier === "EasyJet") {
    //     console.log(1);
    //   }
    // });

    // Sorts carriers array into most frequent to least
    sortedCarriers = _.chain(carriers)
      .countBy()
      .toPairs()
      .sortBy(1)
      .reverse()
      .map(0)
      .value();

    // Pushes sorted array to state
    this.setState({
      carriersByPopularity: sortedCarriers
    });
  };

  /////////////////////////Utility Functions////////////////////////////////////
  // Calculates percentage of total based on value//////////////////////////////
  findPercentage = (num1, total) => {
    let percentage = num1 / total;
    percentage = percentage * 100;
  };

  // Finds average value of array//////////////////////////////
  findAverage = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

  // Calculates miliseconds into minutes or minutes and hours if required
  millisToMinutes = millis => {
    const minutes = Math.floor(millis / 60000);

    return minutes;
  };

  // Calculates hours from minutes//////////////////////////////

  //
  minutesToHours = minutes => {
    const hoursDec = (minutes / 60).toFixed(2);
    const hours = Math.round(hoursDec);
    // Takes decimal point from substring and turns into number
    const minsDec = parseFloat(hoursDec.substring(1, 4));
    // Turns decimal point back into minutes
    const mins = Math.round(minsDec * 60);
    // Outputs to object for easier manipulation
    const hoursAndMins = { hours, mins };

    return hoursAndMins;
  };
  /////////////////////////Utility Functions////////////////////////////////////

  // App component rendering////////////////////////////////////
  render() {
    return (
      <div className="App">
        <Header />
        <MainInfo
          totalFlights={this.state.totalFlights.totalJourneys}
          totalAirports={this.state.airportsByPopulartiy.length}
          totalCarriers={this.state.carriersByPopularity.length}
        />
        <FlightsPreNoon />
        {/* <Flights
          flights={this.state.flightsArr}
          flightsPreNoon={this.flightsPreNoon}
          findPercentage={this.findPercentage}
          swedishFlights={this.state.swedishFlights}
          totalFlights={this.state.totalFlights}
          airportPopularity={this.airportPopularity}
        /> */}
      </div>
    );
  }
}
