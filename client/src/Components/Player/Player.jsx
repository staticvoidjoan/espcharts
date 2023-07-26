import { useEffect, useState } from "react";
import axios from "axios";
import "./Player.css"
import { Link } from 'react-router-dom';
import EditPlayer from "./EditPlayer";

function Player() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async() =>{
    const response = await axios.get("http://localhost:5000/espcharts/player");
    setPlayers(response.data);
  }

  const deletePlayer = async (id) =>{
    try {
      await axios.delete(`http://localhost:5000/espcharts/player/${id}`);
      loadPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  }


  return (
    <div className="table-container">
      <div className="table-wrapper">
      <h1 className="Title">PLAYERS</h1>
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>In Game Name</th>
              <th>Game</th>
              <th>Game Role</th>
              <th>Age</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {players.map((player, index) => ( // Added a unique key (index) for each row
              <tr key={index}>
                <td scope="row">{index+1}</td>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.userName}</td> {/* Changed playerName to userName as per your schema */}
                <td>{player.gameTitle}</td>
                <td>{player.gameRole}</td>
                <td>{player.age}</td>
                <td>{player.country}</td>
                <td>
                <Link to={`/edit/${player._id}`}  className="Link">Edit</Link>
                
                </td>
                <td><button onClick={() => deletePlayer(player._id) }className="delete-button">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-player-link">
        <Link to={`/add`}  className="Link">Add Player</Link>
        </div>
      
    </div>
  );
}

export default Player;
