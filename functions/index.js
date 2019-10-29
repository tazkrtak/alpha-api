const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.json({ status: "alive" });
});

app.get("/info", (request, response) => {
  response.json({ name: "Tazkrtak", description: "Tazkrtak REST API", apiVersion: "v1" });
});

exports.api = functions.https.onRequest(app);
