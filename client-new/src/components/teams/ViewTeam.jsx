import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import GetPlayerName from "./GetPlayerName";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./ViewTeam.css";
import "../players/Players.css";
import GetPlayer from "./GetPlayers";
import teamlogo from "../../assets/teamlogo.png";
const ViewTeam = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState({
    teamName: "",
    teamCaptainId: "",
    players: [],
    teamOrigin: "",
  });

  useEffect(() => {
    console.log(team.players);
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const res = await axios.get(
        `https://krgl0umfsc.execute-api.eu-north-1.amazonaws.com/dev/espcharts/teams/${id}`
      );
      setTeam(res.data);
    } catch (error) {
      console.error("Error loading player:", error);
    }
  };

  return (
    <div className="view-team-container">
      <div className="view-player-container">
        <div className="card-container">
          <Card style={{ width: "18rem" }} className="viewteam-bg-image">
            <Card.Title className="view-player-title">
              {team.teamName}
            </Card.Title>
            <Card.Img
              variant="top"
              src={teamlogo}
              style={{ width: "80%" }}
              className="mx-auto"
            />
            <Card.Body>
              <Card.Text>TODO TEAM BIO</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <strong>Team Origin: </strong>
                {team.teamOrigin}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Link to={`/teams`} className="Team-Link">
                <i class="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i>
              </Link>
              <Link to={`/team/edit/${team._id}`} className="Team-Link">
                Edit
              </Link>
              <Link className="DeleteLink">Delete</Link>
            </Card.Body>
          </Card>
        </div>
      </div>
      {/* Only map over `team.players` if it exists */}
      <div className="team-player-grid">
        {team.players &&
          team.players.length > 0 &&
          team.players.map((playerId, index) => (
            <GetPlayer playerId={playerId} />
          ))}
      </div>
    </div>
  );
};

export default ViewTeam;
