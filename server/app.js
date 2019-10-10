const express = require("express");
fs = require("fs");
var parser = require("xml2json");
// const flightData = require("../flightdata_A.xml");

const app = express();

let json = "";

fs.readFile("./flighdata_A.xml", function(err, data) {
  json = parser.toJson(data);
});

app.get("/api/flights", (req, res) => {
  res.send(json);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
