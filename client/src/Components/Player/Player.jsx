import { useEffect, useState } from "react";
import axios from "axios";
import "./Player.css"
import { Link } from 'react-router-dom';

import Swal from "sweetalert2"


function Player() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async() =>{
    try {
      const response = await axios.get("http://localhost:5000/espcharts/player");
      setPlayers(response.data);
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Database Error",
        text: "There was an issue fetching data from the database. Please try again later.",});
    }
  }

  const deletePlayer = (id) =>{
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Player has been deleted.',
            'success'
          )
          proceedDelete(id);
        }
      })
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  }


  const proceedDelete = async (id) =>{
    try {
           await axios.delete(`http://localhost:5000/espcharts/player/${id}`);
              loadPlayers();
        } catch (error) {
          console.error('Error deleting player:', error);
        }
  }



  
  return (
    <div className="player-table">

    <div className="table-container">
      <div className="table-wrapper">
      <h1 className="player-title">PLAYERS</h1>
      <div className="add-player-link">
        <Link to={`/player/add`}  className="Link" style={{ float: "right" }}>Add Player</Link>
        </div>
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <th className="th">#</th>
              <th className="th">First Name</th>
              <th className="th">Last Name</th>
              <th className="th">In Game Name</th>
              <th className="th">Game</th>
              <th className="th">Game Role</th>
              <th className="th">Age</th>
              <th className="th">Country</th>
              <th className="th">Action</th>
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
                  {}
                <Link to={`/player/view/${player._id}`}  className="Link">View</Link>
                <Link to={`/player/edit/${player._id}`}  className="Link">Edit</Link>
                <Link onClick={() => deletePlayer(player._id) }className="DeleteLink">Delete</Link>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
    </div>
  );
}

export default Player;
