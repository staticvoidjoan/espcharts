import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import playerplaceholder from "../../assets/playerplch.svg";
import "./GetPlayer.css";

const ViewPlayer = ({ playerId }) => {
  let navigate = useNavigate();

  const [player, setPlayer] = useState({});

  useEffect(() => {
    loadPlayer();
  }, []);

  const loadPlayer = async () => {
    try {
      const res = await axios.get(
        `https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/player/${playerId}`
      );
      setPlayer(res.data);
    } catch (error) {
      console.error("Error loading player:", error);
    }
  };

  return (
    <div className= "view-playerteam-container">
    <div className="view-player-card" style={{margin:"0"}}>
      <Card  className="player-card">
        <Card.Title className="view-player-title">
          {player.userName}
        </Card.Title>
        <Card.Img variant="top" src={playerplaceholder} className="mx-auto" />
        <Card.Body>
          <Card.Text>
            <strong>
              {" "}
              {player.firstName} {player.lastName}{" "}
            </strong>
            <br />
            TO BE ADDED QUICK BIO FOR PLAYER
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <strong>Game: </strong>
            {player.gameTitle}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Role: </strong>
            {player.gameRole}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Age: </strong>
            {player.age}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Country: </strong>
            {player.country}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Link to={`/players`} className="player-link">
            <i class="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i>
          </Link>
          <Link to={`/player/edit/${player._id}`} className="player-link">
            Edit
          </Link>
          <Link className="DeleteLink">Delete</Link>
        </Card.Body>
      </Card>
    </div>
    </div>
  );
};

export default ViewPlayer;
