import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AddPlayer.css";
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
      await axios.post(
        "https://31t4a11ewb.execute-api.eu-north-1.amazonaws.com/dev/espcharts/players",
        player,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
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

  const availableGameRoles = roles

  return (
    <div className="add-player-bg">

    <div className="add-player-form">
       <h1 style={{fontWeight:"650", color:"#fff"}} >New Player</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label style={{ float: "left",  }}>First Name</Form.Label>
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
          <Form.Label style={{ float: "left",   }}>Last Name</Form.Label>
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
          <Form.Label style={{ float: "left",  }}>In Game Name</Form.Label>
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
          <Form.Label style={{ float: "left",   }}>Game Title</Form.Label>
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
          <Form.Label style={{ float: "left",   }}>Game Role</Form.Label>
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
          <Form.Label style={{ float: "left",   }}>Age</Form.Label>
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
          <Form.Label style={{ float: "left",   }}>Country</Form.Label>
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
          <Link as={Link} to={`/players`} className="submitButton">
            <i
              class="fa-solid fa-arrow-left"
              style={{ color: "#fff", width: "40px" }}
            ></i>
          </Link>
          <button className="submitButton">Add Player</button>
          <button className="clearButton" onClick={clearOnSubmit}>
            Clear
          </button>
        </div>
      </Form>
    </div>
    </div>
  );
};

export default AddPlayer;
