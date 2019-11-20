/* Firebase */

import admin = require("firebase-admin");
import functions = require("firebase-functions");
const serviceAccountKey = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://tazkrtak.firebaseio.com"
});


/* Express */

import express = require("express");
import bodyParser = require("body-parser");

import rootRouter  = require("./routes/root");
import busesRouter = require("./routes/buses");
import staffRouter = require("./routes/staff");
import usersRouter = require("./routes/users");
import transRouter = require("./routes/transactions");

const app = express();

app.use(bodyParser.json());

app.use("/", rootRouter);
app.use("/buses", busesRouter);
app.use("/staff", staffRouter);
app.use("/users", usersRouter);
app.use("/transactions", transRouter);


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


exports.api = functions.https.onRequest(app);
