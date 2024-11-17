"use strict";

const socket = io();

const outputYou = document.querySelector(".output-you");
const outputBot = document.querySelector(".output-bot");

const SpeechRecongnition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecongnition();

recognition.lang = "en-US";
recognition.interimResults = false;

document.querySelector("button").addEventListener("click", function () {
  recognition.start();
});

recognition.addEventListener("result", (e) => {
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  console.log("confidence: " + e.results[0][0].confidence);

  //Socket.io later
  socket.emit("chat message", text);
});

function SynthecVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(text);
}

socket.on("bot reply", function (replyText) {
  SynthecVoice(replyText);
});
