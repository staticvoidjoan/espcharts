import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useNavigate from react-router-dom



const ViewPlayer = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [player, setPlayer] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    gameTitle: "",
    gameRole: "",
    age: 16,
    country: "",
  });

  const { firstName, lastName, userName, gameTitle, gameRole, age, country } =
    player;
  const onInputChange = (e) => {
    setPlayer({
      ...player,
      [e.target.name]: e.target.value,
    });
  };

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


  return (
    <div>
      {/* Player Info Display */}
      <div className="player-info">
      <p><h5>First Name</h5> {firstName}</p>
      <p><h5>Last Name</h5> {lastName}</p>
      <p><h5>User Name</h5>  {userName}</p>
      <p><h5>Game Title</h5> {gameTitle}</p>
      <p><h5>Game Role</h5> {gameRole}</p>
      <p><h5>Age</h5> {age}</p>
      <p><h5>Country</h5> {country}</p>
    </div>
  </div>
  );
  }  

export default ViewPlayer;
