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

  return (
    <>
    {players._id}
    
    </>
  );
}

export default Player;
