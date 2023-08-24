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
import teamlogo from "../../assets/teamlogo.png"  
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
      const res = await axios.get(`https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/team/${id}`);
      setTeam(res.data);
    } catch (error) {
      console.error("Error loading player:", error);
    }
  };

  return (
    <div className="container">
      <div className="container mt-5 mb-5">
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
              <Card.Body >
                <Link to={`/teams`} className="Link">
                  <i
                    class="fa-solid fa-arrow-left"
                    style={{ color: "#fff" }}
                  ></i>
                </Link>
                <Link to={`/team/edit/${team._id}`} className="Link">
                  Edit
                </Link>
                <Link className="DeleteLink">Delete</Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      {/* Only map over `team.players` if it exists */}
      <div className="mb-5">
        
      {team.players && team.players.length > 0 && (
        <Container fluid style={{ marginTop: "2em" , zIndex:"-1"}}>
          <Row className="justify-content-center">
            {team.players.map((playerId, index) => (
              <Col sm={4} md={3} ml={5} lg={2} key={index} style={{width:"20%"}}>
                <div className="d-flex justify-content-center">
              
                  <GetPlayer playerId={playerId} />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
      </div>
    </div>
  );
};

export default ViewTeam;
