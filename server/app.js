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

// Callback function for checking connecting or error
app.on("error", error => {
  throw new Error(`[Server]::ERROR:${error.message}`);
});

// Starting express server
app.listen(port, () => `Server running on port ${port}`);
console.log(`Server listening on port${port}`);

// Future requirements
// - Get concurrently working so that server and client run from one command
