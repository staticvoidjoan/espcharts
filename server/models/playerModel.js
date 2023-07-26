const mongoose = require("mongoose");
const playerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
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
  gameRole: {
    type: String,
    enum: [
      "Entry Frag",
      "Lurker",
      "AWPer",
      "Support",
      "In-Game Leader (IGL)",
      "Rifler",
      "Assault Rifle (AR)",
      "Submachine Gun (SMG)",
      "Sniper",
      "Shotgunner",
      "LMG",
      "Coach",
      "Top Laner",
      "Jungler",
      "Mid Laner",
      "Bot Laner (ADC)",
      "Support",
      "Fragger",
      "Support",
      "Entry Fragger",
      "Anchor",
      "Roamer",
      "Coach",
      "Duelist",
      "Initiator",
      "Controller",
      "Sentinel",
      "Coach",
      "Tank",
      "DPS",
      "Support",
      "Flex",
      "Coach",
    ],
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
