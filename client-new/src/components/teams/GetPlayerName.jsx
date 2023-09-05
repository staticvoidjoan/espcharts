import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useNavigate from react-router-dom



const ViewPlayer = ({ teamCaptainId }) => {

  // const [player, setPlayer] = useState(null);
  // useEffect(() => {
  //   loadPlayer();
  // }, []);
  
  
  // const loadPlayer = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://krgl0umfsc.execute-api.eu-north-1.amazonaws.com/dev/espcharts/players/${teamCaptainId}`
  //     );
  //     setPlayer(res.data);
  //   } catch (error) {
  //     console.error("Error loading player:", error);
  //   }
  // };

  
    if(teamCaptainId == null){
      return null;
    }

  
  return (
    <>
      {/* {player.userName} */}
    </>
  );
  }  

export default ViewPlayer;
