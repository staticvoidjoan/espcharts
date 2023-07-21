const Tournament = require("../models/tournamentModel");

module.exports.createTournament = async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({});
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findById(id);
    if (!tournament) {
      return res
        .status(404)
        .json({ message: "Error there is no Tournament with that Id" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findByIdAndUpdate(id);
    if (!tournament) {
      return res
        .status(404)
        .json({ message: "Error there is no Tournament with that Id" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findByIdAndDelete(id);
    if (!tournament) {
      return res
        .status(404)
        .json({ message: "Error there is no Tournament with that Id" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
