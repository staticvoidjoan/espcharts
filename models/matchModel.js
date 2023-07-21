const mongoose = require("mongoose");
const matchSchema = mongoose.Schema({
  tournament: {},
  team1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  startDate: {
    type: Date,
  },
  mapsPlayer: [
    {
      type: String,
    },
  ],
  matchMVPs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  winningTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
