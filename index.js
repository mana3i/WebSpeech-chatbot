"use strict";

const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const sessId = uuidv4();

app.use(express.static(__dirname + "/front")); //html
app.use(express.static(__dirname + "/public")); //js and css

const server = app.listen(5000);

const io = require("socket.io")(server);
io.on("connection", function (socket) {
  console.log("a user connected");
});

const apiai = require("apiai")("XXXXXXXXXXXXXXXXXXXX");

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

io.on("connection", function (socket) {
  socket.on("chat message", (text) => {
    console.log("Message: " + text);
    //reply from AI

    let apiaiReq = apiai.textRequest(text, {
      sessionId: sessId,
    });
    apiaiReq.on("response", (response) => {
      let aiText = response.results.fulfillment.speech;
      socket.emit("bot reply: ", aiText);
    });
    apiaiReq.on("error", (error) => {
      console.log(error);
    });
    apiaiReq.end();
  });
});
