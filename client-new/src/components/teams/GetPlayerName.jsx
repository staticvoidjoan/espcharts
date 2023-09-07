import React, { useState, useEffect } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";


const ViewPlayer = ({ teamCaptainId }) => {
  
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    loadPlayer();
  }, []);
  
  
  const loadPlayer = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    try {
      const res = await axios.get(
        `https://h9bo5rmthl.execute-api.eu-north-1.amazonaws.com/dev/espcharts/players/${teamCaptainId}`, {
          headers: {
            Authorization: token,
          },
        }
      );
      setPlayer(res.data);
    
    } catch (error) {
      console.error("Error loading player:", error);
    }
  };



  
  return (
    <>
      {player && player.userName ? player.userName : ""}
    </>
  );
  }  


export default ViewPlayer;
