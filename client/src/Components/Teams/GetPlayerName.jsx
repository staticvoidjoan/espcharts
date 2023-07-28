import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useNavigate from react-router-dom



const ViewPlayer = ({ teamCaptainId }) => {

  const [player, setPlayer] = useState([]);
  useEffect(() => {
    loadPlayer();
  }, []);


  
  const loadPlayer = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/espcharts/player/${teamCaptainId}`
      );
      setPlayer(res.data);
    } catch (error) {
      console.error("Error loading player:", error);
    }
  };



  return (
    <p>
      {player.userName}
    </p>
  );
  }  

export default ViewPlayer;
