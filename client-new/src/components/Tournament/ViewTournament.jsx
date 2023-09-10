import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../players/Players.css";
import "../teams/ViewTeam.css"
import GetTeams from "./GetTeams";
import teamlogo from "../../assets/teamlogo.png" 
import { format } from "date-fns"; 
const ViewTeam = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [tournament, setTournament] = useState([]);

  useEffect(() => {

    loadTournament();
  }, []);

  const loadTournament = async () => {
 
    try {
      const res = await axios.get(`https://h9bo5rmthl.execute-api.eu-north-1.amazonaws.com/dev/espcharts/tournaments/${id}`);
      setTournament(res.data);
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
                {tournament.tournamentName}
              </Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <strong>Game Title: </strong>
                  {tournament.gameTitle}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Timeline: </strong>
          
                  {tournament.startDate} to {tournament.endDate}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Organizer / Price Pool: </strong>
                  {tournament.organizer} / {tournament.pricePool}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Location: </strong>
                  {tournament.location}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body >
                <Link to={`/tournaments`} className="Link">
                  <i
                    class="fa-solid fa-arrow-left"
                    style={{ color: "#fff" }}
                  ></i>
                </Link>
                <Link to={`/tournament/edit/${tournament._id}`} className="Link">
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
        
      {tournament.participatingTeams && tournament.participatingTeams.length > 0 && (
        <Container fluid style={{ marginTop: "2em" , zIndex:"-1"}}>
          <Row className="justify-content-center">
            {tournament.players.map((teamId, index) => (
              <Col sm={4} md={3} ml={5} lg={2} key={index} style={{width:"20%"}}>
                <div className="d-flex justify-content-center">
              
                  <GetTeams teamId={teamId} />
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
