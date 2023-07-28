import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditPlayer.css";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
const AddPlayer = () => {
  let navigate = useNavigate();
  const [player, setPlayer] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    gameTitle: "",
    gameRole: "",
    age: 0,
    country: "",
  });

  const { firstName, lastName, userName, gameTitle, gameRole, age, country } =
    player;

  const onInputChange = (e) => {
    setPlayer({
      ...player,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the form...");

    try {
      console.log("Updating player...");
      await axios.post(`http://localhost:5000/espcharts/player`, player);
      console.log("Player posted successfully!");
      Swal.fire({
        icon: 'success',
        title: 'Player Created Successfully',
      });

      navigate("/player");
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const availableGameRoles = [
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
  ];

  const availableGameTitles = [
    "Counter Strike: Global Offensive",
    "League of Legends",
    "Rainbow Six Siege",
    "Valorant",
    "Overwatch",
    "Call Of Duty",
  ];


  return (
    <div>
      <div>
        <h2 className="h2Title">Add Player</h2>
        {/* <Link to={"/player"} className="Link" style={{ float: "left" }}>Go Back</Link> */}
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Username"
              name="userName"
              value={userName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <select
              className="form-control form-control-lg"
              name="gameTitle"
              value={gameTitle}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Select Game Title</option>
              {availableGameTitles.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control form-control-lg"
              name="gameRole"
              value={gameRole}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Select Game Role</option>
              {availableGameRoles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Age"
              name="age"
              value={age}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Country"
              name="country"
              value={country}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="submitButton">Add New Player</button>
        </form>
        <Link to={"/player"}>Go back to players</Link>
      </div>
    </div>
  );
};

export default AddPlayer;
