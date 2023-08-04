import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AddTeam.css";
import background from "../../assets/playerbg.png";
const AddTeamMain = () => {
    let navigate = useNavigate();
  const [team, setTeam] = useState({
    teamName: "",
    teamCaptain: "",
    players: [],
    teamOrigin: "",
  })
  const[playerList, setPlayerList] = useState([]);

  const {teamName, teamCaptain, players, teamOrigin} = team;

  useEffect(()=>{
    loadPlayers();
  },)

  const loadPlayers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/espcharts/playerAll")
        setPlayerList(response.data);
    } catch (error) {
        console.error("Error fetching players",error);
    }
  }

  const onInputChange= (e) => {
    setTeam({...team, [e.target.name]: e.target.value});
  }

  const onPlayerChange= (e) => {
    const selectedOptions = Array.from(e.target.options)
    .filter((option) => option.selected)
    .map((option) => option.value);
  setTeam({
    ...team,
    players: selectedOptions,
  });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the form...");

    try {
      console.log("Creating team...");
      await axios.post(`http://localhost:5000/espcharts/team`, team);
      console.log("Team posted successfully!");
      Swal.fire({
        icon: "success",
        title: "Team Created Successfully",
      });
      navigate("/teams");
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const onTeamCaptainChange = (e) => {
    setTeam({
      ...team,
      teamCaptain: e.target.value,
    });
  };

  const MultiSelectDropDown = ({ playerList, selectedPlayers, onPlayerChange }) => {
    const filteredPlayerOptions = playerList
      .filter((player) => player.userName !== teamCaptain)
      .map((player) => (
        <option key={player._id} value={player._id}>
          {player.userName}
        </option>
      ));
  
    return (
      <Form.Control
        as="select"
        multiple
        name="players"
        value={selectedPlayers}
        onChange={onPlayerChange}
      >
        {filteredPlayerOptions}
      </Form.Control>
    );
  };


  return (
    <div className="add-player-container mt-5 mb-5">
       <h1 style={{fontWeight:"650", color:"white"}} >New Player</h1>
      <img src={background} alt="background" className="player-bg-image" />
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label style={{ float: "left" }}>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Team Name"
            name="teamName"
            value={team.teamName}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label style={{ float: "left" }}>Team Captain</Form.Label>
          <Form.Select 
            className="form-control"
            name="teamCaptain"
            value={teamCaptain}
            onChange={onTeamCaptainChange}
          >
             {playerList.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.userName}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label style={{ float: "left" }}>Players</Form.Label>
          <Form.Control
            type="text"
            placeholder="User Name"
            name="userName"
            value={playerList.userName}
            onChange={(e) => onInputChange(e)}
            required

            />
            {playerList.map((player) => (
                player.userName === player.teamcaptain ? null : (
                 <option key={player._id} value={player._id}>
                   {player.userName}
                 </option>
               )))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="userName">
        <Form.Label style={{ float: "left" }}>Players</Form.Label>
        <MultiSelectDropDown
          playerList={playerList}
          selectedPlayers={players}
          onPlayerChange={onPlayerChange}
        />
      </Form.Group>
        <Form.Group className="mb-3" controlId="age">
          <Form.Label style={{ float: "left" }}>Team Origin</Form.Label>
          <Form.Control
            type="text"
            placeholder="Team Origin"
            name="teamOrigin"
            value={teamOrigin}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <div className="container d-flex justify-content-between align-items-center">
          <Link as={Link} to={`/teams`} className="submitButton">
            <i
              class="fa-solid fa-arrow-left"
              style={{ color: "#fff", width: "40px" }}
            ></i>
          </Link>
          <button className="submitButton">Add Player</button>
          <button className="clearButton" >
            Clear
          </button>
        </div>
      </Form>
    </div>
  );

};
export default AddTeamMain;

