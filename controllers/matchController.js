const Match = require("../models/matchModel");

module.exports.createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getMatch = async (req, res) => {
  try {
    const match = await Match.find({});
    if (match.length == 0) {
      res
        .status(404)
        .json({ message: "There is no match added to the database" });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);
    if (!match) {
      res.status(404).json({ message: "There is no match with that id" });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};


module.exports.updateMatch = async (req, res) => {
    try {
      const { id } = req.params;
      const match = await Match.findByIdAndUpdate(id);
      if (!match) {
        res.status(404).json({ message: "There is no match with that id" });
      }
      res.status(200).json(match);
    } catch (error) {
      res.status(500).json({message:error.message});
    }
  };



  module.exports.deleteMatch = async (req, res) => {
    try {
      const { id } = req.params;
      const match = await Match.findByIdAndDelete(id);
      if (!match) {
        res.status(404).json({ message: "There is no match with that id" });
      }
      res.status(200).json(match);
    } catch (error) {
      res.status(500).json({message:error.message});
    }
  };