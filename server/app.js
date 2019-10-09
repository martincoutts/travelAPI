const express = require("express");
const flightData = require("../flightData.json");

const app = express();

app.get("/api/flights", (req, res) => {
  res.json(flightData);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
