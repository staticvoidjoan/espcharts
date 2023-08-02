import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import playerplaceholder from "../../assets/playerplch.svg";
import "./ViewPlayer.css";
import background from "../../assets/playerbg.png";
const ViewPlayer = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [player, setPlayer] = useState({});

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
    <>
      <div className="container mt-5 mb-5">
        <div className="view-player-container">
          <img src={background} alt="background" className="player-bg-image" />
          <div className="card-container">
            <Card style={{ width: "18rem" }} className="view-player-container">
              <Card.Title className="view-player-title">
                {player.userName}
              </Card.Title>
              <Card.Img
                variant="top"
                src={playerplaceholder}
                className="mx-auto"
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
                <Link to={`/players`} className="Link">
                  <i
                    class="fa-solid fa-arrow-left"
                    style={{ color: "#fff" }}
                  ></i>
                </Link>
                <Link to={`/player/edit/${player._id}`} className="Link">
                  Edit
                </Link>
                <Link className="DeleteLink">Delete</Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPlayer;
