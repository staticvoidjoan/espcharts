import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
// ... (previous imports and other code) ...
import "./AddTeam.css";

const AddTeam = () => {
  let navigate = useNavigate();
  const [team, setTeam] = useState({
    teamName: "",
    teamCaptain: "",
    players: [],
    teamOrigin: "",
  });

  const { teamName, teamCaptain, players, teamOrigin } = team;

  // State to store the list of players fetched from the API
  const [playerList, setPlayerList] = useState([]);

  // Fetch all players from the API and store them in the playerList state
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/espcharts/player"
        );
        setPlayerList(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  const onInputChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value,
    });
  };

  const onPlayersChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setTeam({
      ...team,
      players: selectedOptions,
    });
  };

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

  return (
    <div>
      <div>
        <h2 className="h2Title">Add Team</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Team Name"
              name="teamName"
              value={teamName}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
          <label>Team Captain:</label>
            <select
              className="form-control"
              name="teamCaptain"
              value={teamCaptain} // Use teamCaptain from state
              onChange={onTeamCaptainChange} // Use separate handler for Team Captain select
            >
              <option value="">Select Team Captain</option>
              {playerList.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.userName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Players:</label>
            <select
              className="form-control"
              multiple={true}
              name="players"
              value={players} // Ensure the selected options are set based on the players array
              onChange={onPlayersChange}
            >
              {playerList.map((player) => (
                <option
                  key={player._id}
                  value={player._id}
                  selected={players.includes(player._id)}
                >
                  {console.log(player)}
                  {player.userName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Country Origin"
              name="teamOrigin"
              value={teamOrigin}
              onChange={onInputChange}
            />
          </div>
          <button className="submitButton">Add New Team</button>
        </form>
      </div>
      <Link to={"/team"}>Go back to teams</Link>
    </div>
  );
};

export default AddTeam;
