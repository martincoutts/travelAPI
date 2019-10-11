// state requirements
const express = require("express");
const fs = require("fs");
var parser = require("xml2json");

const app = express();

// initalising json var outside scope of function
let json = "";

// Takes flightdata_A.xml file and converts to JSON and feeds into JSON variable
fs.readFile("./flighdata_A.xml", function(err, data) {
  json = parser.toJson(data);
});

// Outputs JSON var to user on chosen port
app.get("/api/flights", (req, res) => {
  res.send(json);
});

// Initialising port, must be different from 3000 if using React
const port = 5000;

// Starting express server
app.listen(port, () => `Server running on port ${port}`);
