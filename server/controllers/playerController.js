const Player = require("../models/playerModel");
const { getNames } = require("country-list");
const validCountries = getNames();

//Function to create a new Player
module.exports.createPlayer = async (req, res) => {
  try {
    const { firstName, lastName, userName, country } = req.body;

    //Chheck if the first name and last name are in the same format
    const regexOne = /^[A-Za-z]+$/;
    if (!regexOne.test(firstName) || !regexOne.test(lastName)) {
      return res
        .status(400)
        .json({ message: "First and last name must be alphabets" });
    }

    //Check if the username is in the correct format
    const regexTwo = /^[A-Za-z0-9]+$/;
    if (!regexTwo.test(userName)) {
      return res
        .status(400)
        .json({ message: "Username must be alphabets and numbers" });
    }

    //Check if the country is a real country
    if (!validCountries.includes(country)) {
      return res
        .status(400)
        .json({ message: country + " is not a valid country" });
    }

    //Check if there already exists a player with a that username
    // const existingPlayer = Player.findOne({userName})
    // if (existingPlayer) {
    //       return res
    //       .status(400)
    //       .json({ message: userName + " is already taken" });
    //     }

    const player = await Player.create(req.body);
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function to get all players
module.exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find({});
    if (players.length == 0) {
      return res
        .status(404)
        .json({ message: "No players have been added to the datbase" });
    }
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function to get a player by its ID
module.exports.getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id);
    if (!player) {
      res
        .status(404)
        .json({ message: "Error there is no player with that Id" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function to update a player
module.exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, userName, country } = req.body;

    //Check if the player name and last name are in the correct format
    const regexOne = /^[A-Za-z]+$/;
    if (!regexOne.test(firstName) || !regexOne.test(lastName)) {
      return res
        .status(400)
        .json({ message: "First and last name must be alphabets" });
    }

    //Check if the player username is in the correct format
    const regexTwo = /^[A-Za-z0-9]+$/;
    if (!regexTwo.test(userName)) {
      return res
        .status(400)
        .json({ message: "Username must be alphabets and numbers" });
    }

    //Check if the player country is a real country
    if (!validCountries.includes(country)) {
      return res
        .status(400)
        .json({ message: country + " is not a valid country" });
    }

    //Get the team we want to update and check if it exists
    const selectedPlayer = await Player.findById(id);
    if(!selectedPlayer){
      res.status(404).json({message:"There is no player with that id"})
    }


    //Check if a player with that username already exists excluding the one we want to update
    const existingPlayer = await Player.findOne({
      _id: {$ne: id},
      $or : [{userName}]
    })
    if (existingPlayer && existingPlayer.userName == userName){
      return res
            .status(400)
            .json({ message: userName + " is already taken" });
    }


    //If all validation are successful update the player
    const player = await Player.findByIdAndUpdate(id, req.body);
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function to delete a player
module.exports.deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndDelete(id);
    if (!player) {
      res
        .status(404)
        .json({ message: "Error there is no player with that Id" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
