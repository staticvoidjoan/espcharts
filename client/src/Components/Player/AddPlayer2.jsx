import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditPlayer.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
      console.log("Adding player...");
      await axios.post(`http://localhost:5000/espcharts/player`, player);
      console.log("Player posted successfully!");
      Swal.fire({
        icon: "success",
        title: "Player Created Successfully",
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
    <Form  onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
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
        <Form.Label>Last Name</Form.Label>
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
        <Form.Label>In Game Name</Form.Label>
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
        <Form.Label>Game Title</Form.Label>
      <Form.Select aria-label="Default"
         name="gameTitle"
         value={gameTitle}
         onChange={(e) => onInputChange(e)}>
        {availableGameTitles.map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </Form.Select>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="gameRole">
        <Form.Label>Game Role</Form.Label>
       <Form.Select aria-label="Default"
          name="gameRole"
          value={gameRole}
          onChange={(e) => onInputChange(e)}>

       {availableGameRoles.map((role,index) =>(
        <option key={index} value={role}>{role}</option>
       ))}
       </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="age">
        <Form.Label>Age</Form.Label>
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
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Country"
          name="country"
          value={country}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
     
    </Form>
  );
};

export default AddPlayer;
