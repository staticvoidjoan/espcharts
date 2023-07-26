import { useEffect, useState } from "react";
import axios from "axios";
import "./Player.css"

function Player() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/espcharts/player")
      .then((response) => setPlayers(response.data)) // Changed parameter name to response
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="table-container">
      <div className="table-wrapper">
      <h1 className="Title">PLAYERS</h1>
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <th>First Name</th>
              <th>Last Name</th>
              <th>In Game Name</th>
              <th>Game</th>
              <th>Game Role</th>
              <th>Age</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {players.map((player, index) => ( // Added a unique key (index) for each row
              <tr key={index}>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.userName}</td> {/* Changed playerName to userName as per your schema */}
                <td>{player.gameTitle}</td>
                <td>{player.csgoRoles}</td>
                <td>{player.age}</td>
                <td>{player.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Player;
