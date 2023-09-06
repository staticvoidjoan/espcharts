import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";
import "./AddTeam.css";
import { Auth } from "aws-amplify";
import Select from "react-select";

const AddTeam = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [team, setTeam] = useState({
    teamName: "",
    teamCaptain: "",
    teamBio: "",
    players: [],
    teamOrigin: "",
  });

  const { teamName, teamCaptain, players, teamOrigin, teamBio } = team;

  const [playerList, setPlayerList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      try {
        const response = await axios.get(
          "https://h9bo5rmthl.execute-api.eu-north-1.amazonaws.com/dev/espcharts/allTeams",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPlayerList(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    loadAllTeams();
    fetchPlayers();
  }, []);

  const onInputChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value,
    });
  };

  const loadAllTeams = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    try {
      const response = await axios.get(
        `https://h9bo5rmthl.execute-api.eu-north-1.amazonaws.com/dev/espcharts/teams/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTeam(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error :(",
        text: "There was an issue. Please try again later.",
      });
      console.error("Error loading teams:", error);
    }
  };

  const onPlayersChange = (selectedOptions) => {
    const selectedPlayerIds = selectedOptions.map((option) => option.value);
    setTeam({
      ...team,
      players: selectedPlayerIds,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the form...");
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    try {
      console.log("Creating team...");
      await axios.put(
        `https://h9bo5rmthl.execute-api.eu-north-1.amazonaws.com/dev/espcharts/teams/${id}`,
        team,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Team posted successfully!");
      Swal.fire({
        icon: "success",
        title: "Team Created Successfully",
      });
      navigate("/team");
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAll = () => {
    const allPlayerIds = playerList.map((player) => player._id);
    setTeam({
      ...team,
      players: selectAll ? [] : allPlayerIds,
    });
    setSelectAll(!selectAll);
  };

  // Define your player selector options
  const playerSelectorOptions = playerList.map((player) => ({
    value: player._id,
    label: player.userName,
  }));

  return (
    <div className="add-team-page">
      <div className="add-team-container mt-5 mb-5">
        <div>
          <Link to={`/teams`} className="Team-Link" style={{ float: "left" }}>
            <i class="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i>
          </Link>
          <h2 className="h2Title d-flex justify-content-center">Add Team</h2>
        </div>
        <Form.Label style={{ float: "left" }}>Team Name:</Form.Label>
        <Form onSubmit={onSubmit}>
          <div className="form-group">
            <Form.Control
              type="text"
              className="form-control form-control-lg"
              placeholder="Team Name"
              name="teamName"
              value={teamName}
              onChange={onInputChange}
            />
          </div>
          <Form.Label style={{ float: "left" }}>Team Bio:</Form.Label>
          <div className="form-group">
            <Form.Control
              type="text"
              className="form-control form-control-lg"
              placeholder="Team Bio"
              name="teamBio"
              value={teamBio}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <Form.Label style={{ float: "left" }}>Team Captain:</Form.Label>
            <Form.Control
              as="select"
              name="teamCaptain"
              value={teamCaptain}
              onChange={onTeamCaptainChange}
            >
              <option value="">Select Team Captain</option>
              {playerList.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.userName}
                </option>
              ))}
            </Form.Control>
          </div>
          <div className="form-group">
            <Form.Label style={{ float: "left" }}>Select Players:</Form.Label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={playerSelectorOptions}
              value={playerSelectorOptions.filter((option) =>
                players.includes(option.value)
              )}
              onChange={onPlayersChange}
            />
            <Form.Check
              type="checkbox"
              id="select-all-players"
              checked={selectAll}
              onChange={handleSelectAll}
              label={
                <h5 style={{ color: "#fff", display: "block", float: "left" }}>
                  {" "}
                  Select All
                </h5>
              }
            />
          </div>
          <div className="form-group">
            <Form.Label style={{ float: "left" }}>Country Origin:</Form.Label>
            <Form.Control
              type="text"
              className="form-control form-control-lg"
              placeholder="Country Origin"
              name="teamOrigin"
              value={teamOrigin}
              onChange={onInputChange}
            />
          </div>
          <div className="submitButton">
            <button type="submit">Add New Team</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddTeam;
