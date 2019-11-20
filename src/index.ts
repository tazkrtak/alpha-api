import admin = require("firebase-admin");
import functions = require("firebase-functions");
import express = require("express");
import bodyParser = require("body-parser");

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
  databaseURL: "https://tazkrtak.firebaseio.com"
});

const app = express();

const cors = {
  origin: ["https://tazkrtak-admin.web.app", "http://127.0.0.1:4000"]
};

app.use((req, res, next) => {
  const origin = req.headers.origin || ' ';
  if (cors.origin.includes(origin[0])) {
    res.header("Access-Control-Allow-Origin", origin[0]);
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
