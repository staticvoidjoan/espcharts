import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import GetPlayerName from "./GetPlayerName";

const ViewTeam = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState();

  useEffect(() => {
    // Call the function that fetches both team and player data
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/espcharts/team/${id}`);
      setTeam(res.data);
    } catch (error) {
      console.error("Error loading player:", error);
    }
  };

  if (!team) {
    // Check if team or player data is not yet loaded
    return <div>Loading...</div>;
  }

  const players = team.players;

  return (
    <div>
      {/* Player Info Display */}
      <div className="player-info">
        <h3>Team Info</h3>
        <Link to="/team">Back to team list</Link>
        {/* <p><strong>Team Name:</strong> {team.teamName}</p> */}
        <p>
          <strong>Players:</strong> 
          {team.players.map((playerId, index) => (
            <GetPlayerName key={index} teamCaptainId={playerId} />
          ))}
        </p>
        <p>
          <strong>TeamCaptain:</strong>{" "}
          <GetPlayerName teamCaptainId={team.teamCaptain} />
        </p>
        <p>
          <strong>Team Origin:</strong> {team.teamOrigin}
        </p>
      </div>
    </div>
  );
};

export default ViewTeam;
