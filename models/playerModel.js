const mongoose = require("mongoose");
const playerSchema = mongoose.Schema({
  playerName: {
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
  csgoRoles: {
    type: String,
    enum: [
      "Entry Frag",
      "Lurker",
      "AWPer",
      "Support",
      "In-Game Leader (IGL)",
      "Rifler",
      "Coach",
    ],
  },
  lolRoles: {
    type: String,
    enum: [
      "Top Laner",
      "Jungler",
      "Mid Laner",
      "Bot Laner (ADC)",
      "Support",
      "Coach",
    ],
  },
  r6sRoles: {
    type: String,
    enum: ["Fragger", "Support", "Entry Fragger", "Anchor", "Roamer", "Coach"],
  },
  valorantRoles: {
    type: String,
    enum: ["Duelist", "Initiator", "Controller", "Sentinel", "Coach"],
  },
  overwatchRoles: {
    type: String,
    enum: ["Tank", "DPS", "Support", "Flex", "Coach"],
  },
  codRoles: {
    type: String,
    enum: [
      "Assault Rifle (AR)",
      "Submachine Gun (SMG)",
      "Sniper",
      "Shotgunner",
      "LMG",
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
