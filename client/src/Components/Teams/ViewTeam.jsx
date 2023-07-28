import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import GetPlayerName from "./GetPlayerName";
import "./ViewTeam.css";

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
      <h3 className="title">{team.teamName}</h3>
      {/* Team Info Display */}
      <div className="team-info">
        <table className="player-info">
          <tbody>
            <tr>
              <th>Players</th>
              <td>
                {team.players.map((playerId, index) => (
                  <GetPlayerName key={index} teamCaptainId={playerId} />
                ))}
              </td>
            </tr>
            <tr>
              <th>Team Captain</th>
              <td>
                <GetPlayerName teamCaptainId={team.teamCaptain} />
              </td>
            </tr>
            <tr>
              <th>Team Origin</th>
              <td>{team.teamOrigin}</td>
            </tr>
          </tbody>
        </table>
      </div>
        <Link to="/team">Back to team list</Link>
    </div>
  );
};

export default ViewTeam;
