import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import playerplaceholder from "../../assets/playerplch.svg";
import "./ViewPlayer.css";
import Swal from "sweetalert2";
import ReactPlayer from "react-player";
import { Auth } from "aws-amplify";
const ViewPlayer = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [player, setPlayer] = useState({});

  useEffect(() => {
    loadPlayer();
  }, []);

  const loadPlayer = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    try {
      const res = await axios.get(
        `https://h9bo5rmthl.execute-api.eu-north-1.amazonaws.com/dev/espcharts/players/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
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
    url = "https://www.youtube.com/watch?v=BzYGXyro0DM";
  } else if (player.gameTitle === "League of Legends") {
    url = "https://www.youtube.com/watch?v=z3b6SFaAGrg";
  } else if (player.gameTitle === "Rainbow Six Siege") {
    url = "https://www.youtube.com/watch?v=TMZJEVy0DDo";
  } else if (player.gameTitle === "Valorant") {
    url = "https://www.youtube.com/watch?v=0M1_q5ucJFo";
  } else if (player.gameTitle === "Overwatch") {
    url = "https://www.youtube.com/watch?v=u1SKXvonPJQ";
  } else if (player.gameTitle === "Call Of Duty") {
    url = "https://www.youtube.com/watch?v=oMoQOjPUoco";
  }

  const deletePlayer = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e04338",
        cancelButtonColor: "#8e24aa",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Player has been deleted.", "success");
          proceedDelete(id);
        }
      });
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const proceedDelete = async (id) => {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    try {
      await axios.delete(
        `https://h9bo5rmthl.execute-api.eu-north-1.amazonaws.com/dev/espcharts/players/${id}`
      , {
          headers: {
            Authorization: token,
          },
        });
      setTimeout(() => {
        navigate("/players");
      }, 2000);
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const getToken = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    return token;
  };

  if (player.userName) {
    return (
      <div className="view-player-container">
        <div className="view-player-card">
          {player.userName !== null ? (
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
                    {player.firstName} {player.lastName}
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
                {getToken() ? (
                  <div>
                    <Link to={`/players`} className="player-link">
                      <i
                        class="fa-solid fa-arrow-left"
                        style={{ color: "#fff" }}
                      ></i>
                    </Link>
                    <Link
                      to={`/player/edit/${player._id}`}
                      className="player-link"
                    >
                      Edit
                    </Link>
                    <Link
                      className="DeleteLink"
                      onClick={() => deletePlayer(player._id)}
                    >
                      Delete
                    </Link>
                  </div>
                ) : null}
              </Card.Body>
            </Card>
          ) : (
            <div>Loading player information...</div>
          )}
        </div>

        <div className="react-player-wrapper">
          <ReactPlayer url={url} />
        </div>
      </div>
    );
  }
};

export default ViewPlayer;
