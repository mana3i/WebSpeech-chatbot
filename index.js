"use strict";

const express = require("express");
const app = express();

app.use(express.static(__dirname + "/front")); //html
app.use(express.static(__dirname + "/public")); //js and css

const server = app.listen(5000);
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
