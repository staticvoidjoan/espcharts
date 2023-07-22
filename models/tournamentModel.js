const mongoose = require("mongoose");
const tournamentSchema = mongoose.Schema({
  tournamentName: {
    type: String,
    min: [5,"The minimum length of the tournament name"],
    max : [30,"The maximum length of the tournament name"],
    required: true,
    
  },
  gameTitle: {
    type: String,
    enum: [
      "Counter Strike: Global Offensive",
      "League of Legends",
      "Rainbow Six Siege",
      "Valorant",
      "Overwatch",
      "Call Of Duty",
    ],
    required: true,
  },
  participatingTeams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams"
    },
  ],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  pricePool: {
    type: Number,
    required: true
  },
  organizer: {
    type: String,
    min: [3, "The minimum length of the tournament organizer"],
    max: [30, "The maximum length of the tournament organizer"],
    required: true
  },
});

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;
