import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import playerplaceholder from "../../assets/playerplch.svg";

const ViewPlayer = ({ teamId }) => {
  let navigate = useNavigate();

  const [team, setTeam] = useState({});

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const res = await axios.get(
        `https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/team/${teamId}`
      );
      setTeam(res.data);
    } catch (error) {
      console.error("Error loading player:", error);
    }
  };

  return (
    <>
      <div className="view-player-container">
        <Card className="view-player-card">
          <Card.Title className="get-view-player-title">
            {team.teamName}
          </Card.Title>
          <div className="player-image-container">
            <Card.Img
              variant="top"
              src={playerplaceholder}
              className="player-image"
            />
          </div>
          <Card.Body>
            <Card.Text>
              <strong>
              TO BE ADDED QUICK BIO FOR PLAYER
              </strong>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <strong>Origin: </strong>
              {team.teamOrigin}
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Link to={`/team/view/${team._id}`} className="Link">
              View
            </Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ViewPlayer;
