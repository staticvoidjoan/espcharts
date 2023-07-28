import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useNavigate from react-router-dom
import Spinner from "../Global Components/LoadingSpinner"
import "./ViewPlayer.css"


const ViewPlayer = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [player, setPlayer] = useState([]);
  useEffect(() => {
    loadPlayer();
  }, []);



  const loadPlayer = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/espcharts/player/${id}`
      );
      setPlayer(res.data);
    } catch (error) {
      console.error("Error loading player:", error);
    }
  };

  if (!player || player.length === 0){
    return <Spinner />
  } else{

  // return (
  //   <div>
  //     {/* Player Info Display */}
  //     <div className="player-info">
  //     <p><h5>First Name</h5> {player.firstName}</p>
  //     <p><h5>Last Name</h5> {player.lastName}</p>
  //     <p><h5>User Name</h5>  {player.userName}</p>
  //     <p><h5>Game Title</h5> {player.gameTitle}</p>
  //     <p><h5>Game Role</h5> {player.gameRole}</p>
  //     <p><h5>Age</h5> {player.age}</p>
  //     <p><h5>Country</h5> {player.country}</p>
  //   </div>
  // </div>
  // );
  // }
  // }  

  return (
    <div>
      {/* Player Info Display */}
        <h4 className="title">{player.userName}</h4>
      <table className="player-info">
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{player.firstName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{player.lastName}</td>
          </tr>
          <tr>
            <th>Game Title</th>
            <td>{player.gameTitle}</td>
          </tr>
          <tr>
            <th>Game Role</th>
            <td>{player.gameRole}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{player.age}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>{player.country}</td>
          </tr>
        </tbody>
      </table>
      <Link to={"/player"} color="white">Go Back To Players</Link>
    </div>
  );
  }
}

export default ViewPlayer;
