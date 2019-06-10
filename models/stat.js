var mongoose = require("mongoose");

var StatSchema = new mongoose.Schema({
  duration: Number,
  numQs: Number,
  score: Number,
  date: Date,
  avTime: Number,
  playerName: String
});

module.exports = mongoose.model("Stat", StatSchema);
