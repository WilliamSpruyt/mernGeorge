// first we import our dependencies…
const express = require("express");
const path = require("path");
require("dotenv").config();
const getSecret = require("./secrets");
const Stat = require("./models/stat");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
// and create our instances
const app = express();
const router = express.Router();
var cors = require("cors");

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.PORT || 3001;
// db config -- set your URI from mLab in secrets.js

mongoose.connect("mongodb://AdminUser:fuckwit@ds217970.mlab.com:17970/stats");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
// now we can set the route path & initialize the API
router.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});
router.get("/stats", (req, res) => {
  Stat.find((err, comments) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: comments });
  });
});

router.post("/stats", (req, res) => {
  const stat = new Stat();
  // body parser lets us use the req.body
  const { id, duration, numQs, date, avTime, playerName, score } = req.body;

  stat.id = id;
  stat.score = score;
  stat.duration = duration;
  stat.numQs = numQs;
  stat.date = date;
  stat.avTime = avTime;
  stat.playerName = playerName;
  stat.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
// Use our router configuration when we call /api
app.use("/api", router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
