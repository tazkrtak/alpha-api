const functions = require("firebase-functions");
const admin = require("firebase-admin");
const key = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(key),
  databaseURL: "https://tazkrtak.firebaseio.com"
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const cors = {
  origin: ["https://tazkrtak-admin.web.app", "http://127.0.0.1:4000"]
};

app.use((req, res, next) => {
  let origin = req.headers.origin;
  if (cors.origin.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.use("/buses", require("./routes/buses"));
app.use("/staff", require("./routes/staff"));
app.use("/users", require("./routes/users"));
app.use("/transactions", require("./routes/transactions"));

app.get("/status", (req, res) => {
  res.json({ status: "alive" });
});

app.get("/about", (req, res) => {
  res.json({
    name: "Tazkrtak",
    description: "Tazkrtak REST API",
    apiVersion: "v1"
  });
});

exports.api = functions.https.onRequest(app);
