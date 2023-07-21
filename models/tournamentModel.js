const mongoose = require("mongoose");
const tournamentSchema = mongoose.Schema({
  tournamentName: {
    type: String,
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
      reg: "Teams"
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
    required: true
  },
});

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;
