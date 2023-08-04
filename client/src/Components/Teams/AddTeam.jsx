import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
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

  const [playerList, setPlayerList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/espcharts/player");
        setPlayerList(response.data);
        setFilteredPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    setFilteredPlayers(
      playerList.filter((player) =>
        player.userName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, playerList]);

  const onInputChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value,
    });
  };

  const onPlayerCheckboxChange = (playerId) => {
    const updatedPlayers = players.includes(playerId)
      ? players.filter((id) => id !== playerId)
      : [...players, playerId];
    setTeam({
      ...team,
      players: updatedPlayers,
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
              value={teamCaptain}
              onChange={onTeamCaptainChange}
            >
              <option value="">Select Team Captain</option>
              {filteredPlayers.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.userName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Players:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="form-control"
              multiple={true}
              name="players"
              value={players}
              onChange={onPlayerCheckboxChange}
            >
              {filteredPlayers.map((player) => (
                <option
                  key={player._id}
                  value={player._id}
                  selected={players.includes(player._id)}
                >
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
