import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import playerplaceholder from "../../assets/playerplch.svg";
import "./GetPlayer.css"
const ViewPlayer = ({playerId}) => {
  let navigate = useNavigate();

  const [player, setPlayer] = useState({});

  useEffect(() => {
    loadPlayer();
  }, []);

  const loadPlayer = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/espcharts/player/${playerId}`
      );
      setPlayer(res.data);
    } catch (error) {
      console.error("Error loading player:", error);
    }
  };

  return (
    <>
            <Card style={{ width: "100%" }} className="view-player-container">
              <Card.Title className="view-player-title">
                {player.userName}
              </Card.Title>
              <Card.Img
                variant="top"
                src={playerplaceholder}
                className="mx-auto"
                style={{ width: "50%", margin: "0 auto" }}
              />
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
                <Link to={`/player/view/${player._id}`} className="Link">
                  View
                </Link>
                {/* <Link className="DeleteLink">Delete</Link> */}
              </Card.Body>
            </Card> 
    </>
  );
};

export default ViewPlayer;
