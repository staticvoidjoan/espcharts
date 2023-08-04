import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import playerplaceholder from "../../assets/playerplch.svg";
import "./ViewPlayer.css";
import background from "../../assets/playerbg.png";
import Swal from "sweetalert2"
import ReactPlayer from 'react-player'
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
      Swal.fire({
        icon: "error",
        title: "Error :(",
        text: "There was an issue. Please try again later.",
      });
    }
  };

  let url;
  if (player.gameTitle === "Counter Strike: Global Offensive") {
    url = "https://www.youtube.com/watch?v=BzYGXyro0DM"
  } else if (player.gameTitle === "League of Legends") {
    url = "https://www.youtube.com/watch?v=z3b6SFaAGrg"
  } else if (player.gameTitle === "Rainbow Six Siege") {
    url ="https://www.youtube.com/watch?v=TMZJEVy0DDo"
    
  } else if (player.gameTitle === "Valorant") {
   url="https://www.youtube.com/watch?v=0M1_q5ucJFo"
  } else if (player.gameTitle === "Overwatch") {
    url = "https://www.youtube.com/watch?v=u1SKXvonPJQ"
  } else if (player.gameTitle === "Call of Duty") {
   url="https://www.youtube.com/watch?v=oMoQOjPUoco" 
  }




  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="view-player-container">
          <img src={background} alt="background" className="player-bg-image" />
          <div className="view-player-container">
            <div> 
            <Card style={{ width: "18rem" }} className="player-card">
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
          <div className="react-player-wrapper">
            <ReactPlayer url={url} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPlayer;
