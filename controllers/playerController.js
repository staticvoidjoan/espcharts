const Player = require("../models/playerModel");
const playerModel = require("../models/playerModel");

module.exports.createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find({});
    if(players.length == 0){
        return res.status(404).json({message: "No players have been added to the datbase"})
    }
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id);
    if (!player) {
      res
        .status(404)
        .json({ message: "Error there is no player with that Id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndUpdate(id);
    if (!player) {
      res
        .status(404)
        .json({ message: "Error there is no player with that Id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndDelete(id);
    if (!player) {
      res
        .status(404)
        .json({ message: "Error there is no player with that Id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
