import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AddPlayer.css";
import background from "../../assets/playerbg.png";
const AddPlayer = () => {
  let navigate = useNavigate();
  const [player, setPlayer] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    gameTitle: "",
    gameRole: "",
    age: "",
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

  const clearOnSubmit = () => {
    setPlayer({
      firstName: "",
      lastName: "",
      userName: "",
      gameTitle: "",
      gameRole: "",
      age: "",
      country: "",
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the form...");

    try {
      console.log("Adding player...");
      await axios.post(`http://localhost:5000/espcharts/player`, player);
      console.log("Player posted successfully!");
      Swal.fire({
        icon: "success",
        title: "Player Created Successfully",
      });

      navigate("/players");
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const availableGameTitles = [
    "Counter Strike: Global Offensive",
    "League of Legends",
    "Rainbow Six Siege",
    "Valorant",
    "Overwatch",
    "Call Of Duty",
  ];

  let roles = [];
  if (player.gameTitle === "Counter Strike: Global Offensive") {
    roles = [
      "Entry Frag",
      "Lurker",
      "AWPer",
      "Support",
      "In-Game Leader (IGL)",
      "Rifler",
      "Coach",
    ];
  } else if (player.gameTitle === "League of Legends") {
    roles = [
      "Top Laner",
      "Jungler",
      "Mid Laner",
      "Bot Laner (ADC)",
      "Support",
      "Coach",
    ];
  } else if (player.gameTitle === "Rainbow Six Siege") {
    roles = [
      "Fragger",
      "Support",
      "Entry Fragger",
      "Anchor",
      "Roamer",
      "Coach",
    ];
  } else if (player.gameTitle === "Valorant") {
    roles = ["Duelist", "Initiator", "Controller", "Sentinel", "Coach"];
  } else if (player.gameTitle === "Overwatch") {
    roles = ["Tank", "DPS", "Support", "Flex", "Coach"];
  } else if (player.gameTitle === "Call of Duty") {
    roles = [
      "Assault Rifle (AR)",
      "Submachine Gun (SMG)",
      "Sniper",
      "Shotgunner",
      "LMG",
      "Coach",
    ];
  }
  const availableGameRoles = roles;

  return (
    <div className="add-player-container mt-5 mb-5">
      <img src={background} alt="background" className="player-bg-image" />
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label style={{ float: "left" }}>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label style={{ float: "left" }}>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label style={{ float: "left" }}>In Game Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="User Name"
            name="userName"
            value={userName}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="gameTitle">
          <Form.Label style={{ float: "left" }}>Game Title</Form.Label>
          <Form.Select
            aria-label="Default"
            name="gameTitle"
            value={gameTitle}
            onChange={(e) => onInputChange(e)}
          >
            {availableGameTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="gameRole">
          <Form.Label style={{ float: "left" }}>Game Role</Form.Label>
          <Form.Select
            aria-label="Default"
            name="gameRole"
            value={gameRole}
            onChange={(e) => onInputChange(e)}
          >
            {availableGameRoles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="age">
          <Form.Label style={{ float: "left" }}>Age</Form.Label>
          <Form.Control
            type="text"
            placeholder="Age"
            name="age"
            value={age}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label style={{ float: "left" }}>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <div className="container d-flex justify-content-between align-items-center">
          <Link to={`/players`} className="Link">
            <i
              class="fa-solid fa-arrow-left"
              style={{ color: "#fff", width: "40px" }}
            ></i>
          </Link>
          <button className="submitButton">Add New Player</button>
          <button className="ClearLink" onClick={clearOnSubmit}>
            Clear
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddPlayer;
