import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ViewPlayer = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [player, setPlayer] = useState([])

  useEffect(() => {
    // Call the function that fetches both team and player data
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/espcharts/team/${id}`
      );
      setTeam(res.data); // Update the state to set the team data, not the player data
      const playerIds = res.data.players;
      if (playerIds && playerIds.length > 0) {
        const playerRes = await axios.get("http://localhost:5000/espcharts/player", {
          params: { ids: playerIds }
        });
        setPlayer(playerRes.data);
      }
    } catch (error) {
      console.error("Error loading player:", error);
    }
  };

  if (!team || player.length === 0) { // Check if team or player data is not yet loaded
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Player Info Display */}
      <div className="player-info">
        <h3>Team Info</h3>
        <Link to="/team">Back to team list</Link>
        <p><strong>Team Name:</strong> {team.teamName}</p>
        <p><strong>Team Captain:</strong> {player[0]?.userName}</p> {/* Use optional chaining (?.) here as well */}
        {/* Add a table list for team players here */}
        <p><strong>Team Origin:</strong> {team.teamOrigin}</p>
      </div>
    </div>
  );
};

export default ViewPlayer;
